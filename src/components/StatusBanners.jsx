import React from 'react'
import { AlertCircle, X, Bell } from 'lucide-react'
import Card from './Card'
import Button from './Button'

const StatusBanners = ({ 
  error, 
  onCloseError, 
  actionLoading, 
  invitations, 
  onViewInvitations 
}) => (
  <>
    {error && (
      <Card className="p-4 mb-6 bg-red-50 border-2 border-red-500 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-red-800">
            <AlertCircle size={18} className="mr-2" />
            <span className="text-sm font-medium">{error}</span>
          </div>
          <button
            onClick={onCloseError}
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
            onClick={onViewInvitations}
            className="shadow-md hover:shadow-lg transition-shadow"
          >
            View Invitations
          </Button>
        </div>
      </Card>
    )}
  </>
)

export default StatusBanners