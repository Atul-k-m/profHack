import React, { useState } from 'react';
import { Users, Search } from 'lucide-react';
import Card from '../components/Card';
import TeamCard from '../components/TeamCard';

const TeamFormation = ({ teams, myTeam, onViewDetails, onJoinRequest }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.skills.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div>
      {/* Search and Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black text-sm font-medium"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map(team => (
          <TeamCard
            key={team.id}
            team={team}
            myTeam={myTeam}
            onViewDetails={onViewDetails}
            onJoinRequest={onJoinRequest}
          />
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <Card className="p-8 text-center">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-black tracking-tight text-black uppercase mb-2">
            No Teams Found
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            {searchTerm ? 'Try adjusting your search terms' : 'Be the first to create a team!'}
          </p>
        </Card>
      )}
    </div>
  );
};

export default TeamFormation;