'use client';

import { useState, useEffect } from 'react';
import { Group } from '@/types/Group';
import { Todo } from '@/types/todo';
import { useAuth } from '../context/AuthContext'; 
import {
  getGruposByUsuarioId,
  createGrupo,
  createTodo,
  getTodosByGrupoId,
  deleteTodoById,
  toggleCompleteTodoById,
} from '@/services';
import { toast } from 'react-toastify';
import { copyToClipboard } from '@/utils/copy.utils';
import Sidebar from '@/components/sideBar/sideBar';
import GroupForm from '@/components/groupForm/groupForm';
import GroupList from '@/components/GroupList/groupList';
import { useRouter, useSearchParams } from 'next/navigation';
import API from '@/utils/api';

export default function Grupos() {
  const { user, loading } = useAuth();
  const [grupoText, setGrupoText] = useState('');
  const [grupoDescription, setGrupoDescription] = useState('');
  const [todoText, setTodoText] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [grupos, setGrupos] = useState<Group[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const router = useRouter();

  const userId = user?._id || ''; 
const searchParams = useSearchParams();
const id = searchParams.get('groupId');

useEffect(() => {
    API.get('/auth/me')
      .catch(() => router.push('/login'));
  }, []);
useEffect(() => {
  const timeout = setTimeout(() => {
    const params = new URLSearchParams(window.location.search);
    const groupId = params.get('groupId');
    if (groupId && grupos.length > 0) {
      const group = grupos.find(g => g._id === groupId);
      if (group) {
        handleSelectGroup(group);
      }
    }
  }, 0);

  return () => clearTimeout(timeout);
}, [grupos]);

 useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); 
    }
  }, [loading, user, router]);
  useEffect(() => {
    if (userId) {
      fetchGrupos();
    }
  }, [userId]);

  const fetchGrupos = async () => {
    try {
      const gruposFromDb = await getGruposByUsuarioId(userId);
      setGrupos(gruposFromDb);
    } catch (error) {
      toast.error('Error cargando grupos');
      console.error(error);
    }
  };

  const handleCreateGrupo = async () => {
    if (!grupoText.trim()) return;

    try {
      const grupo = await createGrupo(grupoText.trim(), grupoDescription.trim(), userId);
      setGrupos([grupo, ...grupos]);
      setGrupoText('');
      setGrupoDescription('');
      toast.success('Grupo creado');
    } catch (error) {
      toast.error('Error creando grupo');
      console.error(error);
    }
  };

  const handleSelectGroup = async (group: Group) => {
    setSelectedGroup(group);
    try {
      const todosFromDb = await getTodosByGrupoId(group._id);
      setTodos(todosFromDb);
    } catch (error) {
      toast.error('Error cargando tareas');
    }
  };

  const handleAddTodo = async () => {
    if (!todoText.trim() || !selectedGroup) return;

    try {
      const newTodo = await createTodo(todoText.trim(),todoDescription.trim(), selectedGroup._id, userId);
      setTodos([newTodo, ...todos]);
      setTodoText('');
      setTodoDescription('');
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

  const handleCopyInvite = (groupId: string) => {
    copyToClipboard(`${window.location.origin}/join/${groupId}`);
    setCopiedId(groupId);
    setTimeout(() => setCopiedId(null), 1500);
  };
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <div>No autorizado. Por favor inicia sesión.</div>;
  }
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
const retornar = () => {
  const currentParams = new URLSearchParams(window.location.search); 
  currentParams.delete('groupId');

  const newQuery = currentParams.toString();
  const newUrl = `${window.location.pathname}${newQuery ? `?${newQuery}` : ''}`;

  router.replace(newUrl);
  setSelectedGroup(null);
};
  return (
    <div className="container py-5">
      <h1>Mis Grupos</h1>

      <GroupForm
        text={grupoText}
        description={grupoDescription}
        onTextChange={setGrupoText}
        onDescriptionChange={setGrupoDescription}
        onSubmit={handleCreateGrupo}
      />

      <GroupList
        grupos={grupos}
        userId={userId}
        selectedGroupId={selectedGroup?._id}
        onSelect={handleSelectGroup}
        onCopy={handleCopyInvite}
        copiedId={copiedId}
      />

      {selectedGroup && (
        <Sidebar
          group={selectedGroup}
          todos={todos}
          onClose={() => {
            retornar();
          }}
          onAddTodo={handleAddTodo}
          onChangeTodoText={setTodoText}
          todoText={todoText}
          onDelete={handleDeleteTodo}
          onToggle={handleToggleTodo}

          onChangeTodoDescription={setTodoDescription}
          todoDescription={todoDescription}
          onSave={handleSaveTodo} 
        />
      )}
    </div>
  );
}
