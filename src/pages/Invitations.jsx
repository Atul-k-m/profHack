import React, { useState, useEffect } from 'react';
import { Mail, Bell, Clock, Check, X, Eye, AlertCircle } from 'lucide-react';
import Card from '../components/Card';

const Button = ({ children, variant = "primary", size = "md", onClick, disabled = false }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition-colors";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100"
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const API_BASE_URL = 'https://profhack-backend.onrender.com/api';

const getAuthToken = () => {
  return localStorage.getItem('token') || localStorage.getItem('authToken');
};

const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const config = { ...options, headers };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
        throw new Error('Authentication failed. Please login again.');
      }
      
      let errorMessage;
      try {
        const error = await response.json();
        errorMessage = error.message || `Request failed with status ${response.status}`;
      } catch (parseError) {
        errorMessage = `Request failed with status ${response.status}`;
      }
      
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};


const getUserNotifications = async (userId, params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams ? 
    `${API_BASE_URL}/notifications/${userId}?${queryParams}` : 
    `${API_BASE_URL}/notifications/${userId}`;
  return makeAuthenticatedRequest(url);
};

const markNotificationAsRead = async (notificationId) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/notifications/${notificationId}/read`, {
    method: 'PUT',
  });
};

const acceptInvitation = async (invitationId) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/user/invitations/${invitationId}/accept`, {
    method: 'POST',
  });
};

const declineInvitation = async (invitationId) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/user/invitations/${invitationId}/decline`, {
    method: 'POST',
  });
};

const getTeamDetails = async (teamId) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/teams/${teamId}`);
};


const getCurrentUserId = () => {
  const token = getAuthToken();
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId || payload.id || payload.sub;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const Invitations = ({ onViewTeam }) => {
  const [invitations, setInvitations] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingInvitation, setProcessingInvitation] = useState(null);

  const currentUserId = getCurrentUserId();

  // Load invitations from notifications
  const loadInvitations = async () => {
    if (!currentUserId) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      
      const response = await getUserNotifications(currentUserId, {
        unreadOnly: false 
      });

  
      const invitationNotifications = response.notifications.filter(
        notification => notification.type === 'invitation'
      );


      const transformedInvitations = await Promise.all(
        invitationNotifications.map(async (notification) => {
          let teamName = 'Unknown Team';
          let teamId = null;

       
          if (notification.data && notification.data.teamId) {
            teamId = notification.data.teamId;
            try {
              const teamDetails = await getTeamDetails(teamId);
              teamName = teamDetails.name;
            } catch (err) {
              console.warn('Could not fetch team details:', err);
            }
          }

          return {
            id: notification._id,
            notificationId: notification._id,
            teamId: teamId,
            teamName: teamName,
            from: notification.sender ? 
              `${notification.sender.name} (@${notification.sender.username})` : 
              'Unknown User',
            message: notification.message,
            timestamp: notification.createdAt,
            isRead: notification.isRead,
           
            invitationId: notification.data?.invitationId || notification._id
          };
        })
      );

      setInvitations(transformedInvitations);
    } catch (err) {
      console.error('Error loading invitations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvitations();
  }, [currentUserId]);

  const handleAccept = async (invitation) => {
    setProcessingInvitation(invitation.id);
    try {
      await acceptInvitation(invitation.invitationId);
      
      await markNotificationAsRead(invitation.notificationId);
      
      await loadInvitations();
      
      console.log('Invitation accepted successfully');
    } catch (err) {
      console.error('Error accepting invitation:', err);
      setError(`Failed to accept invitation: ${err.message}`);
    } finally {
      setProcessingInvitation(null);
    }
  };

  const handleDecline = async (invitation) => {
    setProcessingInvitation(invitation.id);
    try {
     
      await declineInvitation(invitation.invitationId);

      await markNotificationAsRead(invitation.notificationId);
    
      await loadInvitations();
   
      console.log('Invitation declined successfully');
    } catch (err) {
      console.error('Error declining invitation:', err);
      setError(`Failed to decline invitation: ${err.message}`);
    } finally {
      setProcessingInvitation(null);
    }
  };

  const handleViewTeam = async (invitation) => {
    if (!invitation.teamId) {
      setError('Team information not available');
      return;
    }

    try {
      const team = await getTeamDetails(invitation.teamId);
      if (onViewTeam) {
        onViewTeam(team);
      }

      if (!invitation.isRead) {
        await markNotificationAsRead(invitation.notificationId);
      
        setInvitations(prev => 
          prev.map(inv => 
            inv.id === invitation.id 
              ? { ...inv, isRead: true }
              : inv
          )
        );
      }
    } catch (err) {
      console.error('Error viewing team:', err);
      setError(`Failed to load team details: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <Card className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading invitations...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border-red-200 bg-red-50">
        <div className="flex items-center gap-2 text-red-800 mb-2">
          <AlertCircle size={20} />
          <h3 className="font-medium">Error Loading Invitations</h3>
        </div>
        <p className="text-red-700 text-sm mb-4">{error}</p>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={loadInvitations}
        >
          Try Again
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {invitations.map(invitation => (
        <Card key={invitation.id} className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Mail size={18} className="text-blue-600" />
                <h3 className="text-lg font-black tracking-tight text-black uppercase">
                  Team Invitation
                </h3>
                <span className={`px-2 py-1 text-white text-xs font-bold tracking-wide uppercase ${
                  invitation.isRead ? 'bg-gray-500' : 'bg-yellow-500'
                }`}>
                  {invitation.isRead ? 'Read' : 'Pending'}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-bold">From:</span> {invitation.from}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-bold">Team:</span> {invitation.teamName}
                </p>
                <p className="text-sm text-gray-600">
                  {invitation.message}
                </p>
                <p className="text-xs text-gray-500">
                  <Clock size={12} className="inline mr-1" />
                  {new Date(invitation.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleAccept(invitation)}
              disabled={processingInvitation === invitation.id}
            >
              <Check size={14} className="inline mr-1" />
              {processingInvitation === invitation.id ? 'Processing...' : 'Accept'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleDecline(invitation)}
              disabled={processingInvitation === invitation.id}
            >
              <X size={14} className="inline mr-1" />
              {processingInvitation === invitation.id ? 'Processing...' : 'Decline'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleViewTeam(invitation)}
            >
              <Eye size={14} className="inline mr-1" />
              View Team
            </Button>
          </div>
        </Card>
      ))}

      {invitations.length === 0 && (
        <Card className="p-8 text-center">
          <Bell size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-black tracking-tight text-black uppercase mb-2">
            No Invitations
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            You don't have any pending team invitations
          </p>
        </Card>
      )}
    </div>
  );
};

export default Invitations;