import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, Check, AlertCircle, ArrowLeft } from 'lucide-react';

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

const FormInput = ({ label, error, type, icon: Icon, ...props }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-medium text-black tracking-wide">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        className={`w-full px-3 py-2 border border-black rounded-none text-black placeholder-gray-500
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
          text-xs shadow-sm font-medium tracking-wide pr-10
          ${error ? 'border-red-600 focus:ring-red-600' : 'border-black hover:border-gray-800'}`}
        {...props}
      />
      {Icon && (
        <div className="absolute right-3 top-2 text-gray-400">
          <Icon size={14} />
        </div>
      )}
    </div>
    {error && (
      <p className="text-xs text-red-600 flex items-center gap-1 font-medium">
        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
        {error}
      </p>
    )}
  </div>
);

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validatingToken, setValidatingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Validate token on component mount
  useEffect(() => {
    if (!token) {
      setError('Invalid reset link. Please request a new password reset.');
      setValidatingToken(false);
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetch('https://profhack-backend-npqc.onrender.com/api/auth/verify-reset-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        
        const data = await response.json();

        if (response.ok) {
          setTokenValid(true);
          setUserEmail(data.email);
        } else {
          setError(data.message || 'Invalid or expired reset token');
        }
      } catch (err) {
        console.error('Token validation error:', err);
        setError('Failed to validate reset token. Please try again.');
      } finally {
        setValidatingToken(false);
      }
    };

    validateToken();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.newPassword) {
      setError('New password is required');
      return false;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (!formData.confirmPassword) {
      setError('Please confirm your password');
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://profhack-backend-npqc.onrender.com/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          newPassword: formData.newPassword
        }),
      });
      
      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Loading state while validating token
  if (validatingToken) {
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
          <div className="w-full max-w-md border-2 border-black bg-white p-8 shadow-2xl backdrop-blur-sm">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-gray-600">Validating reset link...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
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
          <div className="w-full max-w-md border-2 border-black bg-white p-8 shadow-2xl backdrop-blur-sm">
            
            {/* Success Icon */}
            <div className="mb-6 text-center">
              <div className="w-14 h-14 bg-green-600 mx-auto mb-4 flex items-center justify-center">
                <Check className="text-white" size={24} />
              </div>
              <h1 className="text-3xl font-black tracking-tighter text-black mb-3 leading-none">
                Password Reset!
              </h1>
              <div className="w-16 h-0.5 bg-black mx-auto mb-3"></div>
              <p className="text-xs text-gray-700 font-medium tracking-wide max-w-xs mx-auto leading-relaxed">
                Your password has been successfully reset. You can now login with your new password.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={() => navigate('/login')}
                className="w-full border-2 border-black text-white font-bold tracking-wide bg-black hover:bg-white hover:text-black px-6 py-3 rounded-none uppercase text-xs transition-all duration-300 transform hover:scale-105"
              >
                Go to Login
              </Button>
              
              <Button
                onClick={() => navigate('/')}
                className="w-full border-2 border-gray-400 text-gray-600 font-bold tracking-wide bg-white hover:bg-gray-400 hover:text-white px-6 py-3 rounded-none uppercase text-xs transition-all duration-300"
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
    );
  }

  // Invalid token state
  if (!tokenValid) {
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
          <div className="w-full max-w-md border-2 border-black bg-white p-8 shadow-2xl backdrop-blur-sm">
            
            {/* Error Icon */}
            <div className="mb-6 text-center">
              <div className="w-14 h-14 bg-red-600 mx-auto mb-4 flex items-center justify-center">
                <AlertCircle className="text-white" size={24} />
              </div>
              <h1 className="text-3xl font-black tracking-tighter text-black mb-3 leading-none">
                Invalid Link
              </h1>
              <div className="w-16 h-0.5 bg-black mx-auto mb-3"></div>
              <p className="text-xs text-gray-700 font-medium tracking-wide max-w-xs mx-auto leading-relaxed">
                {error}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={() => navigate('/forgot-password')}
                className="w-full border-2 border-black text-white font-bold tracking-wide bg-black hover:bg-white hover:text-black px-6 py-3 rounded-none uppercase text-xs transition-all duration-300 transform hover:scale-105"
              >
                Request New Reset Link
              </Button>
              
              <Button
                onClick={() => navigate('/login')}
                className="w-full border-2 border-gray-400 text-gray-600 font-bold tracking-wide bg-white hover:bg-gray-400 hover:text-white px-6 py-3 rounded-none uppercase text-xs transition-all duration-300"
              >
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main reset form
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
        <div className="w-full max-w-md border-2 border-black bg-white p-8 shadow-2xl backdrop-blur-sm">
          
          {/* Title */}
          <div className="mb-6 text-center">
            <div className="w-14 h-14 bg-black mx-auto mb-4 flex items-center justify-center">
              <Lock className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-black mb-3 leading-none">
              Reset Password
            </h1>
            <div className="w-16 h-0.5 bg-black mx-auto mb-3"></div>
            <p className="text-xs text-gray-700 font-medium tracking-wide max-w-xs mx-auto leading-relaxed">
              Enter your new password for {userEmail}
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
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-7 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            <div className="relative">
              <FormInput
                label="Confirm New Password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm new password"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-7 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
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
                    <span>Resetting Password...</span>
                  </div>
                ) : (
                  'Reset Password'
                )}
              </Button>
            </div>
          </form>

          {/* Back to Login */}
          <div className="pt-4 text-center">
            <Button
              onClick={() => navigate('/login')}
              className="text-xs text-gray-600 hover:text-black font-medium tracking-wide transition-colors duration-200"
            >
              <div className="flex items-center justify-center space-x-2">
                <ArrowLeft size={12} />
                <span>Back to Login</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;