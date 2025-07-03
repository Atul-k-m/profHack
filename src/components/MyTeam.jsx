import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, Trash2, Lightbulb, Crown } from 'lucide-react';

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

const MemberBadge = ({ member, isCurrentUser, isLeader, onRemove, canRemove }) => (
  <div className={`group flex items-center gap-3 p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
    isCurrentUser 
      ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-500 shadow-md' 
      : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
  }`}>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-black transition-all duration-200 group-hover:scale-110 ${
      isLeader 
        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg' 
        : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
    }`}>
      {isLeader ? <Crown size={18} /> : member.name.charAt(0)}
    </div>
    <div className="flex-1 min-w-0">
      <p className={`text-base font-bold truncate ${isCurrentUser ? 'text-blue-800' : 'text-gray-800'}`}>
        {member.name} {isCurrentUser && '(You)'}
      </p>
      <p className="text-sm text-gray-600 truncate font-medium mt-1">{member.department}</p>
    </div>
    {isLeader && (
      <div className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-black uppercase rounded-full border border-yellow-300">
        Leader
      </div>
    )}
    {canRemove && !isLeader && (
      <button
        onClick={() => onRemove(member._id)}
        className="p-2 hover:bg-red-100 rounded-full transition-all duration-200 hover:scale-110 text-red-600"
        title="Remove Member"
      >
        <Trash2 size={16} />
      </button>
    )}
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
  onRemoveMember
}) => {
  const navigate = useNavigate();

  if (!userTeam) return null;

  const handleIdeaSubmission = () => {
    navigate('/idea-submission');
  };

  return (
    <div className="mb-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase flex items-center gap-4 mb-6">
          <div className="w-2 h-8 sm:h-10 bg-blue-500"></div>
          Your Team
        </h2>
        
        {/* Action Buttons - Better Mobile Layout */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Idea Submission Button - Primary Action */}
          <button
            onClick={handleIdeaSubmission}
            className="group flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 border-2 border-purple-600 font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:scale-105 shadow-lg rounded-lg"
          >
            <Lightbulb size={16} className="group-hover:scale-110 transition-transform duration-200" />
            Submit Team Idea
          </button>
          
          {/* Team Management Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {isTeamLeader && userTeam.members.length < 4 && (
              <button
                onClick={onAddMember}
                disabled={actionLoading}
                className="group flex items-center justify-center gap-3 px-6 py-4 bg-green-600 text-white hover:bg-green-700 border-2 border-green-600 font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
              >
                <Plus size={16} className="group-hover:scale-110 transition-transform duration-200" />
                Add Member
              </button>
            )}
            
            {isTeamMember && !isTeamLeader && (
              <button
                onClick={onLeaveTeam}
                disabled={actionLoading}
                className="group flex items-center justify-center gap-3 px-6 py-4 bg-yellow-600 text-white hover:bg-yellow-700 border-2 border-yellow-600 font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
              >
                <LogOut size={16} className="group-hover:scale-110 transition-transform duration-200" />
                Leave Team
              </button>
            )}
            
            {isTeamLeader && (
              <button
                onClick={onDeleteTeam}
                disabled={actionLoading}
                className="group flex items-center justify-center gap-3 px-6 py-4 bg-red-600 text-white hover:bg-red-700 border-2 border-red-600 font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
              >
                <Trash2 size={16} className="group-hover:scale-110 transition-transform duration-200" />
                Delete Team
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Team Details Card */}
      <Card className="p-6 sm:p-10 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-500 rounded-2xl">
        <div className="mb-8">
          <h3 className="text-2xl sm:text-4xl font-black text-black mb-4">{userTeam.teamName}</h3>
          <p className="text-gray-700 font-medium leading-relaxed text-base sm:text-lg max-w-3xl">
            {userTeam.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Team Leader Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-gray-600 uppercase tracking-wider mb-4">
              Team Leader
            </h4>
            <MemberBadge 
              member={userTeam.leader} 
              isCurrentUser={userTeam.leader._id === currentUser?._id}
              isLeader={true}
            />
          </div>

          {/* Team Members Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-gray-600 uppercase tracking-wider mb-4">
              Team Members ({userTeam.members.length}/4)
            </h4>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {userTeam.members.map(member => (
                <MemberBadge 
                  key={member._id}
                  member={member} 
                  isCurrentUser={member._id === currentUser?._id}
                  isLeader={false}
                  canRemove={isTeamLeader}
                  onRemove={onRemoveMember}
                />
              ))}
              
              {/* Empty slots indicator */}
              {userTeam.members.length < 4 && (
                <div className="space-y-3">
                  {Array.from({ length: 4 - userTeam.members.length }).map((_, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <Plus size={16} className="text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-400">Open Position</p>
                        <p className="text-xs text-gray-400">Waiting for team member</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MyTeamSection;