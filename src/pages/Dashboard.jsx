import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { User, Briefcase, Users, TrendingUp, Calendar, MessageSquare, Settings, LogOut, Bell, Target, Award, Clock, BookOpen, ChevronRight, BarChart3, PieChart, Activity, Edit2, Save, X, ArrowLeft } from 'lucide-react';

// Memoized components to prevent unnecessary re-renders
const Navbar = React.memo(({ currentView, setCurrentView, handleLogout }) => (
  <nav className="bg-white border-b-2 border-black sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          {currentView === 'teams' && (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="mr-3 p-2 border border-black hover:bg-black hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <h1 className="text-xl font-black tracking-tight text-black">
            {currentView === 'teams' ? 'TEAMS' : 'DASHBOARD'}
          </h1>
        </div>
        
       <div className="flex items-center space-x-2">
  {currentView === 'dashboard' && (
    <button 
      onClick={() => setCurrentView('teams')}
      className="flex items-center gap-2 md:gap-2 px-3 py-2 md:px-6 md:py-2.5 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all duration-200 font-bold text-xs md:text-sm tracking-wide uppercase shadow-lg"
    >
      <Users size={16} />
      <span>TEAMS</span>
    </button>
  )}

  <button 
    onClick={handleLogout}
    className="flex items-center gap-2 md:gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-white text-black hover:bg-black hover:text-white border-2 border-black transition-all duration-200 font-bold text-xs md:text-sm tracking-wide uppercase"
  >
    <LogOut size={16} />
    <span className="hidden md:inline">LOGOUT</span>
  </button>
</div>
      </div>
    </div>
  </nav>
));

const Card = React.memo(({ children, className = "" }) => (
  <div className={`bg-white border-2 border-black shadow-lg relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 opacity-5 pointer-events-none bg-grid-pattern"></div>
    <div className="relative z-10">
      {children}
    </div>
  </div>
));

const StatCard = React.memo(({ title, value, icon: Icon, description, loading = false }) => (
  <Card className="p-4 sm:p-6">
    {loading ? (
      <div className="animate-pulse">
        <div className="h-3 bg-gray-300 rounded mb-2 w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded mb-1"></div>
        <div className="h-2 bg-gray-300 rounded w-2/3"></div>
      </div>
    ) : (
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-xs font-bold tracking-wider uppercase text-gray-600 mb-2">
            {title}
          </p>
          <p className="text-lg sm:text-xl font-black text-black tracking-tight leading-tight break-words">
            {value}
          </p>
          {description && (
            <p className="text-xs text-gray-600 font-medium tracking-wide mt-2">
              {description}
            </p>
          )}
        </div>
        <div className="p-2 sm:p-3 bg-black text-white flex-shrink-0">
          <Icon size={18} className="sm:w-5 sm:h-5" />
        </div>
      </div>
    )}
  </Card>
));

// Optimized EditableField component with stable refs and focus management
const EditableField = React.memo(({ label, field, type = 'text', options = null, value, editMode, onChange, fieldRef }) => {
  const handleChange = useCallback((e) => {
    onChange(field, e.target.value);
  }, [field, onChange]);

  const handleNumberChange = useCallback((e) => {
    onChange(field, parseInt(e.target.value) || 0);
  }, [field, onChange]);

  return (
    <div className="p-3 border border-black bg-gray-50">
      <p className="text-xs font-bold tracking-wider uppercase text-gray-600 mb-1">
        {label}
      </p>
      {editMode ? (
        type === 'select' ? (
          <select
            ref={fieldRef}
            value={value || ''}
            onChange={handleChange}
            className="w-full text-sm font-bold text-black bg-white border border-gray-300 p-1 focus:outline-none focus:border-black"
          >
            {options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : type === 'number' ? (
          <input
            ref={fieldRef}
            type="number"
            value={value || 0}
            onChange={handleNumberChange}
            className="w-full text-sm font-bold text-black bg-white border border-gray-300 p-1 focus:outline-none focus:border-black"
          />
        ) : (
          <input
            ref={fieldRef}
            type={type}
            value={value || ''}
            onChange={handleChange}
            className="w-full text-sm font-bold text-black bg-white border border-gray-300 p-1 focus:outline-none focus:border-black"
          />
        )
      ) : (
        <p className="text-sm font-bold text-black break-words">
          {value || 'Not set'}
        </p>
      )}
    </div>
  );
});

const TeamsPage = React.memo(() => (
  <div className="text-center">
    <Card className="p-8 sm:p-12">
      <div className="mb-6">
        <div className="w-24 h-24 bg-black text-white mx-auto flex items-center justify-center mb-6">
          <Users size={48} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-black mb-4 uppercase">
          Teams Page
        </h1>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
      </div>
      
      <div className="space-y-4 text-center">
        <p className="text-lg sm:text-xl font-bold text-gray-800 tracking-wide">
         Teams are coming soon!
        </p>
        <p className="text-base text-gray-700 font-medium max-w-md mx-auto">
          Team formation page will be enabled after all faculty members have been onboarded. 
          Stay tuned for collaborative team management tools!
        </p>
        <div className="pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 border-2 border-black font-bold text-sm tracking-wide uppercase">
            <Clock size={16} />
            Stay Tuned
          </div>
        </div>
      </div>
    </Card>
  </div>
));

const LoadingCard = React.memo(() => (
  <div className="bg-white border-2 border-black p-4 sm:p-6 animate-pulse">
    <div className="h-4 bg-gray-300 rounded mb-4"></div>
    <div className="h-8 bg-gray-300 rounded mb-2"></div>
    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
  </div>
));

const ErrorMessage = React.memo(({ message }) => (
  <div className="bg-red-50 border-2 border-red-500 p-4 mb-4 sm:mb-6">
    <div className="flex items-center">
      <div className="text-red-500 mr-3">⚠️</div>
      <div>
        <h3 className="text-sm font-bold text-red-800 uppercase tracking-wide">Error</h3>
        <p className="text-sm text-red-700">{message}</p>
      </div>
    </div>
  </div>
));

const Dashboard = ({ setCurrentPage, setIsLoggedIn, user }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userProfile, setUserProfile] = useState({
    department: '',
    designation: '',
    name: '',
    email: '',
    skills: '',
    experience: 0,
    username: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  
  // Stable refs for each field to prevent focus loss
  const fieldRefs = useRef({
    username: null,
    email: null,
    designation: null,
    department: null,
    name: null,
    experience: null,
    skills: null
  });

  // Memoized callbacks to prevent unnecessary re-renders
  const handleLogout = useCallback(() => {
    window.authToken = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentPage('home');
  }, [setIsLoggedIn, setCurrentPage]);

  const handleInputChange = useCallback((field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleEditToggle = useCallback(() => {
    if (editMode) {
      // Reset edited profile to original values when canceling
      setEditedProfile(userProfile);
    } else {
      // Initialize edited profile when starting edit mode
      setEditedProfile({...userProfile});
    }
    setEditMode(!editMode);
  }, [editMode, userProfile]);

  const handleSaveProfile = useCallback(async () => {
    try {
      setSaving(true);
      const token = window.authToken || localStorage.getItem('authToken') || localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const response = await fetch('https://profhack-backend.onrender.com/api/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedProfile)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedData = await response.json();
      setUserProfile(editedProfile);
      setEditMode(false);
      setError(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to save profile changes. Please try again.');
    } finally {
      setSaving(false);
    }
  }, [editedProfile]);

  // Focus first field when entering edit mode
  useEffect(() => {
    if (editMode && fieldRefs.current.username) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        fieldRefs.current.username?.focus();
      }, 100);
    }
  }, [editMode]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const token = window.authToken || localStorage.getItem('authToken') || localStorage.getItem('token')
        
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
        const profile = {
          department: userData.department || '',
          designation: userData.designation || '',
          name: userData.name || '',
          email: userData.email || '',
          skills: userData.skills || '',
          experience: userData.experience || 0,
          username: userData.username || ''
        };
        setUserProfile(profile);
        setEditedProfile(profile);
        setError(null);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load profile data. Please try refreshing.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [handleLogout]);

  // Memoized values to prevent unnecessary re-calculations
  const displayName = useMemo(() => {
    return userProfile.name
      ? userProfile.name
          .replace(/^(Mr\.?|Mrs\.?|Ms\.?|Dr\.?|Prof\.?)\s+/i, '') 
          .split(' ')[0]
      : 'User';
  }, [userProfile.name]);

  const skillsArray = useMemo(() => {
    return userProfile.skills ? userProfile.skills.split(',') : [];
  }, [userProfile.skills]);

  const skillsCount = useMemo(() => {
    return skillsArray.length;
  }, [skillsArray]);

  // Memoized stat cards data
  const statCards = useMemo(() => [
    {
      title: "Designation",
      value: userProfile.designation || 'Not Set',
      icon: Target,
      description: "Your job designation"
    },
    {
      title: "Department", 
      value: userProfile.department || 'Not Set',
      icon: Briefcase,
      description: "Your assigned department"
    },
    {
      title: "Experience",
      value: `${userProfile.experience} Years`,
      icon: User,
      description: "Professional experience"
    },
    {
      title: "Skills Count",
      value: skillsCount,
      icon: TrendingUp,
      description: "Technical skills"
    }
  ], [userProfile.designation, userProfile.department, userProfile.experience, skillsCount]);

  if (currentView === 'teams') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar currentView={currentView} setCurrentView={setCurrentView} handleLogout={handleLogout} />
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <TeamsPage />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar currentView={currentView} setCurrentView={setCurrentView} handleLogout={handleLogout} />
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="h-8 bg-gray-300 rounded mb-4 w-1/2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            {[1, 2, 3, 4].map(i => <LoadingCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} handleLogout={handleLogout} />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        
        {error && <ErrorMessage message={error} />}

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-black leading-tight">
              Welcome, {displayName}
            </h1>
            
            <div className="flex items-center gap-2">
              {editMode ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white hover:bg-green-700 border-2 border-green-600 font-bold text-sm tracking-wide uppercase disabled:opacity-50"
                  >
                    <Save size={16} />
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white hover:bg-red-700 border-2 border-red-600 font-bold text-sm tracking-wide uppercase"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 border-2 border-blue-600 font-bold text-sm tracking-wide uppercase"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
              )}
            </div>
          </div>

          <div className="w-12 sm:w-16 h-1 bg-black mb-3"></div>
          <p className="text-xs sm:text-sm text-gray-700 font-medium tracking-wide">
            {userProfile.designation || 'No Designation'} • {userProfile.department || 'No Department'} Department • {userProfile.experience} years experience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          {statCards.map((card, index) => (
            <StatCard key={index} {...card} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-4 sm:p-6">
              <div className="border-b-2 border-black mb-4 pb-3">
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-black uppercase">
                  Skills & Expertise
                </h3>
              </div>
              
              <div className="p-3 sm:p-4 border border-black bg-gray-50">
                {editMode ? (
                  <textarea
                    ref={el => fieldRefs.current.skills = el}
                    value={editedProfile.skills || ''}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    placeholder="Enter skills separated by commas (e.g., React, Node.js, Python)"
                    className="w-full h-20 text-sm font-medium text-black bg-white border border-gray-300 p-2 focus:outline-none focus:border-black resize-none"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {skillsArray.length > 0 ? (
                      skillsArray.map((skill, index) => (
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
                )}
              </div>
            </Card>

            <Card className="p-4 sm:p-6">
              <div className="border-b-2 border-black mb-4 pb-3">
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-black uppercase">
                  Profile Information
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <EditableField
                    label="Username"
                    field="username"
                    value={editMode ? editedProfile.username : userProfile.username}
                    editMode={editMode}
                    onChange={handleInputChange}
                    fieldRef={el => fieldRefs.current.username = el}
                  />
                  <EditableField
                    label="Email"
                    field="email"
                    type="email"
                    value={editMode ? editedProfile.email : userProfile.email}
                    editMode={editMode}
                    onChange={handleInputChange}
                    fieldRef={el => fieldRefs.current.email = el}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <EditableField
                    label="Designation"
                    field="designation"
                    value={editMode ? editedProfile.designation : userProfile.designation}
                    editMode={editMode}
                    onChange={handleInputChange}
                    fieldRef={el => fieldRefs.current.designation = el}
                  />
                  <EditableField
                    label="Department"
                    field="department"
                    value={editMode ? editedProfile.department : userProfile.department}
                    editMode={editMode}
                    onChange={handleInputChange}
                    fieldRef={el => fieldRefs.current.department = el}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <EditableField
                    label="Full Name"
                    field="name"
                    value={editMode ? editedProfile.name : userProfile.name}
                    editMode={editMode}
                    onChange={handleInputChange}
                    fieldRef={el => fieldRefs.current.name = el}
                  />
                  <EditableField
                    label="Experience (Years)"
                    field="experience"
                    type="number"
                    value={editMode ? editedProfile.experience : userProfile.experience}
                    editMode={editMode}
                    onChange={handleInputChange}
                    fieldRef={el => fieldRefs.current.experience = el}
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-4 sm:p-6">
              <div className="border-b-2 border-black mb-4 pb-3">
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
                        ReBooT2025 Participant
                      </h4>
                      <p className="text-xs text-black font-medium">
                        Professional Hackathon 2025
                      </p>
                    </div>
                  </div>
                </div>

                {skillsCount >= 3 && (
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
                          {skillsCount}+ Technologies
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