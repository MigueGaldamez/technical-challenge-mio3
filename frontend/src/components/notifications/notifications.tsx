'use client';

import { useAuth } from '@/app/context/AuthContext';
import { NotificationDetail } from '@/types/NotificationDetail';
import API from '@/utils/api';
import classNames from 'classnames';
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

  const fetchNotifications = async () => {
    const res = await API.get('/notification');
    setNotifications(res.data);
  };
  return (
    <div>
      <div>
        <div className="dropdown ms-3 me-2">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fa-solid fa-bell me-2"></i>
          </button>
          <ul className="dropdown-menu mi-dropdown-menu-lg">
             {notifications.map(todo => (
                             <li key={todo._id}
                             className={classNames('px-2 bg-faded rounded mx-1 mb-1')} >
                             
                             <div >
                                    <span  className={classNames('',{
                              
                             })}>  {todo.notificationId.description} </span>
                             
                             </div>
                             </li>
                           ))}
          </ul>
        </div>
      </div>
    </div>
  );
}