import React from 'react';

interface Props {
  value: string;
  description:string;
  onChange: (val: string) => void;
  onChangeDescription: (val: string) => void;
  onSubmit: () => void;
}

export default function TodoForm({ value,description, onChange, onSubmit,onChangeDescription }: Props) {
  return (
    <form className='w-100'
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="mb-1 d-flex">
        <div className='flex-fill me-2'>
            <input
          className="form-control me-2"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Nuevo Que Hacer"
          required
        />
        <textarea name="" id="" className='form-control form-control-sm mt-2'     value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
          placeholder="Descripción"
          required></textarea>
        </div>
          <button type="submit" className="btn btn-success btn-sm">Agregar</button>
      </div>
    </form>
  );
}
