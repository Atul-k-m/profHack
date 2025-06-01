import React, { useState } from 'react';
import { LogIn, Eye, EyeOff, Lock, User } from 'lucide-react';


const Button = ({ children, onClick, variant, className, type, disabled, ...props }) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={className}
    {...props}
  >
    {children}
  </button>
)

const FormInput = ({ label, error, type, ...props }) => (
  <div className="space-y-2">
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
)

const Login = ({ setCurrentPage = () => {}, setIsLoggedIn = () => {}, setUser = () => {} }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!loginData.username || !loginData.password) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://profhack-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        window.authToken = data.token;
        setUser(data.user);
        setIsLoggedIn(true);
        setCurrentPage('dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
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
      
    
     

 
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-6">
        <div className="w-full max-w-xl border-2 border-black bg-white p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          
          <div className="mb-10 text-center">
            <div className="w-20 h-20 bg-black mx-auto mb-6 flex items-center justify-center">
              <LogIn className="text-white" size={36} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-black mb-4 leading-none">
              Welcome Back
            </h1>
            <div className="w-20 h-1 bg-black mx-auto mb-4"></div>
            <p className="text-sm text-gray-700 font-medium tracking-wide max-w-sm mx-auto leading-relaxed">
              Sign in to your account and continue your journey
            </p>
          </div>

        
          {error && (
            <div className="mb-8">
              <div className="p-4 border-2 border-red-600 text-red-600 text-xs font-medium tracking-wide bg-red-50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  {error}
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            <div className="space-y-5">
              <div className="relative">
                <FormInput
                  label="Username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  placeholder="Enter your username"
                  autoComplete="username"
                  error={!loginData.username && error === 'Please fill all fields' ? 'Username is required' : ''}
                />
                <div className="absolute right-3 top-8 text-gray-400">
                  <User size={16} />
                </div>
              </div>

              <div className="relative">
                <FormInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  error={!loginData.password && error === 'Please fill all fields' ? 'Password is required' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-gray-400 hover:text-black transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-2 border-black rounded-none focus:ring-2 focus:ring-black text-black"
                />
                <span className="ml-3 text-xs text-black font-medium tracking-wide">
                  Remember me
                </span>
              </label>
              <button 
                type="button"
                className="text-xs text-black hover:text-gray-700 transition-colors duration-200 font-medium tracking-wide underline"
              >
                Forgot password?
              </button>
            </div>

           
            <div className="pt-4">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className={`
                  w-full
                  border-2 border-black font-bold tracking-wide
                  px-8 py-4 rounded-none uppercase text-sm
                  transition-all duration-300 transform hover:scale-105
                  ${loading 
                    ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-400' 
                    : 'text-white bg-black hover:bg-white hover:text-black'
                  }
                `}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <LogIn size={18} />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-10 space-y-4">
          
            <div className="text-center border-t border-gray-200 pt-6">
              <p className="text-sm text-black font-medium tracking-wide">
                Don't have an account?{' '}
                <button
                  onClick={() => setCurrentPage('register')}
                  className="underline hover:text-gray-700 transition-colors duration-200 font-bold"
                >
                  Create one here
                </button>
              </p>
            </div>

          
            <div className="text-center">
              <Button
                onClick={() => setCurrentPage('hero')}
                className="
                  border-2 border-black text-black font-bold tracking-wide
                  bg-white hover:bg-black hover:text-white 
                  px-6 py-2 rounded-none uppercase text-xs
                  transition-all duration-300 transform hover:scale-105
                "
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;