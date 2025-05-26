'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '../../utils/api';
import { Todo } from '../../types/todo';

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


  return (
    <div className='container my-5'>
        <div className="row justify-content-center">
    <div className="col-lg-6 col-md-8 col-9">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Cosas x Hacer</h4>
        </div>
        <div className="card-body">
          <form id="todo-form" className="d-flex mb-3">
            <input
              type="text"
              id="task-input"
              className="form-control me-2"
              required
               value={text} onChange={e => setText(e.target.value)} placeholder="Nuevo Que Hacer"
            />
            <button type="submit" className="btn btn-primary"  onClick={addTodo}>Add</button>
          </form>
          <ul className="list-group" id="task-list">
              {todos.map(todo => (
                <li key={todo._id} className='list-group-item d-flex justify-content-between align-items-center'>
                  {todo.text}
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
