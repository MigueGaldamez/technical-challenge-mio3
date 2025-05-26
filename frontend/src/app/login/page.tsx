'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '../../utils/api';
import { UserForm } from '../../types/todo';

export default function Login() {
  const [form, setForm] = useState<UserForm>({ username: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await API.post('/auth/login', form);

    console.log(res)
    router.push('/todos');
  } catch (err) {
    alert('Login failed' +err);
  }
};

  return (
    <div className='container'>
         <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
          <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
          <button type="submit" className='btn btn-primary'>Login</button>
        </form>
    </div>
  );
}