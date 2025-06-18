import React from 'react'
import { Users, UserPlus, Bell } from 'lucide-react'

const TabNavigation = ({ activeTab, setActiveTab, invitations }) => {
  const tabs = [
    { id: 'browse', label: 'Browse Teams', icon: Users },
    { id: 'members', label: 'Available Members', icon: UserPlus },
    ...(invitations.length > 0
      ? [{ id: 'invitations', label: 'Invitations', icon: Bell }]
      : []),
  ]

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex space-x-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 sm:px-4 sm:py-2 font-bold tracking-wide uppercase text-xs sm:text-sm border-2 border-black transition-all duration-200 whitespace-nowrap shadow-md hover:shadow-lg ${
              activeTab === tab.id
                ? 'bg-black text-white transform translate-y-[-2px]'
                : 'bg-white text-black hover:bg-black hover:text-white hover:transform hover:translate-y-[-2px]'
            }`}
          >
            <tab.icon size={14} className="inline mr-1" />
            {tab.label}
            {tab.id === 'invitations' && invitations.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">
                {invitations.length}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TabNavigation