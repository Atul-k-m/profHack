import React from 'react'
import { X } from 'lucide-react'
import Card from './Card'
import Button from './Button'

const TeamDetailsModal = ({ team, onClose }) => {
  if (!team) return null

    

  return (
   <div className="fixed inset-0 z-50 bg-white bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md mx-auto border-2 border-black shadow-lg overflow-hidden">
        
        <div className="flex justify-between items-center px-6 py-4 border-b-2 border-black">
          <h2 className="text-xl font-bold uppercase tracking-wider">{team.name}</h2>
          <button onClick={onClose} className="text-black hover:bg-gray-100 p-1">
            <X size={24} />
          </button>
        </div>

      
        <div className="p-6 space-y-6">
          <p className="text-gray-700 leading-relaxed">{team.description}</p>
          
          <div className="space-y-4">
            <div className="text-sm text-gray-600 uppercase tracking-wide font-bold">
              MEMBERS ({team.members.length}/{team.maxMembers})
            </div>
            <div className="space-y-3">
              {team.members.map((member) => (
                <div key={member._id} className="flex items-center space-x-3 p-3 border border-gray-300">
                  <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold text-lg">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.designation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-gray-600 uppercase tracking-wide font-bold">
              SKILLS
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(team.skills) && team.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-900 text-white text-sm font-semibold uppercase tracking-wide"
                >
                  {skill}
                </span>
              ))}

              {!Array.isArray(team.skills) && (
                <span className="text-sm text-gray-500 italic">
                  No skills available
                </span>
              )}
            </div>
          </div>
        </div>


        <div className="px-6 py-4 border-t-2 border-black flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-white border-2 border-black font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeamDetailsModal
