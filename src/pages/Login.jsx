import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff, Lock, User } from 'lucide-react';
import { setAuthToken } from '../services/api';

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

const Login = ({ setUser = () => {} }) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://profhack-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (response.ok) {
        setAuthToken(data.token);
        console.log('Login successful:', data);
        setUser(data.user);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

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
              <LogIn className="text-white" size={24} />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-black mb-3 leading-none">
              Welcome Back
            </h1>
            <div className="w-16 h-0.5 bg-black mx-auto mb-3"></div>
            <p className="text-xs text-gray-700 font-medium tracking-wide max-w-xs mx-auto leading-relaxed">
              Sign in to your account and continue your journey
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4">
              <div className="p-3 border-2 border-red-600 text-red-600 text-xs font-medium tracking-wide bg-red-50">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                  {error}
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              {/* Email Input */}
              <div className="relative">
                <FormInput
                  label="Username or Email"
                  type="text"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  placeholder="Enter your username or email"
                  autoComplete="email"
                  error={!loginData.email && error === 'Please fill all fields' ? 'Username or email is required' : ''}
                />
                <div className="absolute right-3 top-7 text-gray-400">
                  <User size={14} />
                </div>
              </div>

              <div className="relative">
                <FormInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  error={!loginData.password && error === 'Please fill all fields' ? 'Password is required' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-7 text-gray-400 hover:text-black transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

         
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 border-2 border-black rounded-none focus:ring-2 focus:ring-black text-black"
                />
                <span className="ml-2 text-xs text-black font-medium tracking-wide">
                  Remember me
                </span>
              </label>
             
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
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <LogIn size={16} />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </div>
          </form>

          {/* Footer Actions */}
          <div className="mt-6 space-y-3">
            <div className="text-center border-t border-gray-200 pt-4">
              <p className="text-xs text-black font-medium tracking-wide">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/register')}
                  className="underline hover:text-gray-700 transition-colors duration-200 font-bold"
                >
                  Create one here
                </button>
              </p>
            </div>

            <div className="text-center">
              <Button
                onClick={() => navigate('/')}
                className="border-2 border-black text-black font-bold tracking-wide bg-white hover:bg-black hover:text-white px-4 py-2 rounded-none uppercase text-xs transition-all duration-300 transform hover:scale-105"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
