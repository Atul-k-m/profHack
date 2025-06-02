import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, ArrowLeft } from 'lucide-react';
import PropTypes from 'prop-types';

import Card from '../components/Card';
import Button from '../components/Button';
import UserCard from '../components/UserCard';

import {
  createTeam,
  getAvailableUsers,
  inviteUserToTeam,
  getCurrentUserId,
} from '../services/api';

const TeamWizard = ({ onBack = null }) => {
  const navigate = useNavigate();

  // Team creation state
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [maxMembers, setMaxMembers] = useState(5);
  const [skills, setSkills] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [newTeam, setNewTeam] = useState(null);

  // User invitation state
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [inviteError, setInviteError] = useState(null);
  const [userFetchError, setUserFetchError] = useState(null);
  const [invitedUserIds, setInvitedUserIds] = useState(new Set());

  const currentUserId = getCurrentUserId();

  // Fetch available users
  const fetchUsers = async () => {
    setLoadingUsers(true);
    setUserFetchError(null);

    try {
      console.log('Fetching users for team:', newTeam?.id);
      const u = await getAvailableUsers();
      console.log('Users received:', u);

      if (!u) {
        throw new Error('No users data received from API');
      }

      setUsers(Array.isArray(u) ? u : []);
    } catch (err) {
      console.error('Failed to load available users:', err);
      setUserFetchError(err.message || 'Failed to load users');
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch users when team is created
  useEffect(() => {
    if (newTeam && newTeam.id) {
      fetchUsers();
    }
  }, [newTeam]);

  // Handle team creation
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);

    if (!teamName.trim() || !description.trim()) {
      setCreateError('Team name and description are required.');
      setCreating(false);
      return;
    }

    const payload = {
      name: teamName.trim(),
      description: description.trim(),
      leader: currentUserId,
      members: [currentUserId],
      maxMembers,
      skills: skills.trim(),
      isPrivate,
      status: 'Recruiting',
    };

    try {
      const created = await createTeam(payload);
      console.log('Team created response:', created);

      // If the API wraps the team inside a "team" property, grab that; otherwise use created directly
      const teamData = created.team || created;

      // Look for an "id" first; if not present, fall back to "_id"
      const realId = teamData.id || teamData._id;
      if (!realId) {
        throw new Error('Team creation succeeded but no team ID was returned');
      }

      // Normalize so that newTeam.id always exists
      setNewTeam({
        ...teamData,
        id: realId.toString(),
      });
    } catch (err) {
      console.error('Create team error:', err);
      setCreateError(err.message || 'Failed to create team');
    } finally {
      setCreating(false);
    }
  };

  // Handle user invitation
  const handleInviteUser = async (user) => {
    if (!newTeam || !newTeam.id) return;
    setInviteError(null);

    try {
      const userId = user._id || user.id;
      console.log('Inviting user:', userId, 'to team:', newTeam.id);
      
      // Use the existing inviteUserToTeam function from your API service
      await inviteUserToTeam(newTeam.id, userId, `You have been invited to join ${newTeam.name}`);
      
      setInvitedUserIds((prev) => new Set(prev).add(userId));
      
      // Show success message
      setInviteError(`Invitation sent to ${user.name} successfully!`);
      setTimeout(() => setInviteError(null), 3000);
      
    } catch (err) {
      console.error('Failed to invite:', err);
      setInviteError(err.message || 'Invitation failed');
    }
  };

  // Reset to team creation form
  const handleBackToCreate = () => {
    setNewTeam(null);
    setUsers([]);
    setSearchTerm('');
    setDeptFilter('all');
    setInvitedUserIds(new Set());
    setInviteError(null);
    setUserFetchError(null);
  };

  // Improved navigation function
  const handleBackToTeams = () => {
    console.log('Navigating back to Teams, onBack function:', onBack);
    
    // First try the onBack prop (for when used as a modal/embedded component)
    if (onBack && typeof onBack === 'function') {
      try {
        onBack();
        return;
      } catch (error) {
        console.error('Error calling onBack prop:', error);
      }
    }
    
    // Use React Router navigation
    try {
      navigate('/teams');
      return;
    } catch (error) {
      console.warn('React Router navigation failed:', error);
    }
    
    // Fallback navigation strategies
    console.warn('Using fallback navigation methods');
    
    try {
      // Try browser history back
      if (window.history && window.history.length > 1) {
        window.history.back();
        return;
      }
    } catch (error) {
      console.warn('History.back() failed:', error);
    }
    
    try {
      // Try to navigate to a known teams route
      const currentPath = window.location.pathname;
      if (currentPath.includes('/create-team') || currentPath.includes('/team-wizard')) {
        window.location.pathname = '/teams';
        return;
      }
    } catch (error) {
      console.warn('Pathname navigation failed:', error);
    }
    
    // Last resort - reload to teams page
    try {
      window.location.href = '/teams';
    } catch (error) {
      console.error('All navigation methods failed:', error);
      // If everything fails, at least reload the page
      window.location.reload();
    }
  };

  // Filter users based on search and department
  const filteredUsers = users.filter((u) => {
    const nameLower = u.name?.toLowerCase() || '';
    const skillsLower = u.skills?.toLowerCase() || '';
    const matchesSearch =
      nameLower.includes(searchTerm.toLowerCase()) ||
      skillsLower.includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'all' || u.department === deptFilter;
    const userId = u._id || u.id; // Handle both _id and id formats
    const notInvited = !invitedUserIds.has(userId);
    const notCurrentUser = userId !== currentUserId; // Exclude team leader

    return matchesSearch && matchesDept && notInvited && notCurrentUser;
  });

  // Get unique departments for filter dropdown
  const uniqueDepts = React.useMemo(() => {
    const allDeps = users.map((u) => u.department || 'Unknown');
    return Array.from(new Set(allDeps)).sort();
  }, [users]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-full max-w-screen-lg mx-auto space-y-6">
        
        {/* Team Creation Form */}
        {!newTeam && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Create a New Team</h2>
              <button
                onClick={handleBackToTeams}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={18} className="mr-1" />
                Back
              </button>
            </div>

            <Card className="bg-white p-6 shadow-lg">
              {createError && (
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 mb-4 rounded">
                  {createError}
                </div>
              )}
              
              <form onSubmit={handleCreateTeam} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="teamName">
                    Team Name
                  </label>
                  <input
                    id="teamName"
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g. Robotics Club Alpha"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={3}
                    placeholder="Describe your team's mission…"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="maxMembers">
                      Max Members
                    </label>
                    <input
                      id="maxMembers"
                      type="number"
                      min={1}
                      max={50}
                      value={maxMembers}
                      onChange={(e) => setMaxMembers(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="skills">
                      Required Skills (comma‐separated)
                    </label>
                    <input
                      id="skills"
                      type="text"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="e.g. React, Node.js, CAD"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="isPrivate"
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isPrivate" className="text-sm font-medium">
                    Make this team private (invite-only)
                  </label>
                </div>

                <div className="pt-4 flex gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleBackToTeams}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={creating}
                    className="flex-1"
                  >
                    {creating ? 'Creating…' : 'Create Team'}
                  </Button>
                </div>
              </form>
            </Card>
          </>
        )}

        {/* Member Invitation Section */}
        {newTeam && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Invite Members</h2>
              <button
                onClick={handleBackToCreate}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={18} className="mr-1" />
                Back to Create
              </button>
            </div>

            {/* Team Info Card */}
            <Card className="bg-white p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-1">Team: {newTeam.name}</h3>
              <p className="text-gray-600 mb-4">{newTeam.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <div>
                  <strong>Max Members:</strong> {newTeam.maxMembers}
                </div>
                <div>
                  <strong>Skills:</strong> {newTeam.skills || 'N/A'}
                </div>
                <div>
                  <strong>Privacy:</strong> {newTeam.isPrivate ? 'Private' : 'Public'}
                </div>
              </div>
            </Card>

            {/* Search and Filter Card */}
            <Card className="bg-white p-4 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search available members…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex-1 md:flex-none">
                  <select
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="all">All Departments</option>
                    {uniqueDepts.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Error/Success Messages */}
            {inviteError && (
              <Card className={`p-4 ${
                inviteError.includes('successfully') 
                  ? 'bg-green-100 border border-green-300 text-green-700'
                  : 'bg-red-100 border border-red-300 text-red-700'
              }`}>
                {inviteError}
              </Card>
            )}

            {userFetchError && (
              <Card className="bg-red-100 border border-red-300 text-red-700 p-4">
                Error loading users: {userFetchError}
              </Card>
            )}

            {/* User Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loadingUsers && (
                <div className="col-span-full text-center text-gray-500">
                  Loading available users…
                </div>
              )}

              {!loadingUsers && filteredUsers.length === 0 && !userFetchError && (
                <Card className="col-span-full bg-white p-8 text-center">
                  <UserPlus size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    NO AVAILABLE MEMBERS
                  </h3>
                  <p className="text-sm text-gray-500">
                    {searchTerm || deptFilter !== 'all'
                      ? 'Try adjusting your search or department filter'
                      : 'All users are currently in teams or already invited.'}
                  </p>
                </Card>
              )}

              {!loadingUsers &&
                filteredUsers.map((user) => (
                  <UserCard
                    key={user._id || user.id}
                    user={user}
                    isSelected={false}
                    onToggleSelect={() => {}}
                    showInviteButton={true}
                    onInvite={() => handleInviteUser(user)}
                  />
                ))}
            </div>

            {/* Action Buttons */}
            <Card className="bg-white p-4 shadow-lg">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {invitedUserIds.size > 0 && (
                    <span>{invitedUserIds.size} invitation(s) sent</span>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleBackToTeams}
                  >
                    Finish Later
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleBackToTeams}
                  >
                    Complete Team Setup
                  </Button>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};


TeamWizard.propTypes = {
  onBack: PropTypes.func
};


TeamWizard.defaultProps = {
  onBack: null
};

export default TeamWizard;