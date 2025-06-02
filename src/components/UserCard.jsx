import React from 'react';
import { Plus, Mail, Check } from 'lucide-react';
import Card from './Card';
import Button from './Button';

const UserCard = ({ user, isSelected, onToggleSelect, showInviteButton = false, onInvite }) => (
  <Card className={`p-4 ${isSelected ? 'ring-2 ring-black' : ''} hover:shadow-lg transition-all duration-200`}>
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h4 className="text-sm font-black tracking-tight text-black uppercase mb-1">
          {user.name}
        </h4>
        <p className="text-xs text-gray-600 font-medium mb-2">
          {user.designation} • {user.department}
        </p>
        <p className="text-xs text-gray-500 font-medium mb-2">
          {user.experience} years experience
        </p>
        <div className="flex flex-wrap gap-1">
          {user.skills.split(',').slice(0, 2).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 border border-gray-300 text-xs font-bold tracking-wide uppercase"
            >
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 ml-4">
        {showInviteButton ? (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onInvite(user)}
          >
            <Mail size={12} className="inline mr-1" />
            Invite
          </Button>
        ) : (
          <button
            onClick={() => onToggleSelect(user)}
            className={`p-2 border-2 border-black transition-all duration-200 ${
              isSelected ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            {isSelected ? <Check size={16} /> : <Plus size={16} />}
          </button>
        )}
      </div>
    </div>
  </Card>
);

export default UserCard;