import React from 'react';
import { Users, Eye, UserPlus, Target } from 'lucide-react';
import Card from './Card';
import Button from './Button';

const TeamCard = ({ team, onViewDetails, onJoinRequest, myTeam }) => (
  <Card className="p-6 hover:shadow-xl transition-shadow duration-200">
    <div className="flex justify-between items-start mb-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-black tracking-tight text-black uppercase">
            {team.name}
          </h3>
          {team.isPrivate && (
            <span className="px-2 py-1 bg-gray-800 text-white text-xs font-bold tracking-wide uppercase">
              Private
            </span>
          )}
          <span className={`px-2 py-1 text-xs font-bold tracking-wide uppercase ${
            team.status === 'Active' ? 'bg-green-500 text-white' :
            team.status === 'Recruiting' ? 'bg-blue-500 text-white' :
            'bg-red-500 text-white'
          }`}>
            {team.status}
          </span>
        </div>
        <p className="text-sm text-gray-700 mb-3 font-medium">
          {team.description}
        </p>
      </div>
    </div>

    <div className="space-y-3 mb-4">
      <div className="flex items-center gap-2">
        <Target size={16} className="text-gray-600" />
        <span className="text-xs font-bold tracking-wider uppercase text-gray-600">
          Led by {team.leader.name} • {team.leader.designation}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <Users size={16} className="text-gray-600" />
        <span className="text-xs font-bold tracking-wider uppercase text-gray-600">
          {team.members.length}/{team.maxMembers} Members
        </span>
      </div>

      <div className="flex flex-wrap gap-1 mt-2">
        {team.skills.split(',').slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 border border-black text-xs font-bold tracking-wide uppercase"
          >
            {skill.trim()}
          </span>
        ))}
        {team.skills.split(',').length > 3 && (
          <span className="px-2 py-1 bg-gray-200 text-xs font-bold tracking-wide uppercase">
            +{team.skills.split(',').length - 3} more
          </span>
        )}
      </div>
    </div>

    <div className="flex gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onViewDetails(team)}
        className="flex-1"
      >
        <Eye size={14} className="inline mr-1" />
        View Details
      </Button>
      {team.status === 'Recruiting' && !myTeam && (
        <Button
          variant="primary"
          size="sm"
          onClick={() => onJoinRequest(team)}
          className="flex-1"
        >
          <UserPlus size={14} className="inline mr-1" />
          Request to Join
        </Button>
      )}
    </div>
  </Card>
);

export default TeamCard;