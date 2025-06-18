import { useState, useEffect } from 'react'
import {
  getAllTeams,
  getAvailableUsers,
  getProfile,
  getUserInvitations,
} from '../services/api.js'

export const useTeamData = (userProfile, showToast) => {
  const [teams, setTeams] = useState([])
  const [availableUsers, setAvailableUsers] = useState([])
  const [myTeam, setMyTeam] = useState(null)
  const [invitations, setInvitations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  useEffect(() => {
    fetchAllData()
  }, [userProfile])

  return {
    teams,
    availableUsers,
    myTeam,
    invitations,
    loading,
    error,
    setError,
    setInvitations,
    fetchAllData,
  }
}