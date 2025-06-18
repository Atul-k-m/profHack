import React from 'react'
import { Users, UserPlus } from 'lucide-react'
import Card from './Card'
import Button from './Button'

const MyTeamCard = ({ 
  myTeam, 
  userProfile, 
  onViewDetails, 
  onInviteMembers 
}) => (
  <div className="mt-12">
    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-black uppercase mb-4 sm:mb-6">
      My Team
    </h2>
    <Card className="p-4 sm:p-6 shadow-lg border-2 border-black">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="w-full sm:w-auto">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg sm:text-xl font-black tracking-tight text-black uppercase">
              {myTeam.name}
            </h3>
            {myTeam.leader._id === userProfile?._id && (
              <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded">
                LEADER
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-700 font-medium mb-3">
            {myTeam.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs font-bold tracking-wider uppercase text-gray-600">
            <span className="flex items-center bg-gray-100 px-2 py-1 rounded">
              <Users size={12} className="inline mr-1" />
              {myTeam.members.length}/{myTeam.maxMembers} Members
            </span>
            <span className="bg-gray-100 px-2 py-1 rounded">
              Led by {myTeam.leader.name}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewDetails(myTeam)}
            className="shadow-md hover:shadow-lg transition-shadow"
          >
            View Details
          </Button>
          {myTeam.leader._id === userProfile?._id && (
            <Button
              variant="primary"
              size="sm"
              onClick={onInviteMembers}
              className="shadow-md hover:shadow-lg transition-shadow"
            >
              <UserPlus size={14} className="mr-1" />
              Invite Members
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {myTeam.members.map((member) => (
          <div
            key={member._id}
            className="p-4 border-2 border-black bg-gradient-to-br from-gray-50 to-white flex flex-col shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-700 text-white flex items-center justify-center font-black rounded shadow-md">
                {member.name.charAt(0)}
              </div>
              <div>
                <p className="font-black text-black text-sm leading-tight flex items-center">
                  {member.name}
                  {member._id === myTeam.leader._id && (
                    <span className="ml-1 text-yellow-500 text-lg">★</span>
                  )}
                </p>
                <p className="text-xs sm:text-[11px] text-gray-600 font-medium">
                  {member.designation}
                </p>
                <p className="text-xs sm:text-[11px] text-gray-500">
                  {member.department}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {member.skills &&
                member.skills.slice(0, 2).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white border border-gray-300 text-[10px] sm:text-xs font-bold tracking-wide uppercase shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
)

export default MyTeamCard