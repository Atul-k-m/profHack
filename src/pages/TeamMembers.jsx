// src/pages/TeamMembers.jsx
import React, { useState, useEffect } from 'react';
import { UserPlus, Search } from 'lucide-react';
import Card from '../components/Card';
import UserCard from '../components/UserCard';
import Button from '../components/Button';

const TeamMembers = ({
  availableUsers,  
  myTeam,          
  onShowCreateForm,
  onInvite,        
  loading           
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

 
  const uniqueDepts = React.useMemo(() => {
    const allDeps = (availableUsers || []).map(u => u.department || 'Unknown');
    return Array.from(new Set(allDeps)).sort();
  }, [availableUsers]);


  const filteredUsers = (availableUsers || []).filter(user => {
    const nameLower = user.name?.toLowerCase() || '';
    const skillsLower = user.skills?.toLowerCase() || '';
    const matchesSearch =
      nameLower.includes(searchTerm.toLowerCase()) ||
      skillsLower.includes(searchTerm.toLowerCase());
    const matchesDept =
      departmentFilter === 'all' || user.department === departmentFilter;
    return matchesSearch && matchesDept;
  });


  if (!Array.isArray(availableUsers)) {
    return (
      <Card className="p-8 text-center">
        <p className="text-lg font-semibold">Loading available members...</p>
      </Card>
    );
  }

  return (
    <div>
     
      <Card className="p-4 mb-6 bg-white shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
     
          <div className="flex-1">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search available members..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="
                  w-full pl-10 pr-4 py-2
                  border-2 border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-gray-500
                  text-sm font-medium text-gray-800
                  rounded
                "
              />
            </div>
          </div>

          
          <select
            value={departmentFilter}
            onChange={e => setDepartmentFilter(e.target.value)}
            className="
              px-4 py-2
              border-2 border-gray-300
              focus:outline-none focus:ring-2 focus:ring-gray-500
              text-sm font-medium text-gray-800
              rounded
            "
          >
            <option value="all">All Departments</option>
            {uniqueDepts.map(d => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </Card>

     
      {!myTeam && (
        <Card className="p-6 mb-6 bg-yellow-50 border-yellow-300">
          <div className="flex items-center justify-between">
            <p className="text-yellow-800 font-medium">
              You don’t yet have a team. Create one first, then invite members!
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={onShowCreateForm}
              disabled={loading}
            >
              + Create Team
            </Button>
          </div>
        </Card>
      )}

  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(user => (
          <UserCard
            key={user._id}
            user={user}
            isSelected={selectedUsers.includes(user._id)}
            onToggleSelect={() => {
              setSelectedUsers(prev =>
                prev.includes(user._id)
                  ? prev.filter(id => id !== user._id)
                  : [...prev, user._id]
              );
            }}
            
            showInviteButton={Boolean(myTeam && myTeam.members.length < myTeam.maxMembers)}
            onInvite={() => onInvite(user)}
          />
        ))}
      </div>

    
      {filteredUsers.length === 0 && (
        <Card className="p-8 text-center bg-white shadow-lg">
          <UserPlus size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-black uppercase mb-2 text-gray-800">
            NO AVAILABLE MEMBERS
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            {searchTerm
              ? 'Try adjusting your search or department filter'
              : 'All users are currently in teams or already invited.'}
          </p>
        </Card>
      )}


      {selectedUsers.length > 0 && !myTeam && (
        <Card className="fixed bottom-6 right-6 p-4 bg-white shadow-xl rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-gray-800">
              {selectedUsers.length} selected
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={onShowCreateForm}
              disabled={loading}
            >
              Create Team with Selected
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};


TeamMembers.defaultProps = {
  availableUsers: []
};

export default TeamMembers;
