'use client';

import { useAuth } from '@/app/context/AuthContext';
import { NotificationDetail } from '@/types/NotificationDetail';
import API from '@/utils/api';
import { formatDateDDMMYYYY, formatRelativeTime } from '@/utils/date.utils';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let socket;

export default function Notifications({ userId }) {
  const [message, setMessage] = useState('');
  const { user, logout, loading } = useAuth();
  const [notifications, setNotifications] = useState<NotificationDetail[]>([]);

  useEffect(() => {
    socket = io('http://localhost:5000', {
      auth: { userId }, 
      withCredentials: true,
    });

    socket.on('connect', () => {
    });
    socket.on('disconnect', () => {
    });

    socket.on('notification', (data) => {
    fetchNotifications();
    });

    fetchNotifications();
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const leerNotificacion = async (id: string) => {
    await API.get(`/notification/${id}`);
    fetchNotifications();
  };

  const fetchNotifications = async () => {
    const res = await API.get('/notification');
    setNotifications(res.data);
  };
  return (
    <div>
      <div>
        <div className="dropdown ms-3 me-2">
       
          <button className="btn btn-secondary dropdown-toggle position-relative" type="button" data-bs-toggle="dropdown" aria-expanded="false">
             {notifications.length !== 0 ? (
               <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {notifications.length}
            </span>
             ):(<></>)}
              <i className="fa-solid fa-bell me-2"></i>
          </button>
          <ul className="dropdown-menu mi-dropdown-menu-lg pb-0 pt-1">
            {notifications.length === 0 ? (
              <li
                className={classNames('px-2 bg-light text-dark rounded mx-1 mb-1 hv-pine-d1 hv-text-light-l4')} >
                
                <div className='d-flex align-items-center'>
                <h5 className='me-2'><i className="fa-solid fa-bell"></i></h5>
                      <span  className={classNames('fw-normal',{
                
                })}>  Felicidades, no tiene notificaciones pendientes. </span>
                
                </div>
                </li>
            ) : (
            notifications.map(todo => (
                <li key={todo._id} 
                className={classNames('px-2 py-1 bg-light text-dark rounded mx-1 mb-1 hv-pine-d1 hv-text-light-l4')} >
                
                <Link href={`/grupos?groupId=${todo.notificationId.groupId}`} className='text-decoration-none'>
                <div  className='d-flex align-items-center '>
  <h5 className='me-2'><i className="fa-solid fa-bell" onClick={() => leerNotificacion(todo._id)}></i></h5>
                      <span  className={classNames('fw-normal lh-sm',{
                
                })}>  {todo.notificationId.description} </span>
                </div>
              
                  {todo.createdAt && <small className='d-block fw-light fs-xs ms-4 text-faded-l4'> {formatRelativeTime(todo.createdAt)}</small>}
                </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      
    </div>
  );
}