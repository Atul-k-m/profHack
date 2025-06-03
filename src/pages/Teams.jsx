import React, { useState, useEffect } from 'react'
import { Users, Plus, Bell, ChevronLeft, Check, X, AlertCircle, Send, UserPlus } from 'lucide-react'

// Mock components - replace these with your actual components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white border-2 border-black ${className}`}>
    {children}
  </div>
)

const Button = ({ children, variant = "primary", size = "md", onClick, disabled, className = "" }) => {
  const baseClasses = "font-bold border-2 border-black transition-all duration-200 disabled:opacity-50"
  const variantClasses = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white text-black hover:bg-gray-100"
  }
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  }
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  )
}

// Create Team Form Component
const CreateTeamForm = ({ newTeam, setNewTeam, onSubmit, onCancel, loading }) => (
  <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border-2 border-black p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-black uppercase">Create New Team</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-black transition-colors"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-black mb-2">Team Name *</label>
            <input
              type="text"
              value={newTeam.name}
              onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
              className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter team name"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-black mb-2">Description *</label>
            <textarea
              value={newTeam.description}
              onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
              className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black h-24"
              placeholder="Describe your team's purpose and goals"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-black mb-2">Max Members</label>
            <select
              value={newTeam.maxMembers}
              onChange={(e) => setNewTeam({ ...newTeam, maxMembers: parseInt(e.target.value) })}
              className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
              disabled={loading}
            >
              {[3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} members</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-black mb-2">Required Skills</label>
            <input
              type="text"
              value={newTeam.skills}
              onChange={(e) => setNewTeam({ ...newTeam, skills: e.target.value })}
              className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="JavaScript, React, Node.js (comma separated)"
              disabled={loading}
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPrivate"
              checked={newTeam.isPrivate}
              onChange={(e) => setNewTeam({ ...newTeam, isPrivate: e.target.checked })}
              className="mr-2"
              disabled={loading}
            />
            <label htmlFor="isPrivate" className="text-sm font-bold text-black">
              Private Team (invite only)
            </label>
          </div>
        </div>
        
        <div className="flex gap-3 justify-end mt-6">
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSubmit} disabled={loading}>
            {loading ? 'Creating...' : 'Create Team'}
          </Button>
        </div>
      </div>
    </div>
  </div>
)

// Toast Component
const Toast = ({ message, type, onClose }) => (
  <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border-2 border-black shadow-lg animate-slide-in ${
    type === 'success' ? 'bg-green-50 text-green-800' :
    type === 'error' ? 'bg-red-50 text-red-800' :
    'bg-blue-50 text-blue-800'
  }`}>
    <div className="flex items-center gap-2">
      {type === 'success' && <Check size={18} />}
      {type === 'error' && <X size={18} />}
      {type === 'info' && <AlertCircle size={18} />}
      <span className="font-medium text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 font-bold hover:opacity-70">×</button>
    </div>
  </div>
)

// Confirmation Modal
const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", confirmVariant = "primary" }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-2 border-black p-6 max-w-md w-full">
        <h3 className="text-lg font-black text-black mb-2">{title}</h3>
        <p className="text-sm text-gray-700 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant={confirmVariant} onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>
  )
}

// Main Teams Component
const Teams = () => {
  const [activeTab, setActiveTab] = useState('browse')
  const [teams, setTeams] = useState([])
  const [myTeam, setMyTeam] = useState(null)
  const [invitations, setInvitations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [confirmation, setConfirmation] = useState({ isOpen: false })

  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    maxMembers: 5,
    skills: '',
    isPrivate: false,
  })
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Mock user profile
  const userProfile = { _id: 'user123', name: 'John Doe' }

  const showToast = (message, type = 'info') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const showConfirmation = (config) => {
    setConfirmation({ isOpen: true, ...config })
  }

  const hideConfirmation = () => {
    setConfirmation({ isOpen: false })
  }

  const handleCreateTeam = async () => {
    if (!newTeam.name || !newTeam.description) {
      showToast('Team name and description are required', 'error')
      return
    }

    showConfirmation({
      title: 'Create Team',
      message: `Are you sure you want to create the team "${newTeam.name}"?`,
      confirmText: 'Create Team',
      onConfirm: async () => {
        hideConfirmation()
        setActionLoading(true)
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500))
          
          setShowCreateForm(false)
          setNewTeam({
            name: '',
            description: '',
            maxMembers: 5,
            skills: '',
            isPrivate: false,
          })
          
          showToast('Team created successfully! 🎉', 'success')
          setError(null)
        } catch (err) {
          console.error('Failed to create team:', err)
          showToast(err.message || 'Failed to create team', 'error')
        } finally {
          setActionLoading(false)
        }
      },
      onCancel: hideConfirmation
    })
  }

  const handleBackToDashboard = () => {
    showToast('Navigating back to dashboard...', 'info')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <ConfirmationModal 
        isOpen={confirmation.isOpen}
        title={confirmation.title}
        message={confirmation.message}
        onConfirm={confirmation.onConfirm}
        onCancel={confirmation.onCancel}
        confirmText={confirmation.confirmText}
        confirmVariant={confirmation.confirmVariant}
      />

      <div className="bg-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="w-full md:w-auto">
            <button
              onClick={handleBackToDashboard}
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
              onClick={() => setShowCreateForm(true)}
              disabled={actionLoading}
              className="self-start md:self-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <Plus size={16} className="inline mr-1.5" />
              Create Team
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Card className="p-4 mb-6 bg-red-50 border-2 border-red-500 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-red-800">
                <AlertCircle size={18} className="mr-2" />
                <span className="text-sm font-medium">{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800 font-bold transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </Card>
        )}

        {actionLoading && (
          <Card className="p-4 mb-6 bg-blue-50 border-2 border-blue-500 shadow-lg">
            <div className="flex items-center text-blue-800">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-800 mr-2"></div>
              <span className="text-sm font-bold">Processing your request...</span>
            </div>
          </Card>
        )}

        <div className="overflow-x-auto">
          <div className="inline-flex space-x-1 mb-6">
            {[
              { id: 'browse', label: 'Browse Teams', icon: Users },
              { id: 'members', label: 'Available Members', icon: UserPlus },
              ...(invitations.length > 0
                ? [{ id: 'invitations', label: 'Invitations', icon: Bell }]
                : []),
            ].map((tab) => (
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
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'browse' && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-black text-black mb-2">No Teams Available</h3>
            <p className="text-gray-600 mb-4">Be the first to create a team!</p>
            <Button variant="primary" onClick={() => setShowCreateForm(true)}>
              <Plus size={16} className="inline mr-1" />
              Create Team
            </Button>
          </div>
        )}

        {activeTab === 'members' && !myTeam && (
          <div className="text-center py-12">
            <UserPlus size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-black text-black mb-2">Join a Team First</h3>
            <p className="text-gray-600 mb-4">You need to be part of a team to invite members</p>
            <Button variant="primary" onClick={() => setShowCreateForm(true)}>
              <Plus size={16} className="inline mr-1" />
              Create Team
            </Button>
          </div>
        )}
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <CreateTeamForm
            newTeam={newTeam}
            setNewTeam={setNewTeam}
            onSubmit={handleCreateTeam}
            onCancel={() => setShowCreateForm(false)}
            loading={actionLoading}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Teams