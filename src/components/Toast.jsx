import React from 'react'
import { Check, X, AlertCircle } from 'lucide-react'

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

export default Toast