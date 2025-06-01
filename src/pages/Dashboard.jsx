import React, { useState, useEffect } from 'react';
import { User, Briefcase, Users, TrendingUp, Calendar, MessageSquare, Settings, LogOut, Bell, Target, Award, Clock, BookOpen, ChevronRight, BarChart3, PieChart, Activity } from 'lucide-react';

const Dashboard = ({ setCurrentPage, setIsLoggedIn, user }) => {
  const [userProfile, setUserProfile] = useState({
    department: '',
    designation: '',
    name: '',
    email: '',
    skills: '',
    experience: 0,
    username: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile data from database
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const token = window.authToken || localStorage.getItem('authToken');
        
        if (!token) {
          setError('No authentication token found');
          handleLogout();
          return;
        }

        const response = await fetch('http://localhost:5000/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Token is invalid or expired
            setError('Session expired. Please login again.');
            handleLogout();
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        setUserProfile({
          department: userData.department || '',
          designation: userData.designation || '',
          name: userData.name || '',
          email: userData.email || '',
          skills: userData.skills || '',
          experience: userData.experience || 0,
          username: userData.username || ''
        });
        setError(null);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load profile data. Please try refreshing.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    window.authToken = null;
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setCurrentPage('hero');
  };

  // Loading component
  const LoadingCard = () => (
    <div className="bg-white border-2 border-black p-6 animate-pulse">
      <div className="h-4 bg-gray-300 rounded mb-4"></div>
      <div className="h-8 bg-gray-300 rounded mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
    </div>
  );

  // Error component
  const ErrorMessage = ({ message }) => (
    <div className="bg-red-50 border-2 border-red-500 p-4 mb-6">
      <div className="flex items-center">
        <div className="text-red-500 mr-3">⚠️</div>
        <div>
          <h3 className="text-sm font-bold text-red-800 uppercase tracking-wide">Error</h3>
          <p className="text-sm text-red-700">{message}</p>
        </div>
      </div>
    </div>
  );

  // Simple navbar component
  const Navbar = () => (
    <nav className="bg-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-black tracking-tight text-black">
              DASHBOARD
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-black hover:bg-black hover:text-white border border-black transition-all duration-200">
              <Bell size={18} />
            </button>
            <button className="p-2 text-black hover:bg-black hover:text-white border border-black transition-all duration-200">
              <Settings size={18} />
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all duration-200 font-bold text-xs tracking-wide uppercase"
            >
              <LogOut size={14} className="inline mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Card component with grid pattern
  const Card = ({ children, className = "" }) => (
    <div className={`bg-white border-2 border-black shadow-lg relative overflow-hidden ${className}`}>
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );

  // Stat card component
  const StatCard = ({ title, value, icon: Icon, description, loading = false }) => (
    <Card className="p-6">
      {loading ? (
        <div className="animate-pulse">
          <div className="h-3 bg-gray-300 rounded mb-2 w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded mb-1"></div>
          <div className="h-2 bg-gray-300 rounded w-2/3"></div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-gray-600 mb-2">
              {title}
            </p>
            <p className="text-2xl font-black text-black tracking-tight">
              {value}
            </p>
            {description && (
              <p className="text-xs text-gray-600 font-medium tracking-wide mt-1">
                {description}
              </p>
            )}
          </div>
          <div className="p-3 bg-black text-white">
            <Icon size={24} />
          </div>
        </div>
      )}
    </Card>
  );

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-300 rounded mb-4 w-1/3 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => <LoadingCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-black mb-2 leading-tight">
            Welcome, {userProfile.name ? userProfile.name.split(' ')[0] : 'User'}
          </h1>
          <div className="w-16 h-1 bg-black mb-4"></div>
          <p className="text-sm text-gray-700 font-medium tracking-wide">
            {userProfile.designation || 'No Designation'} • {userProfile.department || 'No Department'} Department • {userProfile.experience} years experience
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Designation"
            value={userProfile.designation || 'Not Set'}
            icon={Target}
            description="Your job designation"
          />
          <StatCard
            title="Department"
            value={userProfile.department || 'Not Set'}
            icon={Briefcase}
            description="Your assigned department"
          />
          <StatCard
            title="Experience"
            value={`${userProfile.experience} Years`}
            icon={User}
            description="Professional experience"
          />
          <StatCard
            title="Skills Count"
            value={userProfile.skills ? userProfile.skills.split(',').length : 0}
            icon={TrendingUp}
            description="Technical skills"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skills & Expertise */}
            <Card className="p-6">
              <div className="border-b-2 border-black mb-6 pb-4">
                <h3 className="text-xl font-black tracking-tight text-black uppercase">
                  Skills & Expertise
                </h3>
              </div>
              
              <div className="p-4 border border-black bg-gray-50">
                <div className="flex flex-wrap gap-2">
                  {userProfile.skills ? (
                    userProfile.skills.split(',').map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-black text-white text-xs font-bold tracking-wide uppercase"
                      >
                        {skill.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="px-3 py-1 bg-gray-500 text-white text-xs font-bold tracking-wide uppercase">
                      No skills listed
                    </span>
                  )}
                </div>
              </div>
            </Card>

            {/* Profile Information */}
            <Card className="p-6">
              <div className="border-b-2 border-black mb-6 pb-4">
                <h3 className="text-xl font-black tracking-tight text-black uppercase">
                  Profile Information
                </h3>
              </div>
              
              <div className="space-y-4">
                {/* First row - Username and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border border-black bg-gray-50">
                    <p className="text-xs font-bold tracking-wider uppercase text-gray-600 mb-1">
                      Username
                    </p>
                    <p className="text-sm font-bold text-black">
                      {userProfile.username || 'Not set'}
                    </p>
                  </div>
                  <div className="p-3 border border-black bg-gray-50">
                    <p className="text-xs font-bold tracking-wider uppercase text-gray-600 mb-1">
                      Email
                    </p>
                    <p className="text-sm font-bold text-black break-all">
                      {userProfile.email || 'Not set'}
                    </p>
                  </div>
                </div>
                
                {/* Second row - Designation and Department */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border border-black bg-gray-50">
                    <p className="text-xs font-bold tracking-wider uppercase text-gray-600 mb-1">
                      Designation
                    </p>
                    <p className="text-sm font-bold text-black">
                      {userProfile.designation || 'Not set'}
                    </p>
                  </div>
                  <div className="p-3 border border-black bg-gray-50">
                    <p className="text-xs font-bold tracking-wider uppercase text-gray-600 mb-1">
                      Department
                    </p>
                    <p className="text-sm font-bold text-black">
                      {userProfile.department || 'Not set'}
                    </p>
                  </div>
                </div>
                
                {/* Third row - Full Name */}
                <div className="p-3 border border-black bg-gray-50">
                  <p className="text-xs font-bold tracking-wider uppercase text-gray-600 mb-1">
                    Full Name
                  </p>
                  <p className="text-sm font-bold text-black">
                    {userProfile.name || 'Not set'}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Achievements & Badges */}
            <Card className="p-6">
              <div className="border-b-2 border-black mb-6 pb-4">
                <h3 className="text-lg font-black tracking-tight text-black uppercase flex items-center gap-2">
                  <Award size={20} />
                  Achievements
                </h3>
              </div>
              
              <div className="space-y-4">
                {/* ProfHack2025 Badge */}
                <div className="p-4 border-2 border-black bg-gradient-to-r from-yellow-400 to-orange-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-black transform rotate-45 translate-x-4 -translate-y-4"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-lg">
                      🏆
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-black tracking-tight uppercase">
                        ProfHack2025 Participant
                      </h4>
                      <p className="text-xs text-black font-medium">
                        Professional Hackathon 2025
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills Master Badge - Dynamic based on skills count */}
                {userProfile.skills && userProfile.skills.split(',').length >= 3 && (
                  <div className="p-3 border border-black bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-black text-white flex items-center justify-center text-sm font-black">
                        💻
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-black tracking-tight uppercase">
                          Skills Master
                        </h4>
                        <p className="text-xs text-gray-600 font-medium">
                          {userProfile.skills.split(',').length}+ Technologies
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Experience Badge */}
                {userProfile.experience >= 5 && (
                  <div className="p-3 border border-black bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-black text-white flex items-center justify-center text-sm font-black">
                        ⭐
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-black tracking-tight uppercase">
                          Veteran Professional
                        </h4>
                        <p className="text-xs text-gray-600 font-medium">
                          {userProfile.experience}+ Years Experience
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;