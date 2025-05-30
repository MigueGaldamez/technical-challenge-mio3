import React from 'react';
import { Group } from '@/types/Group';
import { Todo } from '@/types/todo';
import TodoItem from '../taskItem/taskItem';
import TodoForm from '../todoForm/todoForm';

interface Props {
  group: Group;
  todos: Todo[];
  onClose: () => void;
  onAddTodo: () => void;
  onChangeTodoText: (val: string) => void;
  todoText: string;
  onChangeTodoDescription: (val: string) => void;
  todoDescription: string;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
   onSave: (updatedTodo: Todo) => Promise<void>;
}

export default function Sidebar({ group, todos, onSave,onClose, onAddTodo, onChangeTodoText, todoText,todoDescription, onDelete, onToggle,onChangeTodoDescription }: Props) {
  return (
    <aside className="sidebar bg-white shadow position-fixed top-0 end-0 h-100 p-4" >
      <div className="d-flex justify-content-between mb-3">
        <h5>Grupo: {group.name}</h5>
        <button className="btn-close" onClick={onClose}></button>
      </div>
      {todos.map(todo => (
        <TodoItem  onSave={onSave}  key={todo._id} todo={todo} mostrarUsuario={true}  onDelete={() => onDelete(todo._id)} onDoubleClick={() => onToggle(todo._id)} />
      ))}
      <hr />
      <TodoForm value={todoText} onChange={onChangeTodoText} description={todoDescription} onSubmit={onAddTodo} onChangeDescription={onChangeTodoDescription}/>
    </aside>
  );
}
