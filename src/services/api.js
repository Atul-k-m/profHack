const API_BASE_URL = 'https://profhack-backend.onrender.com/api';


const getAuthToken = () => {
  const token = localStorage.getItem('token') || 
                localStorage.getItem('authToken') || 
                sessionStorage.getItem('token') || 
                sessionStorage.getItem('authToken');
  console.log('Retrieved token:', token ? 'Token exists' : 'No token found');
  return token;
};

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = getAuthToken();
  
  if (!token) {
    console.error('No authentication token found');
    throw new Error('No token provided');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  console.log('Making request to:', url);

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        // Clear invalid tokens
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('authToken');
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

// Helper function for public requests
const makePublicRequest = async (url, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
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
};

// Individual API functions (matching your current usage)
export const getAllTeams = async () => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/teams`);
};

export const createTeam = async (teamData) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/teams`, {
    method: 'POST',
    body: JSON.stringify(teamData),
  });
};

export const getTeamDetails = async (teamId) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/teams/${teamId}`);
};

export const joinTeamRequest = async (teamId, message) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/teams/${teamId}/join`, {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
};

export const inviteUserToTeam = async (teamId, userId, message) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/teams/${teamId}/invite`, {
    method: 'POST',
    body: JSON.stringify({ userId, message }),
  });
};

export const getProfile = async () => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/user/profile`);
};

export const getAvailableUsers = async () => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/user/available`);
};

export const getUserInvitations = async (userId) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/user/${userId}/invitations`);
};

export const acceptInvitation = async (invitationId) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/user/invitations/${invitationId}/accept`, {
    method: 'POST',
  });
};

export const declineInvitation = async (invitationId) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/user/invitations/${invitationId}/decline`, {
    method: 'POST',
  });
};

// Auth functions
export const login = async (credentials) => {
  return makePublicRequest(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const register = async (userData) => {
  return makePublicRequest(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const logout = async () => {
  const token = getAuthToken();
  if (token) {
    try {
      await makeAuthenticatedRequest(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
      });
    } catch (error) {
      console.warn('Logout request failed:', error);
    }
  }
  
  // Clear tokens
  localStorage.removeItem('token');
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('authToken');
};

export const verifyToken = async () => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/auth/verify`);
};

// Utility functions
export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const clearAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('authToken');
};

export const getCurrentUserId = () => {
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

// Notification functions
export const sendNotification = async (notificationData) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/notifications`, {
    method: 'POST',
    body: JSON.stringify(notificationData),
  });
};

export const getUserNotifications = async (userId, params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams ? 
    `${API_BASE_URL}/notifications/${userId}?${queryParams}` : 
    `${API_BASE_URL}/notifications/${userId}`;
  return makeAuthenticatedRequest(url);
};

export const markNotificationAsRead = async (notificationId) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/notifications/${notificationId}/read`, {
    method: 'PUT',
  });
};

export const markAllNotificationsAsRead = async (userId) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/notifications/${userId}/read-all`, {
    method: 'PUT',
  });
};