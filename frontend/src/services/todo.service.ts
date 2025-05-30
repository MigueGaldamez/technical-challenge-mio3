import API from '@/utils/api';
import { Todo } from '@/types/todo';

export const getTodosByGrupoId = async (groupId: string): Promise<Todo[]> => {
  const res = await API.get(`/todos/grupo/${groupId}`);
  return res.data;
};

export const createTodo = async (
  text: string,
  description:string,
  groupId: string,
  userId?: string
): Promise<Todo> => {
  const res = await API.post(`/todos`, { text, group: groupId,description:description });
  return res.data;
};

export const createTodoNormal = async (
  text: string,
    description:string,
): Promise<Todo> => {
  const res = await API.post(`/todos`, { text, group:null,description:description });
  return res.data;
};

export const deleteTodoById = async (todoId: string): Promise<void> => {
  await API.delete(`/todos/${todoId}`);
};

export const toggleCompleteTodoById = async (
  todoId: string,
  userId?: string
): Promise<Todo> => {
  const res = await API.post(`/todos/completar/${todoId}`, {});
  return res.data;
};


export const UpdateTodo = async (
  text: string,
  description:string,
  groupId: string,
  userId?: string
): Promise<Todo> => {
  const res = await API.post(`/todos`, { text, group: groupId,description:description });
  return res.data;
};