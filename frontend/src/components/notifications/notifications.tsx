'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let socket;

export default function Notifications({ userId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket = io('http://localhost:5000', {
      auth: { userId }, 
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('Connected to socket:', socket.id);
    });

    socket.on('notification', (data) => {
      console.log('Notification received:', data);
      setMessage(data.message); 
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return (
    <div>
      <div>
        <i className="fa-solid fa-bell"></i>
         {message && (
        <div className="p-4 bg-blue-200 text-blue-800 rounded shadow-md">
          🔔 {message}
        </div>
      )}
      </div>
     
    </div>
  );
}