import React from 'react';

interface Props {
  text: string;
  description: string;
  onTextChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
  onSubmit: () => void;
}

export default function GroupForm({ text, description, onTextChange, onDescriptionChange, onSubmit }: Props) {
  return (
    <div>
      <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="d-flex mb-3 flex-wrap"
    >
      <div className='flex-fill me-2'>
          <input className="form-control me-2" value={text} onChange={(e) => onTextChange(e.target.value)} placeholder="Nuevo Grupo" />
      </div>
      <div className='flex-fill me-2'>
        <input className="form-control me-2" value={description} onChange={(e) => onDescriptionChange(e.target.value)} placeholder="Descripción" />
      </div>
      <div className='flex-fill me-2 mt-2 mt-md-0'>
          <button type="submit" className="btn btn-primary">Crear Nuevo Grupo</button>
      </div>
    </form>
    </div>
  );
}