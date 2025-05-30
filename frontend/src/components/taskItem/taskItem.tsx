import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '@/types/todo';
import { formatDateDDMMYYYY } from '@/utils/date.utils';

interface Props {
  todo: Todo;
  mostrarUsuario: boolean;
  onDelete: () => void;
  onDoubleClick: () => void;
  onSave: (updatedTodo: Todo) => Promise<void>; 
}

export default function TodoItem({ todo, mostrarUsuario, onDelete, onDoubleClick, onSave }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [editedDescription, setEditedDescription] = useState(todo.description || '');

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedTodo = { ...todo, text: editedText, description: editedDescription };
    await onSave(updatedTodo); 
    setIsEditing(false);
  };

  return (
    <li
      className={classNames('list-group-item d-flex justify-content-between align-items-center', { 'mb-2': mostrarUsuario })}
      onDoubleClick={onDoubleClick}
    >
      <div style={{ flex: 1 }}>
        {todo.usuarioCompleta && mostrarUsuario && (
          <small className="d-block">
            <i className="fa-solid fa-user"></i> {todo.usuarioCompleta.username}
          </small>
        )}

        {isEditing   ? (
          <>
            <div className='me-2'>
                <input
              className="form-control form-control-sm mb-1"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <input
              className="form-control form-control-sm"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            </div>
          </>
        ) : (
          <>
            <span className={classNames('d-block', { 'text-decoration-line-through': todo.completado })}>
              {todo.text}
            </span>
            {todo.description && (
              <small className="d-block fs-xs text-faded-l3">{todo.description}</small>
            )}
            {todo.fechaHoraCompletado && (
              <small className="d-block fs-xs text-faded-l3">
                Completado {formatDateDDMMYYYY(todo.fechaHoraCompletado)}
              </small>
            )}
          </>
        )}
      </div>

      <div>
    {isEditing ? (
        <button className="btn btn-success btn-sm me-2" onClick={handleSave}>
          <i className="fa-solid fa-check"></i>
        </button>
      ) : todo.completado ? (
        <button className="btn btn-secondary btn-sm me-2" disabled>
          <i className="fa-solid fa-lock"></i>
        </button>
      ) : (
        <button
          className="btn btn-warning btn-sm me-2"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        >
          <i className="fa-solid fa-edit"></i>
        </button>
      )}
        <button className="btn btn-danger btn-sm" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          X
        </button>
      </div>
    </li>
  );
}
