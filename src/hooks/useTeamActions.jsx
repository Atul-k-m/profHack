import { useState } from 'react'
import {
  createTeam,
  joinTeamRequest,
  getTeamDetails,
  inviteUserToTeam,
  acceptInvitation,
  declineInvitation,
} from '../services/api.js'

export const useTeamActions = (showToast, showConfirmation, hideConfirmation) => {
  const [actionLoading, setActionLoading] = useState(false)

  // Helper function to format department constraint errors
  const formatDepartmentError = (error) => {
    if (error.violations && Array.isArray(error.violations)) {
      return {
        title: 'Department Constraints Violated',
        message: error.violations.join('\n\n'),
        details: error
      }
    }
    return {
      title: 'Department Error',
      message: error.message || 'Department constraints not met',
      details: error
    }
  }

  // Helper function to show department constraint details
  const showDepartmentDetails = (error) => {
    const formatted = formatDepartmentError(error)
    let detailMessage = formatted.message

    if (error.currentTeamComposition) {
      detailMessage += `\n\nCurrent Team Composition:\n`
      detailMessage += `• Core Departments: ${error.currentTeamComposition.core || 0}\n`
      detailMessage += `• Engineering Departments: ${error.currentTeamComposition.engineering || 0}\n`
      detailMessage += `• CSE Departments: ${error.currentTeamComposition.cse || 0}`
    }

    if (error.yourDepartment || error.userDepartment) {
      detailMessage += `\n\nYour Department: ${error.yourDepartment || error.userDepartment}`
      detailMessage += ` (${error.yourCategory || error.userCategory} category)`
    }

    return detailMessage
  }

  const handleCreateTeam = async (
    newTeam, 
    setShowCreateForm, 
    setNewTeam, 
    fetchAllData, 
    setError,
    // Remove default parameters and handle them properly
    customToast = null,
    customConfirmation = null
  ) => {
    // Use passed functions or fallback to hook functions
    const toastFn = customToast || showToast
    const confirmationFn = customConfirmation || showConfirmation

    if (!newTeam.name || !newTeam.description) {
      if (typeof toastFn === 'function') {
        toastFn('Team name and description are required', 'error')
      }
      return
    }

    // Validate required functions
    if (typeof confirmationFn !== 'function') {
      console.error('showConfirmation function is required')
      if (typeof toastFn === 'function') {
        toastFn('Configuration error: showConfirmation function missing', 'error')
      }
      return
    }

    if (typeof toastFn !== 'function') {
      console.error('showToast function is required')
      return
    }

    confirmationFn({
      title: 'Create Team',
      message: `Are you sure you want to create the team "${newTeam.name}"?\n\nNote: You'll need to invite members from different departments to make your team eligible for competitions.`,
      confirmText: 'Create Team',
      onConfirm: async () => {
        if (typeof hideConfirmation === 'function') {
          hideConfirmation()
        }
        setActionLoading(true)
        
        try {
          // Fix skills processing - ensure it's a string
          let processedSkills = ''
          if (newTeam.skills) {
            if (Array.isArray(newTeam.skills)) {
              processedSkills = newTeam.skills
                .map(skill => skill.trim())
                .filter(skill => skill !== '')
                .join(', ')
            } else if (typeof newTeam.skills === 'string') {
              processedSkills = newTeam.skills
                .split(',')
                .map(skill => skill.trim())
                .filter(skill => skill !== '')
                .join(', ')
            }
          }

          const teamData = {
            name: newTeam.name.trim(),
            description: newTeam.description.trim(),
            maxMembers: parseInt(newTeam.maxMembers) || 5,
            skills: processedSkills,
            isPrivate: Boolean(newTeam.isPrivate),
          }

          console.log('Sending team data:', teamData) // Debug log

          const response = await createTeam(teamData)
          
          if (typeof setShowCreateForm === 'function') {
            setShowCreateForm(false)
          }
          
          if (typeof setNewTeam === 'function') {
            setNewTeam({
              name: '',
              description: '',
              maxMembers: 5,
              skills: '',
              isPrivate: false,
            })
          }
          
          if (typeof fetchAllData === 'function') {
            await fetchAllData()
          }
          
          toastFn('Team created successfully! 🎉', 'success')
          
          // Show additional note if provided
          if (response.note) {
            setTimeout(() => {
              toastFn(response.note, 'info')
            }, 2000)
          }
          
          if (typeof setError === 'function') {
            setError(null)
          }
        } catch (err) {
          console.error('Failed to create team:', err)
          
          if (err.department) {
            toastFn(`Your department (${err.department}) is not eligible for team formation`, 'error')
          } else {
            toastFn(err.message || 'Failed to create team', 'error')
          }
        } finally {
          setActionLoading(false)
        }
      },
      onCancel: () => {
        if (typeof hideConfirmation === 'function') {
          hideConfirmation()
        }
      }
    })
  }

  const handleJoinRequest = async (team, myTeam, setError) => {
    if (myTeam) {
      if (typeof showToast === 'function') {
        showToast('You are already in a team', 'error')
      }
      return
    }

    if (typeof showConfirmation !== 'function') {
      console.error('showConfirmation function is required')
      return
    }

    showConfirmation({
      title: 'Request to Join Team',
      message: `Send a join request to "${team.name}"? The team leader will review your request.`,
      confirmText: 'Send Request',
      onConfirm: async () => {
        if (typeof hideConfirmation === 'function') {
          hideConfirmation()
        }
        setActionLoading(true)
        
        try {
          const message = `Hi, I would like to join ${team.name}. I believe my skills would be a great fit for your team.`
          const response = await joinTeamRequest(team._id, message)
          
          if (typeof showToast === 'function') {
            showToast('Join request sent successfully! 📤', 'success')
          }
          
          // Show warnings if any
          if (response.warnings && response.warnings.length > 0) {
            setTimeout(() => {
              if (typeof showToast === 'function') {
                showToast(`Note: ${response.warnings.join('. ')}`, 'warning')
              }
            }, 2000)
          }
          
          if (typeof setError === 'function') {
            setError(null)
          }
        } catch (err) {
          console.error('Failed to send join request:', err)
          
          if (err.violations) {
            const detailMessage = showDepartmentDetails(err)
            if (typeof showConfirmation === 'function') {
              showConfirmation({
                title: 'Cannot Join Team',
                message: detailMessage,
                confirmText: 'Understand',
                showCancel: false,
                onConfirm: () => {
                  if (typeof hideConfirmation === 'function') {
                    hideConfirmation()
                  }
                }
              })
            }
          } else if (err.department) {
            if (typeof showToast === 'function') {
              showToast(`Your department (${err.department}) is not eligible for team participation`, 'error')
            }
          } else {
            if (typeof showToast === 'function') {
              showToast(err.message || 'Failed to send join request', 'error')
            }
          }
        } finally {
          setActionLoading(false)
        }
      },
      onCancel: () => {
        if (typeof hideConfirmation === 'function') {
          hideConfirmation()
        }
      }
    })
  }

  const handleViewDetails = async (team, setSelectedTeam, setShowTeamDetails) => {
    setActionLoading(true)
    try {
      const teamDetails = await getTeamDetails(team._id)
      if (typeof setSelectedTeam === 'function') {
        setSelectedTeam(teamDetails)
      }
      if (typeof setShowTeamDetails === 'function') {
        setShowTeamDetails(true)
      }
    } catch (err) {
      console.error('Failed to fetch team details:', err)
      if (typeof showToast === 'function') {
        showToast(err.message || 'Failed to load team details', 'error')
      }
    } finally {
      setActionLoading(false)
    }
  }

  const handleInviteUser = async (user, myTeam, setError) => {
    if (!myTeam) {
      if (typeof showToast === 'function') {
        showToast('You must be in a team to invite users', 'error')
      }
      return
    }

    if (typeof showConfirmation !== 'function') {
      console.error('showConfirmation function is required')
      return
    }

    showConfirmation({
      title: 'Invite User',
      message: `Invite ${user.name} to join your team "${myTeam.name}"?\n\nUser Department: ${user.department}`,
      confirmText: 'Send Invitation',
      onConfirm: async () => {
        if (typeof hideConfirmation === 'function') {
          hideConfirmation()
        }
        setActionLoading(true)
        
        try {
          const message = `You are invited to join ${myTeam.name}. We think your skills would be a great addition to our team!`
          const response = await inviteUserToTeam(myTeam._id, user._id, message)
          
          if (typeof showToast === 'function') {
            showToast(`Invitation sent to ${user.name}! 📧`, 'success')
          }
          
          // Show warnings if any
          if (response.warnings && response.warnings.length > 0) {
            setTimeout(() => {
              if (typeof showToast === 'function') {
                showToast(`Note: ${response.warnings.join('. ')}`, 'warning')
              }
            }, 2000)
          }
          
          if (typeof setError === 'function') {
            setError(null)
          }
        } catch (err) {
          console.error('Failed to send invitation:', err)
          
          if (err.violations) {
            const detailMessage = showDepartmentDetails(err)
            if (typeof showConfirmation === 'function') {
              showConfirmation({
                title: 'Cannot Invite User',
                message: detailMessage,
                confirmText: 'Understand',
                showCancel: false,
                onConfirm: () => {
                  if (typeof hideConfirmation === 'function') {
                    hideConfirmation()
                  }
                }
              })
            }
          } else if (err.department) {
            if (typeof showToast === 'function') {
              showToast(`User's department (${err.department}) is not eligible for team participation`, 'error')
            }
          } else {
            if (typeof showToast === 'function') {
              showToast(err.message || 'Failed to send invitation', 'error')
            }
          }
        } finally {
          setActionLoading(false)
        }
      },
      onCancel: () => {
        if (typeof hideConfirmation === 'function') {
          hideConfirmation()
        }
      }
    })
  }

  const handleAcceptInvitation = async (invitation, setInvitations, fetchAllData, setError) => {
    if (actionLoading) return
    
    if (typeof showConfirmation !== 'function') {
      console.error('showConfirmation function is required')
      return
    }
    
    showConfirmation({
      title: 'Accept Invitation',
      message: `Accept invitation to join "${invitation.team?.name || 'this team'}"? This will make you a member of the team.`,
      confirmText: 'Accept',
      confirmVariant: 'primary',
      onConfirm: async () => {
        if (typeof hideConfirmation === 'function') {
          hideConfirmation()
        }
        setActionLoading(true)
        
        try {
          await acceptInvitation(invitation._id)
          if (typeof setInvitations === 'function') {
            setInvitations(prev => prev.filter(inv => inv._id !== invitation._id))
          }
          if (typeof fetchAllData === 'function') {
            await fetchAllData()
          }
          if (typeof showToast === 'function') {
            showToast('Invitation accepted! Welcome to the team! 🎉', 'success')
          }
          if (typeof setError === 'function') {
            setError(null)
          }
        } catch (err) {
          console.error('Failed to accept invitation:', err)
          
          if (err.violations) {
            const detailMessage = showDepartmentDetails(err)
            if (typeof showConfirmation === 'function') {
              showConfirmation({
                title: 'Cannot Accept Invitation',
                message: detailMessage,
                confirmText: 'Understand',
                showCancel: false,
                onConfirm: () => {
                  if (typeof hideConfirmation === 'function') {
                    hideConfirmation()
                  }
                }
              })
            }
          } else if (err.department) {
            if (typeof showToast === 'function') {
              showToast(`Your department (${err.department}) is not eligible for team participation`, 'error')
            }
          } else {
            if (typeof showToast === 'function') {
              showToast(err.message || 'Failed to accept invitation', 'error')
            }
          }
        } finally {
          setActionLoading(false)
        }
      },
      onCancel: () => {
        if (typeof hideConfirmation === 'function') {
          hideConfirmation()
        }
      }
    })
  }

  const handleDeclineInvitation = async (invitation, setInvitations, setError) => {
    if (actionLoading) return
    
    if (typeof showConfirmation !== 'function') {
      console.error('showConfirmation function is required')
      return
    }
    
    showConfirmation({
      title: 'Decline Invitation',
      message: `Decline invitation to join "${invitation.team?.name || 'this team'}"? This action cannot be undone.`,
      confirmText: 'Decline',
      confirmVariant: 'secondary',
      onConfirm: async () => {
        if (typeof hideConfirmation === 'function') {
          hideConfirmation()
        }
        setActionLoading(true)
        
        try {
          await declineInvitation(invitation._id)
          if (typeof setInvitations === 'function') {
            setInvitations(prev => prev.filter(inv => inv._id !== invitation._id))
          }
          if (typeof showToast === 'function') {
            showToast('Invitation declined', 'info')
          }
          if (typeof setError === 'function') {
            setError(null)
          }
        } catch (err) {
          console.error('Failed to decline invitation:', err)
          if (typeof showToast === 'function') {
            showToast(err.message || 'Failed to decline invitation', 'error')
          }
        } finally {
          setActionLoading(false)
        }
      },
      onCancel: () => {
        if (typeof hideConfirmation === 'function') {
          hideConfirmation()
        }
      }
    })
  }

  return {
    actionLoading,
    handleCreateTeam,
    handleJoinRequest,
    handleViewDetails,
    handleInviteUser,
    handleAcceptInvitation,
    handleDeclineInvitation,
  }
}