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

  const logout = async () => {
    await API.post('/auth/logout');
    router.push('/login');
  };

  return (
    <div className='container'>
      <h2>Todo List</h2>
      <button onClick={logout}>Logout</button>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="New todo" />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
