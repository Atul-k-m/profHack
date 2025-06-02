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

  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const token = window.authToken || localStorage.getItem('token')
        
        if (!token) {
          setError('No authentication token found');
          handleLogout();
          return;
        }

        const response = await fetch('https://profhack-backend.onrender.com/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
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
    setCurrentPage('home');
  };

  const LoadingCard = () => (
    <div className="bg-white border-2 border-black p-6 animate-pulse">
      <div className="h-4 bg-gray-300 rounded mb-4"></div>
      <div className="h-8 bg-gray-300 rounded mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
    </div>
  );

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

  const Navbar = () => (
    <nav className="bg-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center flex-shrink-0">
            <h1 className="text-lg sm:text-xl font-black tracking-tight text-black">
              DASHBOARD
            </h1>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={() => setCurrentPage('teams')}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-black hover:bg-black hover:text-white border border-black transition-all duration-200"
            >
              <Users size={16} className="sm:w-5 sm:h-5" />
              <span className="font-bold text-xs sm:text-sm tracking-wide uppercase hidden sm:inline">Teams</span>
              <span className="font-bold text-xs tracking-wide uppercase sm:hidden">T</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all duration-200 font-bold text-xs tracking-wide uppercase"
            >
              <LogOut size={12} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white border-2 border-black shadow-lg relative overflow-hidden ${className}`}>
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

  const StatCard = ({ title, value, icon: Icon, description, loading = false }) => (
    <Card className="p-4 sm:p-6">
      {loading ? (
        <div className="animate-pulse">
          <div className="h-3 bg-gray-300 rounded mb-2 w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded mb-1"></div>
          <div className="h-2 bg-gray-300 rounded w-2/3"></div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold tracking-wider uppercase text-gray-600 mb-2">
              {title}
            </p>
            <p className="text-xl sm:text-2xl font-black text-black tracking-tight truncate">
              {value}
            </p>
            {description && (
              <p className="text-xs text-gray-600 font-medium tracking-wide mt-1">
                {description}
              </p>
            )}
          </div>
          <div className="p-2 sm:p-3 bg-black text-white flex-shrink-0 ml-2">
            <Icon size={20} className="sm:w-6 sm:h-6" />
          </div>
        </div>
      )}
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8">
            <div className="h-6 sm:h-8 bg-gray-300 rounded mb-4 w-1/2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {[1, 2, 3, 4].map(i => <LoadingCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
        
        {error && <ErrorMessage message={error} />}

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-black mb-2 leading-tight">
            Welcome, {
              userProfile.name
                ? userProfile.name
                    .replace(/^(Mr\.?|Mrs\.?|Ms\.?|Dr\.?|Prof\.?)\s+/i, '') 
                    .split(' ')[0]
                : 'User'
            }
          </h1>

          <div className="w-12 sm:w-16 h-1 bg-black mb-3 sm:mb-4"></div>
          <p className="text-xs sm:text-sm text-gray-700 font-medium tracking-wide">
            {userProfile.designation || 'No Designation'} • {userProfile.department || 'No Department'} Department • {userProfile.experience} years experience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <Card className="p-4 sm:p-6">
              <div className="border-b-2 border-black mb-4 sm:mb-6 pb-3 sm:pb-4">
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-black uppercase">
                  Skills & Expertise
                </h3>
              </div>
              
              <div className="p-3 sm:p-4 border border-black bg-gray-50">
                <div className="flex flex-wrap gap-2">
                  {userProfile.skills ? (
                    userProfile.skills.split(',').map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-black text-white text-xs font-bold tracking-wide uppercase"
                      >
                        {skill.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="px-2 sm:px-3 py-1 bg-gray-500 text-white text-xs font-bold tracking-wide uppercase">
                      No skills listed
                    </span>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6">
              <div className="border-b-2 border-black mb-4 sm:mb-6 pb-3 sm:pb-4">
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-black uppercase">
                  Profile Information
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 border border-black bg-gray-50">
                    <p className="text-xs font-bold tracking-wider uppercase text-gray-600 mb-1">
                      Username
                    </p>
                    <p className="text-sm font-bold text-black break-words">
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
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 border border-black bg-gray-50">
                    <p className="text-xs font-bold tracking-wider uppercase text-gray-600 mb-1">
                      Designation
                    </p>
                    <p className="text-sm font-bold text-black break-words">
                      {userProfile.designation || 'Not set'}
                    </p>
                  </div>
                  <div className="p-3 border border-black bg-gray-50">
                    <p className="text-xs font-bold tracking-wider uppercase text-gray-600 mb-1">
                      Department
                    </p>
                    <p className="text-sm font-bold text-black break-words">
                      {userProfile.department || 'Not set'}
                    </p>
                  </div>
                </div>
                
                <div className="p-3 border border-black bg-gray-50">
                  <p className="text-xs font-bold tracking-wider uppercase text-gray-600 mb-1">
                    Full Name
                  </p>
                  <p className="text-sm font-bold text-black break-words">
                    {userProfile.name || 'Not set'}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <Card className="p-4 sm:p-6">
              <div className="border-b-2 border-black mb-4 sm:mb-6 pb-3 sm:pb-4">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-black uppercase flex items-center gap-2">
                  <Award size={18} className="sm:w-5 sm:h-5" />
                  Achievements
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 sm:p-4 border-2 border-black bg-gradient-to-r from-yellow-400 to-orange-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-6 sm:w-8 h-6 sm:h-8 bg-black transform rotate-45 translate-x-3 sm:translate-x-4 -translate-y-3 sm:-translate-y-4"></div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-black text-white flex items-center justify-center font-black text-base sm:text-lg">
                      🏆
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-black text-black tracking-tight uppercase">
                        ProfHack2025 Participant
                      </h4>
                      <p className="text-xs text-black font-medium">
                        Professional Hackathon 2025
                      </p>
                    </div>
                  </div>
                </div>

                {userProfile.skills && userProfile.skills.split(',').length >= 3 && (
                  <div className="p-3 border border-black bg-white">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 bg-black text-white flex items-center justify-center text-sm font-black">
                        💻
                      </div>
                      <div className="min-w-0 flex-1">
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

                {userProfile.experience >= 5 && (
                  <div className="p-3 border border-black bg-white">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 bg-black text-white flex items-center justify-center text-sm font-black">
                        ⭐
                      </div>
                      <div className="min-w-0 flex-1">
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