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

// Use props from parent instead of managing its own API calls
const Invitations = ({ 
  invitations = [], 
  onAccept, 
  onDecline, 
  onViewTeam, 
  loading = false,
  onRefresh 
}) => {
  const [processingInvitation, setProcessingInvitation] = useState(null);

  const handleAccept = async (invitation) => {
    if (processingInvitation === invitation._id) return; // Prevent double clicks
    
    setProcessingInvitation(invitation._id);
    try {
      await onAccept(invitation);
    } catch (error) {
      console.error('Error accepting invitation:', error);
    } finally {
      setProcessingInvitation(null);
    }
  };

  const handleDecline = async (invitation) => {
    if (processingInvitation === invitation._id) return; 
    
    setProcessingInvitation(invitation._id);
    try {
      await onDecline(invitation);
    } catch (error) {
      console.error('Error declining invitation:', error);
    } finally {
      setProcessingInvitation(null);
    }
  };

  const handleViewTeam = async (invitation) => {
    if (processingInvitation === invitation._id) return; // Prevent double clicks
    
    setProcessingInvitation(invitation._id);
    try {
      await onViewTeam(invitation);
    } catch (error) {
      console.error('Error viewing team:', error);
    } finally {
      setProcessingInvitation(null);
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

  return (
    <div className="space-y-6">
      {invitations.map(invitation => (
        <Card key={invitation._id} className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Mail size={18} className="text-blue-600" />
                <h3 className="text-lg font-black tracking-tight text-black uppercase">
                  Team Invitation
                </h3>
                <span className={`px-2 py-1 text-white text-xs font-bold tracking-wide uppercase ${
                  invitation.status === 'accepted' ? 'bg-green-500' :
                  invitation.status === 'declined' ? 'bg-red-500' :
                  'bg-yellow-500'
                }`}>
                  {invitation.status || 'Pending'}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-bold">From:</span> {invitation.from?.name} (@{invitation.from?.username})
                </p>
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-bold">Team:</span> {invitation.team?.name || 'Unknown Team'}
                </p>
                <p className="text-sm text-gray-600">
                  {invitation.team?.description || 'Join our team!'}
                </p>
                <p className="text-xs text-gray-500">
                  <Clock size={12} className="inline mr-1" />
                  {new Date(invitation.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {invitation.status === 'pending' && (
            <div className="flex gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleAccept(invitation)}
                disabled={processingInvitation === invitation._id}
              >
                <Check size={14} className="inline mr-1" />
                {processingInvitation === invitation._id ? 'Processing...' : 'Accept'}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleDecline(invitation)}
                disabled={processingInvitation === invitation._id}
              >
                <X size={14} className="inline mr-1" />
                {processingInvitation === invitation._id ? 'Processing...' : 'Decline'}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleViewTeam(invitation)}
                disabled={processingInvitation === invitation._id}
              >
                <Eye size={14} className="inline mr-1" />
                View Team
              </Button>
            </div>
          )}

          {invitation.status !== 'pending' && (
            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleViewTeam(invitation)}
                disabled={processingInvitation === invitation._id}
              >
                <Eye size={14} className="inline mr-1" />
                View Team
              </Button>
            </div>
          )}
        </Card>
      ))}

      {invitations.length === 0 && (
        <Card className="p-8 text-center">
          <Bell size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-black tracking-tight text-black uppercase mb-2">
            No Invitations
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            You don't have any team invitations
          </p>
        </Card>
      )}
    </div>
  );
};

export default Invitations;