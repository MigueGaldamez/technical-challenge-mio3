'use client';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '../../utils/api';
import { Todo } from '../../types/todo';
import { formatDateDDMMYYYY } from '@/utils/date.utils';

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
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

  const addTodo = async () => {
    const res = await API.post('/todos', { text });
    setTodos([...todos, res.data]);
    setText('');
  };

  const deleteTodo = async (id: string) => {
    await API.delete(`/todos/${id}`);
    setTodos(todos.filter(t => t._id !== id));
  };

  const handleDoubleClick  = async (id: string) => {
    await API.post(`/todos/completar/${id}`,{});
    await fetchTodos();
  };
  return (
    <div className='container my-5'>
        <div className="row justify-content-center">
    <div className="col-lg-6 col-md-8 col-9">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Cosas x Hacer</h4>
        </div>
        <div className="card-body">
          <div id="todo-form" className="d-flex mb-3">
            <input
              type="text"
              id="task-input"
              className="form-control me-2"
              required
               value={text} onChange={e => setText(e.target.value)}  onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addTodo();
                }
              }} placeholder="Nuevo Que Hacer"
            />
            <button  className="btn btn-primary"  onClick={addTodo}>Add</button>
          </div>
          <ul className="list-group" id="task-list">
              {todos.map(todo => (
                <li key={todo._id}
                className={classNames('list-group-item d-flex justify-content-between align-items-center ')}
                onDoubleClick={() => handleDoubleClick(todo._id)}>
                
                <div>
                       <span  className={classNames('d-block',{
                  "text-decoration-line-through": todo.completado == true,
                })}>  {todo.text}</span>
                  {todo.fechaHoraCompletado && <small className='d-block '>Completado {formatDateDDMMYYYY(todo.fechaHoraCompletado)}</small>}
                </div>

                  <button className='btn btn-danger btn-sm' onClick={() => deleteTodo(todo._id)}>X</button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
    </div>

  );
}
