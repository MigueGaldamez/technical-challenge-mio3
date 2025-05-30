import { useState } from 'react';
import API from '../../utils/api';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    try {
      await API.post('/auth/register', form);
      router.push('/login');
    } catch (err) {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
}