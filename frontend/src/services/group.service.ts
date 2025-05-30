import API from '@/utils/api';
import { Group } from '@/types/Group';

export const getGruposByUsuarioId = async (userId: string): Promise<Group[]> => {
  const res = await API.get(`/group`);
  return res.data;
};

export const createGrupo = async (
  name: string,
  description: string,
  userId?: string
): Promise<Group> => {
  const res = await API.post(`/group`, { text: name, description });
  return res.data;
};
