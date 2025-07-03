import React, { useState, useEffect, useCallback } from 'react';
import { Users, Crown, User, MapPin, AlertCircle, Plus, Eye, ChevronRight, ArrowLeft, LogOut, Trash2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MyTeamSection from '../components/MyTeam'; 
const Card = React.memo(({ children, className = "" }) => (
  <div className={`bg-white border-2 border-black shadow-lg relative overflow-hidden hover:shadow-2xl transition-all duration-300 ${className}`}>
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
      <div 
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        className="w-full h-full"
      />
    </div>
    <div className="relative z-10">
      {children}
    </div>
  </div>
));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-16">
    <div className="relative">
      <div className="animate-spin w-12 h-12 border-4 border-black border-t-transparent rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full animate-pulse"></div>
    </div>
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <Card className="p-6 bg-red-50 border-red-500 hover:shadow-xl">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="p-2 bg-red-100 rounded-full mr-4">
          <AlertCircle size={24} className="text-red-600" />
        </div>
        <div>
          <h3 className="text-lg font-black text-red-800 uppercase tracking-wide mb-1">Error Occurred</h3>
          <p className="text-sm text-red-700 font-medium">{message}</p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-red-600 text-white hover:bg-red-700 border-2 border-red-600 font-bold text-sm tracking-wide uppercase transition-all duration-200 hover:scale-105"
        >
          Retry
        </button>
      )}
    </div>
  </Card>
);

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, isDestructive = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white border-4 border-black max-w-md w-full shadow-2xl">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`p-2 rounded-full mr-3 ${isDestructive ? 'bg-red-100' : 'bg-yellow-100'}`}>
              <AlertTriangle size={24} className={isDestructive ? 'text-red-600' : 'text-yellow-600'} />
            </div>
            <h3 className="text-lg font-black text-black uppercase tracking-wide">{title}</h3>
          </div>
          
          <p className="text-gray-700 font-medium mb-6 leading-relaxed">{message}</p>
          
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-800 hover:bg-gray-300 border-2 border-gray-300 font-bold text-sm tracking-wide uppercase transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-6 py-3 border-2 font-bold text-sm tracking-wide uppercase transition-all duration-200 hover:scale-105 ${
                isDestructive 
                  ? 'bg-red-600 text-white hover:bg-red-700 border-red-600' 
                  : 'bg-yellow-600 text-white hover:bg-yellow-700 border-yellow-600'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const TeamCard = ({ team, onViewDetails, isCompact = false }) => {
  if (isCompact) {
    return (
      <div 
        className="group p-5 border-2 border-gray-300 hover:border-black cursor-pointer transition-all duration-300 hover:bg-gray-50 bg-white hover:shadow-lg hover:scale-[1.02]"
        onClick={() => onViewDetails(team)}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-black text-black truncate mb-1">{team.teamName}</h3>
            <p className="text-sm text-gray-600 truncate font-medium">Led by {team.leader.name}</p>
            <p className="text-xs text-gray-500 font-medium mt-1">{team.members.length} members</p>
          </div>
          <ChevronRight size={20} className="text-gray-400 group-hover:text-black transition-colors duration-200" />
        </div>
      </div>
    );
  }

  return (
    <Card className="p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-black text-black truncate mb-2 group-hover:text-gray-800 transition-colors">{team.teamName}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 font-medium leading-relaxed">{team.description}</p>
        </div>
        <button
          onClick={() => onViewDetails(team)}
          className="ml-3 p-3 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110 border-2 border-transparent hover:border-gray-300"
          title="View Details"
        >
          <Eye size={18} className="text-gray-600" />
        </button>
      </div>
      
      <div className="flex items-center gap-6 text-sm text-gray-500 mb-4 font-medium">
        <div className="flex items-center gap-2">
          <Crown size={14} className="text-yellow-500" />
          <span>{team.leader.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={14} className="text-blue-500" />
          <span>{team.members.length} members</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {team.members.slice(0, 3).map(member => (
          <div key={member._id} className="px-3 py-1 bg-gray-100 text-xs font-bold rounded-full hover:bg-gray-200 transition-colors">
            {member.name}
          </div>
        ))}
        {team.members.length > 3 && (
          <div className="px-3 py-1 bg-gradient-to-r from-gray-200 to-gray-300 text-xs font-bold rounded-full text-gray-700">
            +{team.members.length - 3} more
          </div>
        )}
      </div>
    </Card>
  );
};

const TeamDetailsModal = ({ team, currentUserId, onClose }) => {
  if (!team) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white border-4 border-black max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-black uppercase tracking-wide">{team.teamName}</h2>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110 border-2 border-transparent hover:border-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-black text-gray-600 uppercase tracking-wider mb-3">Description</h3>
              <p className="text-base text-gray-700 leading-relaxed font-medium bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">{team.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-black text-gray-600 uppercase tracking-wider mb-3">Team Leader</h3>
              <MemberBadge 
                member={team.leader} 
                isCurrentUser={team.leader._id === currentUserId}
                isLeader={true}
              />
            </div>

            <div>
              <h3 className="text-sm font-black text-gray-600 uppercase tracking-wider mb-3">
                Team Members ({team.members.length})
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {team.members.map(member => (
                  <MemberBadge 
                    key={member._id}
                    member={member} 
                    isCurrentUser={member._id === currentUserId}
                    isLeader={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const AddMemberModal = ({ isOpen, onClose, availableFaculty, onAddMember, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white border-4 border-black max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-black uppercase tracking-wide">Add Team Member</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {availableFaculty.length === 0 ? (
            <div className="text-center py-8">
              <Users size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">No available faculty members found</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 font-medium mb-4">
                Select a faculty member to add to your team:
              </p>
              {availableFaculty.map(faculty => (
                <div key={faculty._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {faculty.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{faculty.name}</p>
                      <p className="text-sm text-gray-600">{faculty.department}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onAddMember(faculty._id)}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 font-bold text-sm uppercase rounded transition-all duration-200 disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const TeamsPage = ({ onCreateTeam }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userTeam, setUserTeam] = useState(null);
  const [allTeams, setAllTeams] = useState([]);
  const [availableFaculty, setAvailableFaculty] = useState([]);
const [showAddMemberModal, setShowAddMemberModal] = useState(false);
const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ 
  isOpen: false, 
  type: null, 
  teamId: null, 
  memberId: null 
});
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();

  const getAuthToken = useCallback(() => {
    return window.authToken || localStorage.getItem('authToken') || localStorage.getItem('token');
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('No authentication token found');

      const response = await fetch('https://profhack-backend-npqc.onrender.com/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch user profile');
      
      const userData = await response.json();
      setCurrentUser(userData);
      return userData;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }, [getAuthToken]);

  const fetchUserTeam = useCallback(async () => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('No authentication token found');

      const response = await fetch('https://profhack-backend-npqc.onrender.com/api/teams/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const teamData = await response.json();
        setUserTeam(teamData);
        return teamData;
      } else if (response.status === 404) {
        setUserTeam(null);
        return null;
      } else {
        throw new Error('Failed to fetch user team');
      }
    } catch (error) {
      console.error('Error fetching user team:', error);
      throw error;
    }
  }, [getAuthToken]);

  const fetchAllTeams = useCallback(async (excludeTeamId = null) => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('No authentication token found');

      const response = await fetch('https://profhack-backend-npqc.onrender.com/api/teams/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch teams');
      
      const teamsData = await response.json();
      
      const filteredTeams = excludeTeamId 
        ? teamsData.filter(team => team._id !== excludeTeamId)
        : teamsData;
      
      setAllTeams(filteredTeams);
    } catch (error) {
      console.error('Error fetching all teams:', error);
      throw error;
    }
  }, [getAuthToken]);
const fetchAvailableFaculty = useCallback(async (teamId) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`https://profhack-backend-npqc.onrender.com/api/teams/${teamId}/available-faculty`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Failed to fetch available faculty');
    const data = await response.json();
    setAvailableFaculty(data);
  } catch (error) {
    console.error('Error fetching available faculty:', error);
  }
}, [getAuthToken]);

const handleAddMember = async (memberId) => {
  try {
    setActionLoading(true);
    const token = getAuthToken();
    const response = await fetch(`https://profhack-backend-npqc.onrender.com/api/teams/${userTeam._id}/members`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ memberId })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add member');
    }

    await loadData();
    setShowAddMemberModal(false);
    alert('Member added successfully!');
  } catch (error) {
    console.error('Error adding member:', error);
    setError(error.message);
  } finally {
    setActionLoading(false);
  }
};

const handleRemoveMember = async (memberId) => {
  try {
    setActionLoading(true);
    const token = getAuthToken();
    const response = await fetch(`https://profhack-backend-npqc.onrender.com/api/teams/${userTeam._id}/members/${memberId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to remove member');
    }

    await loadData();
    setConfirmModal({ isOpen: false, type: null, teamId: null, memberId: null });
    alert('Member removed successfully!');
  } catch (error) {
    console.error('Error removing member:', error);
    setError(error.message);
  } finally {
    setActionLoading(false);
  }
};
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const user = await fetchCurrentUser();
      const userTeamData = await fetchUserTeam();
      await fetchAllTeams(userTeamData?._id);

    } catch (error) {
      setError(error.message || 'Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [fetchCurrentUser, fetchUserTeam, fetchAllTeams]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLeaveTeam = async () => {
    if (!userTeam || !currentUser) return;

    try {
      setActionLoading(true);
      const token = getAuthToken();
      
      const response = await fetch(`https://profhack-backend-npqc.onrender.com/api/teams/${userTeam._id}/leave`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to leave team');
      }

      // Success - reload data
      await loadData();
      setConfirmModal({ isOpen: false, type: null, teamId: null });
      
      // Show success message (you can implement a toast/notification system)
      alert('Successfully left the team!');
      
    } catch (error) {
      console.error('Error leaving team:', error);
      setError(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTeam = async () => {
    if (!userTeam || !currentUser) return;

    try {
      setActionLoading(true);
      const token = getAuthToken();
      
      const response = await fetch(`https://profhack-backend-npqc.onrender.com/api/teams/${userTeam._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete team');
      }

      // Success - reload data
      await loadData();
      setConfirmModal({ isOpen: false, type: null, teamId: null });
      
      // Show success message
      alert('Team deleted successfully!');
      
    } catch (error) {
      console.error('Error deleting team:', error);
      setError(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateTeam = () => {
    navigate('/create-team');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleViewTeamDetails = useCallback((team) => {
    setSelectedTeam(team);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTeam(null);
  }, []);

const openConfirmModal = (type, memberId = null) => {
  setConfirmModal({ isOpen: true, type, teamId: userTeam._id, memberId });
};

const handleConfirmAction = () => {
  if (confirmModal.type === 'leave') {
    handleLeaveTeam();
  } else if (confirmModal.type === 'delete') {
    handleDeleteTeam();
  } else if (confirmModal.type === 'removeMember') {
    handleRemoveMember(confirmModal.memberId);
  }
};
  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, type: null, teamId: null });
  };



  const isTeamLeader = userTeam && currentUser && userTeam.leader._id === currentUser._id;
  const isTeamMember = userTeam && currentUser && userTeam.members.some(member => member._id === currentUser._id);

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 relative">
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, #000 1px, transparent 1px),
                linear-gradient(to bottom, #000 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-black tracking-tight text-black uppercase">Teams</h1>
          </div>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 relative">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        {/* Header with Back Button - Mobile Responsive */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <button
                onClick={handleBackToDashboard}
                className="group flex items-center justify-center sm:justify-start gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white border-2 border-black hover:bg-black hover:text-white font-bold text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px] group-hover:scale-110 transition-transform duration-200" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </button>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-black uppercase mb-1 sm:mb-2">Teams</h1>
                <p className="text-sm sm:text-base text-gray-600 font-medium">Manage and explore team collaborations</p>
              </div>
            </div>
            {!userTeam && (
              <button
                onClick={handleCreateTeam}
                className="group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 bg-black text-white hover:bg-gray-800 border-2 border-black font-bold text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 hover:scale-105 shadow-xl w-full sm:w-auto"
              >
                <Plus size={16} className="sm:w-[18px] sm:h-[18px] group-hover:rotate-90 transition-transform duration-300" />
                Create Team
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 sm:mb-8">
            <ErrorMessage message={error} onRetry={loadData} />
          </div>
        )}

        {/* Your Team Section */}
        {/* Your Team Section */}
     <MyTeamSection
  userTeam={userTeam}
  currentUser={currentUser}
  isTeamLeader={isTeamLeader}
  isTeamMember={isTeamMember}
  actionLoading={actionLoading}
  onAddMember={async () => {
    await fetchAvailableFaculty(userTeam._id);
    setShowAddMemberModal(true);
  }}
  onLeaveTeam={() => openConfirmModal('leave')}
  onDeleteTeam={() => openConfirmModal('delete')}
  onRemoveMember={(memberId) => openConfirmModal('removeMember', memberId)}
  onIdeaSubmission={() => navigate('/idea-submission')}
/>

        {/* Other Teams Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-black uppercase mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-gray-500"></div>
            {userTeam ? 'Other Teams' : 'All Teams'} ({allTeams.length})
          </h2>
          
          {allTeams.length === 0 ? (
            <Card className="p-6 sm:p-12 text-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="max-w-md mx-auto">
                <Users size={48} className="sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl font-black text-gray-600 mb-2 sm:mb-3 uppercase tracking-wide">No Teams Found</h3>
                <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed">
                  {userTeam ? 'No other teams have been created yet.' : 'Be the first to create a team and start collaborating!'}
                </p>
              </div>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8">
              {allTeams.map(team => (
                <TeamCard
                  key={team._id}
                  team={team}
                  onViewDetails={handleViewTeamDetails}
                />
              ))}
            </div>
          )}
        </div>

        {/* Team Details Modal */}
        {selectedTeam && (
          <TeamDetailsModal
            team={selectedTeam}
            currentUserId={currentUser?._id}
            onClose={handleCloseModal}
          />
        )}

        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          onClose={closeConfirmModal}
          onConfirm={handleConfirmAction}
          title={
            confirmModal.type === 'leave' ? 'Leave Team' : 
            confirmModal.type === 'delete' ? 'Delete Team' : 
            'Remove Member'
          }
          message={
            confirmModal.type === 'leave' 
              ? 'Are you sure you want to leave this team? You will no longer have access to team resources and activities.'
              : confirmModal.type === 'delete'
              ? 'Are you sure you want to delete this team? This action cannot be undone and will remove all team members from the team.'
              : 'Are you sure you want to remove this member from the team?'
          }
          confirmText={
            confirmModal.type === 'leave' ? 'Leave Team' : 
            confirmModal.type === 'delete' ? 'Delete Team' : 
            'Remove Member'
          }
          isDestructive={confirmModal.type === 'delete' || confirmModal.type === 'removeMember'}
        />
        <AddMemberModal
          isOpen={showAddMemberModal}
          onClose={() => setShowAddMemberModal(false)}
          availableFaculty={availableFaculty}
          onAddMember={handleAddMember}
          loading={actionLoading}
        />
      </div>
    </div>
  );
};

export default TeamsPage;