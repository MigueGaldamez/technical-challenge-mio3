'use client';
import API from '../../../utils/api';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Group } from '@/types/Group';

export default function JoinPage({ params }: { params: { groupId: string } }) {
  const [group, setGroup] = useState<Group | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

    useEffect(() => {
    API.get('/auth/me')
      .then(() => fetchGroup())
      .catch(() => router.push('/login'));
  }, [params.groupId]);

   const fetchGroup = async () => {
      try {
         const res = await API.post('/group/join/' + params.groupId);
        setGroup(res.data);
      } catch (err) {
        setError('Falla al Unirse al Grupo');
      }
    };


  if (error) return <div>{error}</div>;
  if (!group) return <div>Loading...</div>;

  return <div className='text-center my-5'><h1 className='text-faded'>Felicidades te Uniste a </h1><h1 className='display-1'>{group.name}</h1></div>;
}
