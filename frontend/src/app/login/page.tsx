'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '../../utils/api';
import { UserForm } from '../../types/todo';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
export default function Login() {
  const [form, setForm] = useState<UserForm>({ username: '', password: '' });
  const router = useRouter();
 const { refreshUser } = useAuth();
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await API.post('/auth/login', form);
    router.push('/todos');
    await refreshUser();
  } catch (err: any) {
  }
};

  return (
    <div>
     <div className='container my-5'>
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8 col-9">
            <div className="card shadow-sm text-center">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Iniciar Sesion</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                <h2 className='text-transform-uppercase'></h2>
                <input className='form-control form-control-sm my-3' placeholder="Usuario" onChange={e => setForm({ ...form, username: e.target.value })} />
                <input className='form-control form-control-sm my-3' type="password" placeholder="Contraseña" onChange={e => setForm({ ...form, password: e.target.value })} />
                <button type="submit" className='btn btn-primary btn-sm mt-2'>Iniciar Sesión</button>
              </form>
              
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}