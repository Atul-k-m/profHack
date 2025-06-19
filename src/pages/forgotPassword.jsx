import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Send, Check, AlertCircle } from 'lucide-react';

const Button = ({ children, onClick, className, type, disabled, ...props }) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={className}
    {...props}
  >
    {children}
  </button>
);

const FormInput = ({ label, error, type, ...props }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-medium text-black tracking-wide">
      {label}
    </label>
    <input
      type={type}
      className={`w-full px-3 py-2 border border-black rounded-none text-black placeholder-gray-500
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
        text-xs shadow-sm font-medium tracking-wide
        ${error ? 'border-red-600 focus:ring-red-600' : 'border-black hover:border-gray-800'}`}
      {...props}
    />
    {error && (
      <p className="text-xs text-red-600 flex items-center gap-1 font-medium">
        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
        {error}
      </p>
    )}
  </div>
);

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://rebootbackend.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || 'Failed to send reset email');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden">
        <div className="fixed inset-0 opacity-20 pointer-events-none">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, black 1px, transparent 1px),
                linear-gradient(to bottom, black 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-3 py-4">
          <div className="w-full max-w-md border-2 border-black bg-white p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-sm">
            
            {/* Success Icon */}
            <div className="mb-6 text-center">
              <div className="w-14 h-14 bg-green-600 mx-auto mb-4 flex items-center justify-center">
                <Check className="text-white" size={24} />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-black mb-3 leading-none">
                Check Your Email
              </h1>
              <div className="w-16 h-0.5 bg-black mx-auto mb-3"></div>
              <p className="text-xs text-gray-700 font-medium tracking-wide max-w-xs mx-auto leading-relaxed">
                If an account with that email exists, we've sent you a password reset link.
              </p>
            </div>

            {/* Email Display */}
            <div className="mb-6 p-3 border border-gray-300 bg-gray-50 text-center">
              <p className="text-xs text-gray-600 font-medium">Email sent to:</p>
              <p className="text-sm text-black font-bold break-all">{email}</p>
            </div>

            {/* Instructions */}
            <div className="mb-6 space-y-2">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
                <p className="text-xs text-gray-700">Check your email inbox and spam folder</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
                <p className="text-xs text-gray-700">Click the reset link within 1 hour</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
                <p className="text-xs text-gray-700">Follow the instructions to set a new password</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={() => setSuccess(false)}
                className="w-full border-2 border-black text-black font-bold tracking-wide bg-white hover:bg-black hover:text-white px-6 py-3 rounded-none uppercase text-xs transition-all duration-300 transform hover:scale-105"
              >
                Send Another Email
              </Button>
              
              <Button
                onClick={() => navigate('/login')}
                className="w-full border-2 border-gray-400 text-gray-600 font-bold tracking-wide bg-white hover:bg-gray-400 hover:text-white px-6 py-3 rounded-none uppercase text-xs transition-all duration-300"
              >
                <div className="flex items-center justify-center space-x-2">
                  <ArrowLeft size={14} />
                  <span>Back to Login</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, black 1px, transparent 1px),
              linear-gradient(to bottom, black 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-3 py-4">
        <div className="w-full max-w-md border-2 border-black bg-white p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-sm">
          
          {/* Title */}
          <div className="mb-6 text-center">
            <div className="w-14 h-14 bg-black mx-auto mb-4 flex items-center justify-center">
              <Mail className="text-white" size={24} />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-black mb-3 leading-none">
              Forgot Password
            </h1>
            <div className="w-16 h-0.5 bg-black mx-auto mb-3"></div>
            <p className="text-xs text-gray-700 font-medium tracking-wide max-w-xs mx-auto leading-relaxed">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4">
              <div className="p-3 border-2 border-red-600 text-red-600 text-xs font-medium tracking-wide bg-red-50">
                <div className="flex items-center gap-2">
                  <AlertCircle size={14} />
                  {error}
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FormInput
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                autoComplete="email"
                error={!email && error === 'Please enter your email address' ? 'Email is required' : ''}
              />
              <div className="absolute right-3 top-7 text-gray-400">
                <Mail size={14} />
              </div>
            </div>

            <div className="pt-3">
              <Button
                type="submit"
                disabled={loading}
                className={`w-full border-2 border-black font-bold tracking-wide px-6 py-3 rounded-none uppercase text-xs transition-all duration-300 transform hover:scale-105 ${
                  loading
                    ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-400'
                    : 'text-white bg-black hover:bg-white hover:text-black'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Send size={16} />
                    <span>Send Reset Link</span>
                  </div>
                )}
              </Button>
            </div>
          </form>

          {/* Footer Actions */}
          <div className="mt-6 space-y-3">
            <div className="text-center border-t border-gray-200 pt-4">
              <p className="text-xs text-black font-medium tracking-wide">
                Remember your password?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="underline hover:text-gray-700 transition-colors duration-200 font-bold"
                >
                  Sign in here
                </button>
              </p>
            </div>

            <div className="text-center">
              <Button
                onClick={() => navigate('/')}
                className="border-2 border-black text-black font-bold tracking-wide bg-white hover:bg-black hover:text-white px-4 py-2 rounded-none uppercase text-xs transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-center space-x-2">
                  <ArrowLeft size={14} />
                  <span>Back to Home</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;