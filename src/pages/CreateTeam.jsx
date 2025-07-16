import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowLeft, Users, ChevronDown, ChevronRight, Search, User, CheckCircle2, X, Plus, AlertCircle, Target, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const DEPARTMENTS = {
  foundation: [
    'Physics',
    'Chemistry', 
    'Mathematics',
    'Master of Business Administration',
    'Humanities and Social Science',
    'Humanities & Social Science'
  ],
  structural: [
    'Mechanical Engineering',
    'Civil Engineering', 
    'Electrical & Electronics Engineering',
    'Electronics & Communication Engineering',
    'Electronics & Telecommunication Engineering'
  ],
  innovation: [
    'Computer Science & Engineering',
    'Information Science & Engineering',
    'Artificial Intelligence and Machine Learning',
    'Computer Science and Business Systems',
    'Master of Computer Applications',
    'CSE',
    'ISE', 
    'AI&ML',
    'CSBS'
  ]
};

const categorizeFaculty = (faculty) => {
  const categorized = {
    foundation: [],
    structural: [],
    innovation: [],
    uncategorized: []
  };

  faculty.forEach(member => {
    let categorized_flag = false;
    
    Object.entries(DEPARTMENTS).forEach(([category, departments]) => {
      if (departments.includes(member.department)) {
        categorized[category].push(member);
        categorized_flag = true;
      }
    });

    if (!categorized_flag) {
      categorized.uncategorized.push(member);
    }
  });

  return categorized;
};

const Navbar = React.memo(() => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/teams');
  };

  return (
    <nav className="bg-white border-b-2 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 transition-colors mr-4"
            >
              <ArrowLeft size={20} className="text-black" />
            </button>
            <h1 className="text-xl font-black tracking-tight text-black">
              CREATE TEAM
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
});

const Card = React.memo(({ children, className = "" }) => (
  <div className={`bg-white border-2 border-black shadow-lg relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 opacity-5 pointer-events-none bg-grid-pattern"></div>
    <div className="relative z-10">
      {children}
    </div>
  </div>
));

const RulesCard = React.memo(() => (
  <Card className="p-4 sm:p-6 mb-6">
    <div className="border-b-2 border-black mb-4 pb-3">
      <h3 className="text-lg font-black tracking-tight text-black uppercase flex items-center gap-2">
        <Target size={20} />
        Team Formation Rules
      </h3>
    </div>
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 bg-black text-white flex items-center justify-center text-xs font-bold rounded-full flex-shrink-0 mt-0.5">1</div>
        <p className="text-sm font-medium text-gray-700">Exactly <strong>5 faculty members</strong> per team (including leader)</p>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 bg-black text-white flex items-center justify-center text-xs font-bold rounded-full flex-shrink-0 mt-0.5">2</div>
        <p className="text-sm font-medium text-gray-700">Only faculty members <strong>not already in a team</strong> can be selected</p>
      </div>
    </div>
  </Card>
));

const FacultyCard = React.memo(({ faculty, isSelected, onSelect, isDisabled, disabledReason }) => (
  <div 
    className={`p-3 border-2 transition-all duration-200 cursor-pointer ${
      isSelected 
        ? 'border-green-500 bg-green-50' 
        : isDisabled 
          ? 'border-gray-300 bg-gray-50 opacity-50 cursor-not-allowed'
          : 'border-gray-300 hover:border-black hover:bg-gray-50'
    }`}
    onClick={() => !isDisabled && onSelect(faculty)}
    title={isDisabled ? disabledReason : ''}
  >
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-black truncate">{faculty.name}</h4>
        <p className="text-xs text-gray-600 font-medium">{faculty.designation}</p>
        <p className="text-xs text-gray-500">{faculty.department}</p>
      </div>
      <div className="flex-shrink-0 ml-2">
        {isSelected ? (
          <CheckCircle2 size={20} className="text-green-500" />
        ) : (
          <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
        )}
      </div>
    </div>
  </div>
));

const SelectedMember = React.memo(({ faculty, onRemove, isLeader }) => (
  <div className="flex items-center justify-between p-3 bg-blue-50 border-2 border-blue-500">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full text-xs font-bold">
        {faculty.name.charAt(0)}
      </div>
      <div>
        <h4 className="text-sm font-bold text-black">{faculty.name}</h4>
        <p className="text-xs text-gray-600">{faculty.department}</p>
        {isLeader && <span className="text-xs font-bold uppercase text-blue-600">Leader</span>}
      </div>
    </div>
    {!isLeader && (
      <button
        onClick={() => onRemove(faculty)}
        className="p-1 hover:bg-red-100 rounded-full transition-colors"
        title="Remove member"
      >
        <X size={16} className="text-red-500" />
      </button>
    )}
  </div>
));

const ValidationMessage = React.memo(({ message, type = 'error' }) => (
  <div className={`flex items-center gap-2 p-3 border-2 ${
    type === 'error' ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'
  }`}>
    <AlertCircle size={16} className={type === 'error' ? 'text-red-500' : 'text-blue-500'} />
    <span className={`text-sm font-medium ${type === 'error' ? 'text-red-700' : 'text-blue-700'}`}>
      {message}
    </span>
  </div>
));

const TeamFormation = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [teamData, setTeamData] = useState({
    teamName: '',
    description: 'Reboot Hackathon Team',
    leader: null,
    members: []
  });
  const [allFaculty, setAllFaculty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  // Fetch current user profile for leader info
  useEffect(() => {
    const fetchLeaderProfile = async () => {
      try {
        const token = window.authToken || localStorage.getItem('authToken') || localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('https://profhack-backend-npqc.onrender.com/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setTeamData(prev => ({
            ...prev,
            leader: {
              _id: userData._id,
              name: userData.name,
              department: userData.department,
              designation: userData.designation,
              email: userData.email
            }
          }));
        }
      } catch (error) {
        console.error('Error fetching leader profile:', error);
      }
    };

    fetchLeaderProfile();
  }, []);

  // Fetch all faculty for member selection - only those not in teams
  const fetchAllFaculty = useCallback(async () => {
    try {
      setLoading(true);
      const token = window.authToken || localStorage.getItem('authToken') || localStorage.getItem('token');
      
      // Fetch all faculty
      let facultyResponse;
      try {
        facultyResponse = await fetch('https://profhack-backend-npqc.onrender.com/api/teams/faculty/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        facultyResponse = await fetch('https://profhack-backend-npqc.onrender.com/api/faculty/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }

      if (!facultyResponse.ok) {
        throw new Error(`Failed to fetch faculty: ${facultyResponse.status}`);
      }

      const facultyData = await facultyResponse.json();
      
      // Fetch all teams to check which faculty are already in teams
      let teamsResponse;
      try {
        teamsResponse = await fetch('https://profhack-backend-npqc.onrender.com/api/teams/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        teamsResponse = await fetch('https://profhack-backend-npqc.onrender.com/api/teams', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }

      let teamsData = [];
      if (teamsResponse.ok) {
        teamsData = await teamsResponse.json();
      }

      // Get all faculty IDs that are already in teams
      const facultyInTeams = new Set();
      teamsData.forEach(team => {
        if (team.leader) {
          facultyInTeams.add(team.leader._id || team.leader);
        }
        if (team.members) {
          team.members.forEach(member => {
            facultyInTeams.add(member._id || member);
          });
        }
      });

      // Filter out faculty who are already in teams
      const availableFaculty = facultyData.filter(faculty => 
        !facultyInTeams.has(faculty._id)
      );

      console.log('Available faculty (not in teams):', availableFaculty);
      setAllFaculty(availableFaculty);
    } catch (error) {
      console.error('Error fetching faculty:', error);
      setError('Failed to load faculty data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentStep === 2) {
      fetchAllFaculty();
    }
  }, [currentStep, fetchAllFaculty]);

  // Filter faculty based on search term
  const filteredFaculty = useMemo(() => {
    if (!searchTerm.trim()) {
      return allFaculty;
    }
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return allFaculty.filter(faculty => 
      faculty.name?.toLowerCase().includes(lowerSearchTerm) ||
      faculty.department?.toLowerCase().includes(lowerSearchTerm) ||
      faculty.designation?.toLowerCase().includes(lowerSearchTerm)
    );
  }, [allFaculty, searchTerm]);

  // Simple validation - only check for 5 members
  const validateTeamComposition = useCallback(() => {
    const errors = [];
    const selectedMembers = [...teamData.members];
    if (teamData.leader) selectedMembers.push(teamData.leader);

    if (selectedMembers.length !== 5) {
      errors.push(`Team must have exactly 5 members (currently ${selectedMembers.length})`);
    }

    setValidationErrors(errors);
    return errors.length === 0;
  }, [teamData.members, teamData.leader]);

  const canSelectFaculty = useCallback((faculty) => {
    if (!teamData.leader) return { canSelect: false, reason: 'Leader not set' };
    
    const currentMembers = [...teamData.members, teamData.leader];
    
    if (currentMembers.some(m => m._id === faculty._id)) {
      return { canSelect: false, reason: 'Already selected' };
    }

    if (currentMembers.length >= 5) {
      return { canSelect: false, reason: 'Team is full (5 members max)' };
    }

    return { canSelect: true, reason: '' };
  }, [teamData.members, teamData.leader]);

  const handleInputChange = useCallback((field, value) => {
    setTeamData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleMemberSelect = useCallback((faculty) => {
    const { canSelect } = canSelectFaculty(faculty);
    if (!canSelect) return;

    setTeamData(prev => ({
      ...prev,
      members: [...prev.members, faculty]
    }));
  }, [canSelectFaculty]);

  const handleMemberRemove = useCallback((faculty) => {
    setTeamData(prev => ({
      ...prev,
      members: prev.members.filter(m => m._id !== faculty._id)
    }));
  }, []);

  const handleStepNavigation = useCallback((step) => {
    if (step === 2 && (!teamData.teamName.trim() || !teamData.description.trim())) {
      setError('Please fill in team name and description before proceeding.');
      return;
    }
    setCurrentStep(step);
    setError(null);
  }, [teamData.teamName, teamData.description]);

  const handleSubmit = useCallback(async () => {
    if (!validateTeamComposition()) {
      setError('Please fix the validation errors before submitting.');
      return;
    }

    try {
      setSubmitting(true);
      const token = window.authToken || localStorage.getItem('authToken') || localStorage.getItem('token');
      
      const submitData = {
        teamName: teamData.teamName,
        description: teamData.description,
        leader: teamData.leader._id,
        members: teamData.members.map(m => m._id)
      };

      const response = await fetch('https://profhack-backend-npqc.onrender.com/api/teams/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        alert('Team created successfully!');
        navigate('/teams');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create team');
      }
    } catch (error) {
      console.error('Error creating team:', error);
      setError(error.message || 'Failed to create team. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }, [teamData, validateTeamComposition, navigate]);

  // Auto-validate when members change
  useEffect(() => {
    if (currentStep === 2) {
      validateTeamComposition();
    }
  }, [currentStep, validateTeamComposition]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onBack={onBack} />
      
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 1 ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Basic Info</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 2 ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Add Members</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-500">
            <div className="flex items-center">
              <AlertCircle size={20} className="text-red-500 mr-3" />
              <div>
                <h3 className="text-sm font-bold text-red-800 uppercase tracking-wide">Error</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <RulesCard />
            
            <Card className="p-6">
              <div className="border-b-2 border-black mb-6 pb-3">
                <h2 className="text-xl font-black tracking-tight text-black uppercase">
                  Step 1: Basic Information
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold tracking-wider uppercase text-gray-600 mb-2">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    value={teamData.teamName}
                    onChange={(e) => handleInputChange('teamName', e.target.value)}
                    placeholder="Enter your team name"
                    className="w-full p-3 border-2 border-gray-300 focus:border-black focus:outline-none font-medium"
                    maxLength={50}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold tracking-wider uppercase text-gray-600 mb-2">
                    Team Description 
                  </label>
                  <textarea
                    value={teamData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your team's goals and expertise (optional)"
                    rows={4}
                    className="w-full p-3 border-2 border-gray-300 focus:border-black focus:outline-none font-medium resize-none"
                    maxLength={500}
                  />
                </div>

                {teamData.leader && (
                  <div>
                    <label className="block text-sm font-bold tracking-wider uppercase text-gray-600 mb-2">
                      Team Leader (You)
                    </label>
                    <div className="p-4 bg-blue-50 border-2 border-blue-500">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
                          {teamData.leader.name?.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-black">{teamData.leader.name}</h4>
                          <p className="text-xs text-gray-600">{teamData.leader.designation}</p>
                          <p className="text-xs text-gray-500">{teamData.leader.department}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={() => handleStepNavigation(2)}
                    disabled={!teamData.teamName.trim() || !teamData.description.trim()}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed border-2 border-black font-bold text-sm tracking-wide uppercase transition-all duration-200"
                  >
                    Next: Add Members
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Step 2: Add Members */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="border-b-2 border-black mb-6 pb-3">
                <h2 className="text-xl font-black tracking-tight text-black uppercase">
                  Step 2: Add Team Members
                </h2>
              </div>

              {/* Selected Members */}
              <div className="mb-6">
                <h3 className="text-sm font-bold tracking-wider uppercase text-gray-600 mb-3">
                  Selected Members ({[...teamData.members, ...(teamData.leader ? [teamData.leader] : [])].length}/5)
                </h3>
                
                {teamData.leader && (
                  <div className="mb-3">
                    <SelectedMember 
                      faculty={teamData.leader} 
                      onRemove={() => {}}
                      isLeader={true}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  {teamData.members.map(member => (
                    <SelectedMember 
                      key={member._id}
                      faculty={member} 
                      onRemove={handleMemberRemove}
                      isLeader={false}
                    />
                  ))}
                </div>

                {validationErrors.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {validationErrors.map((error, index) => (
                      <ValidationMessage key={index} message={error} type="error" />
                    ))}
                  </div>
                )}
              </div>

              {/* Faculty Selection */}
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-sm font-medium text-gray-600">Loading available faculty...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold tracking-wider uppercase text-gray-600 mb-4">
                    Available Faculty Members (Not in any team)
                  </h3>
                  
                  {/* Search Filter */}
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search faculty by name, department, or designation..."
                        className="w-full p-3 pl-10 border-2 border-gray-300 focus:border-black focus:outline-none font-medium"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Faculty List */}
                <div className="border-2 border-gray-300">
  <div className="p-4 bg-gray-100 font-bold text-sm uppercase tracking-wide">
    Available Faculty ({filteredFaculty.length})
  </div>
  
  <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
    {filteredFaculty.length === 0 ? (
      <p className="text-sm text-gray-500 italic text-center py-8">
        {searchTerm ? 'No faculty found matching your search' : 'No available faculty members (all are already in teams)'}
      </p>
    ) : (
      (() => {
        const categorized = categorizeFaculty(filteredFaculty);
        const categoryLabels = {
          foundation: 'Foundation Departments',
          structural: 'Structural Departments', 
          innovation: 'Innovation Departments',
          uncategorized: 'Other Departments'
        };
        
        return Object.entries(categorized).map(([category, faculty]) => {
          if (faculty.length === 0) return null;
          
          return (
            <div key={category} className="space-y-2">
              <div className="flex items-center gap-2 py-2 px-3 bg-blue-50 border-l-4 border-blue-500">
                <Briefcase size={16} className="text-blue-600" />
                <h4 className="font-bold text-sm text-blue-800 uppercase tracking-wide">
                  {categoryLabels[category]} ({faculty.length})
                </h4>
              </div>
              
              <div className="space-y-1 ml-4">
                {faculty.map(member => {
                  const { canSelect, reason } = canSelectFaculty(member);
                  const isSelected = teamData.members.some(m => m._id === member._id) || 
                                   (teamData.leader && teamData.leader._id === member._id);
                  
                  return (
                    <FacultyCard
                      key={member._id}
                      faculty={member}
                      isSelected={isSelected}
                      onSelect={handleMemberSelect}
                      isDisabled={!canSelect}
                      disabledReason={reason}
                    />
                  );
                })}
              </div>
            </div>
          );
        });
      })()
    )}
  </div>
</div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-100 border-2 border-black font-bold text-sm tracking-wide uppercase transition-all duration-200"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                
                <button
                  onClick={handleSubmit}
                  disabled={validationErrors.length > 0 || submitting}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed border-2 border-green-600 font-bold text-sm tracking-wide uppercase transition-all duration-200"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Users size={16} />
                      Create Team
                    </>
                  )}
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamFormation;