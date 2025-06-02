import React, { useState, useEffect } from 'react'
import { Users, Plus, Bell, ChevronLeft, Check, X, AlertCircle, Send, UserPlus } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import TeamCard from '../components/TeamCard'
import UserCard from '../components/UserCard'
import CreateTeamForm from './CreateTeamForm'
import TeamFormation from './TeamFormation'
import TeamMembers from './TeamMembers'
import Invitations from './Invitations'
import TeamDetailsModal from '../components/TeamDetailsModal'
import {
  getAllTeams,
  getAvailableUsers,
  getProfile,
  createTeam,
  joinTeamRequest,
  getTeamDetails,
  inviteUserToTeam,
  getUserInvitations,
  acceptInvitation,
  declineInvitation,
} from '../services/api.js'

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

const Teams = ({ setCurrentPage, userProfile }) => {
  const [activeTab, setActiveTab] = useState('browse')
  const [teams, setTeams] = useState([])
  const [availableUsers, setAvailableUsers] = useState([])
  const [myTeam, setMyTeam] = useState(null)
  const [invitations, setInvitations] = useState([])
  const [loading, setLoading] = useState(true)
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
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [showTeamDetails, setShowTeamDetails] = useState(false)

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

  useEffect(() => {
    fetchAllData()
  }, [userProfile])

  const fetchAllData = async () => {
    setLoading(true)
    setError(null)

    try {
      const profilePromise = userProfile ? Promise.resolve(userProfile) : getProfile()
      const [teamsData, availableUsersData, profileData] = await Promise.all([
        getAllTeams(),
        getAvailableUsers(),
        profilePromise,
      ])

      setTeams(teamsData)
      setAvailableUsers(availableUsersData)

      const userTeam = teamsData.find((team) =>
        team.members.some((member) => member._id === profileData._id),
      )
      setMyTeam(userTeam || null)

      if (profileData?._id) {
        try {
          const invitationsData = await getUserInvitations(profileData._id)
          setInvitations(invitationsData)
        } catch (inviteError) {
          console.error('Failed to fetch invitations:', inviteError)
        }
      }
    } catch (err) {
      console.error('Failed to fetch data:', err)
      setError(err.message || 'Failed to load team data')
      showToast('Failed to load team data', 'error')
    } finally {
      setLoading(false)
    }
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
          const teamData = {
            ...newTeam,
            skills: newTeam.skills
              .split(',')
              .map((skill) => skill.trim())
              .filter((skill) => skill !== ''),
          }

          await createTeam(teamData)
          setShowCreateForm(false)
          setNewTeam({
            name: '',
            description: '',
            maxMembers: 5,
            skills: '',
            isPrivate: false,
          })
          
          await fetchAllData()
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

  const handleJoinRequest = async (team) => {
    if (myTeam) {
      showToast('You are already in a team', 'error')
      return
    }

    showConfirmation({
      title: 'Request to Join Team',
      message: `Send a join request to "${team.name}"? The team leader will review your request.`,
      confirmText: 'Send Request',
      onConfirm: async () => {
        hideConfirmation()
        setActionLoading(true)
        
        try {
          const message = `Hi, I would like to join ${team.name}. I believe my skills would be a great fit for your team.`
          await joinTeamRequest(team._id, message)
          showToast('Join request sent successfully! 📤', 'success')
          setError(null)
        } catch (err) {
          console.error('Failed to send join request:', err)
          showToast(err.message || 'Failed to send join request', 'error')
        } finally {
          setActionLoading(false)
        }
      },
      onCancel: hideConfirmation
    })
  }

  const handleViewDetails = async (team) => {
    setActionLoading(true)
    try {
      const teamDetails = await getTeamDetails(team._id)
      setSelectedTeam(teamDetails)
      setShowTeamDetails(true)
    } catch (err) {
      console.error('Failed to fetch team details:', err)
      showToast(err.message || 'Failed to load team details', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  const handleInviteUser = async (user) => {
    if (!myTeam) {
      showToast('You must be in a team to invite users', 'error')
      return
    }

    showConfirmation({
      title: 'Invite User',
      message: `Invite ${user.name} to join your team "${myTeam.name}"?`,
      confirmText: 'Send Invitation',
      onConfirm: async () => {
        hideConfirmation()
        setActionLoading(true)
        
        try {
          const message = `You are invited to join ${myTeam.name}. We think your skills would be a great addition to our team!`
          await inviteUserToTeam(myTeam._id, user._id, message)
          showToast(`Invitation sent to ${user.name}! 📧`, 'success')
          setError(null)
        } catch (err) {
          console.error('Failed to send invitation:', err)
          showToast(err.message || 'Failed to send invitation', 'error')
        } finally {
          setActionLoading(false)
        }
      },
      onCancel: hideConfirmation
    })
  }

  const handleAcceptInvitation = async (invitation) => {
    showConfirmation({
      title: 'Accept Invitation',
      message: `Accept invitation to join "${invitation.team?.name || 'this team'}"? This will make you a member of the team.`,
      confirmText: 'Accept',
      confirmVariant: 'primary',
      onConfirm: async () => {
        hideConfirmation()
        setActionLoading(true)
        
        try {
          await acceptInvitation(invitation._id)
          await fetchAllData()
          showToast('Invitation accepted! Welcome to the team! 🎉', 'success')
          setError(null)
        } catch (err) {
          console.error('Failed to accept invitation:', err)
          showToast(err.message || 'Failed to accept invitation', 'error')
        } finally {
          setActionLoading(false)
        }
      },
      onCancel: hideConfirmation
    })
  }

  const handleDeclineInvitation = async (invitation) => {
    showConfirmation({
      title: 'Decline Invitation',
      message: `Decline invitation to join "${invitation.team?.name || 'this team'}"? This action cannot be undone.`,
      confirmText: 'Decline',
      confirmVariant: 'secondary',
      onConfirm: async () => {
        hideConfirmation()
        setActionLoading(true)
        
        try {
          await declineInvitation(invitation._id)
          setInvitations((prev) => prev.filter((inv) => inv._id !== invitation._id))
          showToast('Invitation declined', 'info')
          setError(null)
        } catch (err) {
          console.error('Failed to decline invitation:', err)
          showToast(err.message || 'Failed to decline invitation', 'error')
        } finally {
          setActionLoading(false)
        }
      },
      onCancel: hideConfirmation
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-1/2 sm:w-1/3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-36 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
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

        {invitations.length > 0 && (
          <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-500 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center text-blue-800">
                <div className="relative">
                  <Bell size={18} className="mr-2" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {invitations.length}
                  </span>
                </div>
                <span className="text-sm font-bold">
                  You have {invitations.length} team invitation{invitations.length > 1 ? 's' : ''}
                </span>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setActiveTab('invitations')}
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                View Invitations
              </Button>
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
                {tab.id === 'invitations' && invitations.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">
                    {invitations.length}
                  </span>
                )}
              </button>
            ))}
          </div>
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

        {activeTab === 'browse' && (
          <TeamFormation
            teams={teams}
            myTeam={myTeam}
            onViewDetails={handleViewDetails}
            onJoinRequest={handleJoinRequest}
          />
        )}

        {activeTab === 'members' && (
          <TeamMembers
            availableUsers={availableUsers}
            myTeam={myTeam}
            onInvite={handleInviteUser}
            onShowCreateForm={() => setShowCreateForm(true)}
            loading={actionLoading}
          />
        )}

        {activeTab === 'invitations' && (
          <Invitations
            invitations={invitations}
            onAccept={handleAcceptInvitation}
            onDecline={handleDeclineInvitation}
            onViewTeam={handleViewDetails}
            setShowTeamDetails={setShowTeamDetails}
            setSelectedTeam={setSelectedTeam}
            loading={actionLoading}
          />
        )}

        {showTeamDetails && (
          <TeamDetailsModal 
            team={selectedTeam}          
            onClose={() => { 
              setShowTeamDetails(false)
              setSelectedTeam(null)
            }}
          />
        )}

        {myTeam && (
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
                    onClick={() => handleViewDetails(myTeam)}
                    className="shadow-md hover:shadow-lg transition-shadow"
                  >
                    View Details
                  </Button>
                  {myTeam.leader._id === userProfile?._id && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setActiveTab('members')}
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
        )}
      </div>

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