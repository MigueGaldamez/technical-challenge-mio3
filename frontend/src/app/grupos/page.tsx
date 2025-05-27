'use client';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '../../utils/api';
import { Group } from '@/types/Group';
import { setgroups } from 'process';
import { Todo } from '@/types/todo';
import { formatDateDDMMYYYY } from '@/utils/date.utils';

export default function Todos() {
  const [grupos, setGrupos] = useState<Group[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [text, setText] = useState('');
  const [description, setDescription] = useState('');

  const [todoText, setTodoText] = useState('');

const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
const [showSidebar, setShowSidebar] = useState(false);

  const router = useRouter();

  useEffect(() => {
    API.get('/auth/me')
      .then(() => fetchGroups())
      .catch(() => router.push('/login'));
  }, []);

  const fetchGroups = async () => {
    const res = await API.get('/group');
    setGrupos(res.data);
  };

  const fetchTodosGrupo = async () => {
    console.log(selectedGroup?._id)
    if(selectedGroup?._id){
        const res = await API.get('/todos/grupo/'+selectedGroup?._id);
      setTodos(res.data);
    }
  };

  const addGroup= async () => {
    const res = await API.post('/group', { text,description });
    setGrupos([...grupos, res.data]);
    setText('');
  };
  const addTodo = async () => {
    const res = await API.post('/todos', { text:todoText, group:selectedGroup?._id });
    setTodos([...todos, res.data]);
    setText('');
  };


  return (
    <div className='container my-5'>
        <div className="row justify-content-center">

    <div className="col-lg-6 col-md-8 col-9">
            <div>
                 <form id="todo-form" className="d-flex mb-3">
                          <div className='flex-fill me-2'>
                          <input
                            type="text"
                            id="task-input"
                            className="form-control me-2"
                            required
                            value={text} onChange={e => setText(e.target.value)} placeholder="Nuevo Grupo"
                            />
                    </div>
                    <div className='flex-fill me-2'>
                    <input
                        type="text"
                        id="task-input"
                        className="form-control me-2"
                        required
                        value={description} onChange={e => setDescription(e.target.value)} placeholder="Nuevo Grupo"
                        />
                    </div>
                   
                   <div>
                     <button  className="btn btn-primary text-wrap"  onClick={addGroup}>Crear Nuevo Grupo</button>
                   </div>
                </form>
            </div>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Mis Grupos</h4>
        </div>
        <div className="card-body">
          <ul className="list-group" id="task-list">
              {grupos.map(todo => (
              <li key={todo._id}
                onClick={() => {
                  setSelectedGroup(todo);
                  setShowSidebar(true);
                  fetchTodosGrupo();
                }}
                className={classNames('list-group-item d-flex justify-content-between align-items-center', {
                  'bg-light': selectedGroup?._id === todo._id
                })}
                style={{ cursor: 'pointer' }}
                  >
                <div>
                    <span className='h5'>  {todo.name}</span>
                    <small className='d-block'>{todo.description}</small>
                </div>
                <div>
                    <button className='btn btn-pine btn-sm'>Invitar</button>
                </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
   
  </div>
  {showSidebar && selectedGroup && (
  <div className="sidebar bg-white shadow position-fixed top-0 end-0 h-100 p-4" style={{ width: '350px', zIndex: 1050 }}>
    <div className="d-flex justify-content-between mb-3">
      <h5>Grupo: {selectedGroup.name}</h5>
      <button className="btn-close" onClick={() => setShowSidebar(false)}></button>
    </div>
  {todos.map(todo => (
                <li key={todo._id}
                className={classNames('list-group-item d-flex justify-content-between align-items-center ')}
             >
                
                <div>
                       <span  className={classNames('d-block',{
                  "text-decoration-line-through": todo.completado == true,
                })}>  {todo.text}</span>
                  {todo.fechaHoraCompletado && <small className='d-block '>Completado {formatDateDDMMYYYY(todo.fechaHoraCompletado)}</small>}
                </div>

                  <button className='btn btn-danger btn-sm'>X</button>
                </li>
              ))}
    <form onSubmit={(e) => {
      e.preventDefault();
      // Submit your value here
      console.log("Adding value to group:", selectedGroup._id);
    }}>
      <div className="mb-3">
        <label className="form-label">Agregar Valor</label>
       <input
              type="text"
              id="task-input"
              className="form-control me-2"
              required
               value={todoText} onChange={e => setTodoText(e.target.value)} placeholder="Nuevo Que Hacer"
            />
      </div>
    <button  className="btn btn-success"  onClick={addTodo}>Agregar</button>
    </form>
  </div>
)}
    </div>

  );
}
