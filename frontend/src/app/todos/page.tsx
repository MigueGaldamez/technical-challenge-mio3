'use client';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '../../utils/api';
import { Todo } from '../../types/todo';
import TodoForm from '@/components/todoForm/todoForm';
import TodoItem from '@/components/taskItem/taskItem';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import {
  deleteTodoById,
  toggleCompleteTodoById,
  createTodoNormal,
} from '@/services';

export default function Todos() {
  const { user, loading } = useAuth();
  const userId = user?._id || '';

  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');

  const router = useRouter();

  useEffect(() => {
    API.get('/auth/me')
      .then(() => fetchTodos())
      .catch(() => router.push('/login'));
  }, []);

  const fetchTodos = async () => {
    const res = await API.get('/todos');
    setTodos(res.data);
  };


  const handleAddTodo = async () => {
    if (!text.trim()) return;
    try {
      const newTodo = await createTodoNormal(text.trim(), description.trim());
      setTodos([newTodo, ...todos]);
      setText('');
      setDescription('');
      toast.success('Que Hacer agregado');
    } catch (error) {
      toast.error('Error agregando tarea');
      console.error(error);
    }
  };

    const handleDeleteTodo = async (todoId: string) => {
      try {
        await deleteTodoById(todoId);
        setTodos(todos.filter(t => t._id !== todoId));
        toast.success('Que Hacer eliminado');
      } catch (error) {
        toast.error('Error eliminando tarea');
        console.error(error);
      }
    };
  
    const handleToggleTodo = async (todoId: string) => {
      try {
        const updatedTodo = await toggleCompleteTodoById(todoId, userId);
        setTodos(todos.map(t => (t._id === updatedTodo._id ? updatedTodo : t)));
      } catch (error) {
        toast.error('Error actualizando tarea');
        console.error(error);
      }
    };
const handleSaveTodo = async (updatedTodo: Todo) => {
  try {
  const response = await API.put(`/todos/${updatedTodo._id}`, updatedTodo);
    console.log('response:', response);
    console.log('response.data:', response.data);

    const updated = response.data || updatedTodo;

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo._id === updated._id ? updated : todo
      )
    );
  } catch (error) {
    console.error('Error Guardando', error);
  }
};
  return (
    <div className='container mt-3'>
        <div className="row justify-content-center">
    <div className="col-lg-6 col-md-8 col-9">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Cosas x Hacer</h4>
        </div>
        <div className="card-body">
          <div id="todo-form" className="d-flex mb-3">
               <TodoForm value={text} onChange={setText} onSubmit={handleAddTodo} description={description} onChangeDescription={setDescription}/>
          </div>
          <ul className="list-group" id="task-list">
             {todos.map(todo => (
                    <TodoItem   onSave={handleSaveTodo}  key={todo._id} todo={todo} mostrarUsuario={false} onDelete={() => handleDeleteTodo(todo._id)} onDoubleClick={() => handleToggleTodo(todo._id)} />
                  ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
    </div>

  );
}
