import React from 'react'
import { ChevronLeft, Plus } from 'lucide-react'
import Button from './Button'

const TeamsHeader = ({ 
  setCurrentPage, 
  myTeam, 
  onCreateTeam, 
  actionLoading 
}) => (
  <div className="bg-white border-b-2 border-black">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
      <div className="w-full md:w-auto">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider uppercase text-gray-600 hover:text-black mb-2 transition-colors"
        >
          <ChevronLeft size={14} />
          Back to Dashboard
        </button>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-black mb-1 leading-tight">
          Team Formation
        </h1>
        <div className="w-12 sm:w-16 h-1 bg-black mb-4"></div>
        <p className="text-xs sm:text-sm text-gray-700 font-medium tracking-wide">
          {myTeam
            ? `Currently in: ${myTeam.name} (${myTeam.members.length}/${myTeam.maxMembers} members)`
            : 'Join or create a team to collaborate on projects'}
        </p>
      </div>

      {!myTeam && (
        <Button
          variant="primary"
          size="lg"
          onClick={onCreateTeam}
          disabled={actionLoading}
          className="self-start md:self-center shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus size={16} className="inline mr-1.5" />
          Create Team
        </Button>
      )}
    </div>
  </div>
)

export default TeamsHeader