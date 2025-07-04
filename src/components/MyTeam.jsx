import React, { useState, useEffect } from 'react';
import { Plus, LogOut, Trash2, Lightbulb, Crown, Users, Target, CheckCircle, AlertCircle } from 'lucide-react';

const Card = React.memo(({ children, className = "" }) => (
  <div className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
    {children}
  </div>
));

const MemberCard = ({ member, isCurrentUser, isLeader, onRemove, canRemove, isCompact = false }) => (
  <div className={`group relative flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 ${
    isCurrentUser ? 'bg-blue-50 border border-blue-200' : 'border border-gray-100'
  }`}>
    <div className={`relative ${isCompact ? 'w-8 h-8' : 'w-10 h-10'} rounded-full flex items-center justify-center text-sm font-bold ${
      isLeader 
        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white' 
        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
    }`}>
      {isLeader ? <Crown size={isCompact ? 14 : 16} /> : member.name.charAt(0)}
    </div>
    
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <p className={`text-sm font-semibold truncate ${isCurrentUser ? 'text-blue-700' : 'text-gray-900'}`}>
          {member.name}
        </p>
        {isCurrentUser && (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
            You
          </span>
        )}
        {isLeader && (
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
            Leader
          </span>
        )}
      </div>
      <p className="text-xs text-gray-600 truncate">{member.department}</p>
    </div>
    
    {canRemove && !isLeader && (
      <button
        onClick={() => onRemove(member._id)}
        className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-100 rounded-full transition-all duration-200 text-red-500 hover:text-red-700"
        title="Remove Member"
      >
        <Trash2 size={14} />
      </button>
    )}
  </div>
);

const EmptySlot = ({ index }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-200 bg-gray-50">
    <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
      <Plus size={14} className="text-gray-400" />
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-400">Open Position</p>
      <p className="text-xs text-gray-400">Available slot</p>
    </div>
  </div>
);

const MyTeamSection = ({ 
  userTeam, 
  currentUser, 
  isTeamLeader, 
  isTeamMember, 
  actionLoading,
  onAddMember,
  onLeaveTeam,
  onDeleteTeam,
  onRemoveMember,
  onIdeaSubmission
}) => {
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loadingSubmission, setLoadingSubmission] = useState(false);

  // Backend base URL
  const BACKEND_URL = 'https://profhack-backend-npqc.onrender.com';

  // Check submission status
  useEffect(() => {
    if (userTeam) {
      checkSubmissionStatus();
    }
  }, [userTeam]);

  const checkSubmissionStatus = async () => {
    try {
      setLoadingSubmission(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await fetch(`${BACKEND_URL}/api/submissions/team/${userTeam._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSubmissionStatus(data);
      } else if (response.status === 404) {
        // No submission found - this is normal
        setSubmissionStatus(null);
      } else {
        console.error('Failed to check submission status');
      }
    } catch (error) {
      console.error('Error checking submission status:', error);
    } finally {
      setLoadingSubmission(false);
    }
  };

  const handleIdeaSubmission = () => {
    if (submissionStatus) {
      // Show confirmation dialog for re-submission
      const confirmResubmit = window.confirm(
        'Your team has already made a submission. Are you sure you want to create a new submission? This will not replace your existing submission.'
      );
      
      if (!confirmResubmit) {
        return;
      }
    }
    
    if (onIdeaSubmission) {
      onIdeaSubmission();
    }
  };

  if (!userTeam) return null;

  const allMembers = [userTeam.leader, ...userTeam.members];
  const totalMembers = allMembers.length;
  const emptySlots = Math.max(0, 5 - totalMembers); // Fixed: 5 total members (1 leader + 4 members)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Header with Primary CTA */}
      <div className="flex flex-col gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-4">
          <div className="w-1 h-6 sm:h-8 bg-blue-500 rounded-full"></div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Your Team</h2>
            <p className="text-gray-600 text-sm">Collaborate and innovate together</p>
          </div>
        </div>
        
        {/* Submission Status */}
        {loadingSubmission ? (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            Checking submission status...
          </div>
        ) : submissionStatus ? (
          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-green-800">Submission Complete</p>
              <p className="text-xs text-green-600 truncate">
                Track: {submissionStatus.trackId} • Submitted: {new Date(submissionStatus.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800">No Submission Yet</p>
              <p className="text-xs text-amber-600">Ready to submit your team's innovative idea?</p>
            </div>
          </div>
        )}
        
        {/* Primary CTA - Submit Idea */}
        <button
          onClick={handleIdeaSubmission}
          className="group flex items-center justify-center gap-3 px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg w-full sm:w-auto"
        >
          <Lightbulb size={18} className="group-hover:scale-110 transition-transform" />
          {submissionStatus ? 'Submit New Idea' : 'Submit Team Idea'}
        </button>
      </div>

      {/* Main Team Layout */}
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Team Info Card */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 break-words">{userTeam.teamName}</h3>
                <p className="text-gray-600 text-sm leading-relaxed break-words">
                  {userTeam.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full flex-shrink-0">
                <Users size={14} />
                {totalMembers}/5
              </div>
            </div>
          </Card>

          {/* Team Members Grid */}
          <Card className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900">Team Members</h4>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Target size={14} />
                {totalMembers} of 5 members
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allMembers.map(member => (
                <MemberCard 
                  key={member._id}
                  member={member} 
                  isCurrentUser={member._id === currentUser?._id}
                  isLeader={member._id === userTeam.leader._id}
                  canRemove={isTeamLeader && member._id !== userTeam.leader._id}
                  onRemove={onRemoveMember}
                />
              ))}
              
              {/* Empty Slots */}
              {Array.from({ length: emptySlots }).map((_, index) => (
                <EmptySlot key={`empty-${index}`} index={index} />
              ))}
            </div>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="space-y-4">
          <Card className="p-4 sm:p-6">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Team Actions</h4>
            <div className="space-y-3">
              {/* Add Member */}
              {isTeamLeader && totalMembers < 5 && (
                <button
                  onClick={onAddMember}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white hover:bg-green-700 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <Plus size={16} />
                  Add Member
                </button>
              )}
              
              {/* Leave Team */}
              {isTeamMember && !isTeamLeader && (
                <button
                  onClick={onLeaveTeam}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-600 text-white hover:bg-yellow-700 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <LogOut size={16} />
                  Leave Team
                </button>
              )}
              
              {/* Delete Team */}
              {isTeamLeader && (
                <button
                  onClick={onDeleteTeam}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white hover:bg-red-700 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <Trash2 size={16} />
                  Delete Team
                </button>
              )}
            </div>
          </Card>

          {/* Team Stats */}
          <Card className="p-4 sm:p-6">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Team Stats</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Members</span>
                <span className="font-semibold">{totalMembers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Available Slots</span>
                <span className="font-semibold">{emptySlots}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Team Leader</span>
                <span className="font-semibold text-yellow-600 truncate ml-2">{userTeam.leader.name}</span>
              </div>
              {submissionStatus && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Submission Status</span>
                  <span className="font-semibold text-green-600">✓ Complete</span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyTeamSection;