import React from 'react';
import { Group } from '@/types/Group';

interface Props {
  grupos: Group[];
  userId: string;
  selectedGroupId?: string;
  onSelect: (group: Group) => void;
  onCopy: (groupId: string) => void;
  copiedId: string | null;
}

export default function GroupList({ grupos, userId, selectedGroupId, onSelect, onCopy, copiedId }: Props) {
  return (
    <ul className="list-group">
      {grupos.map((group) => (
        <li
          key={group._id}
          className={`list-group-item d-flex justify-content-between align-items-center ${group._id === selectedGroupId ? 'bg-light' : ''}`}
          onClick={() => onSelect(group)}
          style={{ cursor: 'pointer' }}
        >
          <div>
            <span className="h5">{group.name}</span>
            <small className="d-block">{group.description}</small>
          </div>
          <div>
            {group.owner._id === userId ? (
              <button className="btn btn-pine btn-sm" onClick={(e) => { e.stopPropagation(); onCopy(group._id); }}>
                {copiedId === group._id ? 'Copiado!' : 'Invitar'}
              </button>
            ) : (
              <span>Creado Por: {group.owner.username}</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
