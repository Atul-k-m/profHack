import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowLeft, Users, ChevronDown, ChevronRight,Search, User, CheckCircle2, X, Plus, AlertCircle, Target, Briefcase } from 'lucide-react';
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
    // Keep abbreviations as fallback
    'CSE', 'ISE', 'AI&ML', 'CSBS'
  ]
};

const Navbar = React.memo(({ onBack }) => (
  <nav className="bg-white border-b-2 border-black sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <button
            onClick={onBack}
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
));

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
        <p className="text-sm font-medium text-gray-700">All members must be from <strong>different departments</strong></p>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 bg-black text-white flex items-center justify-center text-xs font-bold rounded-full flex-shrink-0 mt-0.5">3</div>
        <div className="text-sm font-medium text-gray-700">
          <p className="mb-1">Group constraints:</p>
          <ul className="ml-4 space-y-1 text-xs">
            <li>• Max <strong>3 from innovation group</strong> (CSE, ISE, AI&ML, CSBS, MCA)</li>
            <li>• Max <strong>2 from foundation group</strong> (Mechanical, Civil, EEE, ECE, ETC)</li>
            <li>• Max <strong>1 from foundation group</strong> (Physics, Chemistry, Mathematics, MBA, HSS)</li>
          </ul>
        </div>
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
  const [expandedGroups, setExpandedGroups] = useState({
    foundation: false,
    structural: false,
    innovation: false
  });
  const [validationErrors, setValidationErrors] = useState([]);

  // Fetch current user profile for leader info
  useEffect(() => {
    const fetchLeaderProfile = async () => {
      try {
        const token = window.authToken || localStorage.getItem('authToken') || localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('https://profhack-backend.onrender.com/api/user/profile', {
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
const getFilteredGroupedFaculty = () => {
  if (!searchTerm.trim()) {
    return groupedFaculty;
  }
  
  const filteredGroups = {};
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  Object.entries(groupedFaculty).forEach(([groupKey, facultyList]) => {
    const filteredFaculty = facultyList.filter(faculty => 
      faculty.name?.toLowerCase().includes(lowerSearchTerm) ||
      faculty.department?.toLowerCase().includes(lowerSearchTerm) ||
      faculty.designation?.toLowerCase().includes(lowerSearchTerm)
    );
    
    if (filteredFaculty.length > 0) {
      filteredGroups[groupKey] = filteredFaculty;
    }
  });
  
  return filteredGroups;
};
  // Fetch all faculty for member selection
 const fetchAllFaculty = useCallback(async () => {
  try {
    setLoading(true);
    const token = window.authToken || localStorage.getItem('authToken') || localStorage.getItem('token');
    
    // Try multiple possible endpoints
    let response;
    try {
      // First try the teams endpoint
      response = await fetch('https://profhack-backend.onrender.com/api/teams/faculty/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      // Fallback to faculty endpoint if teams endpoint doesn't exist
      response = await fetch('https://profhack-backend.onrender.com/api/faculty/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    }

    if (response.ok) {
      const facultyData = await response.json();
      console.log('Fetched faculty data:', facultyData); // Debug log
      setAllFaculty(facultyData);
    } else {
      const errorText = await response.text();
      console.error('Failed to fetch faculty:', response.status, errorText);
      throw new Error(`Failed to fetch faculty: ${response.status}`);
    }
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

  // Group faculty by department groups
  const groupedFaculty = useMemo(() => {
  const grouped = { foundation: [], structural: [], innovation: [] };
  
  console.log('All faculty for grouping:', allFaculty); // Debug log
  
  allFaculty.forEach(faculty => {
    const dept = faculty.department;
    console.log('Processing faculty:', faculty.name, 'Department:', dept); // Debug log
    
    if (DEPARTMENTS.foundation.some(foundationDept => 
      foundationDept.toLowerCase() === dept?.toLowerCase() || 
      dept?.toLowerCase().includes(foundationDept.toLowerCase())
    )) {
      grouped.foundation.push(faculty);
      console.log('Added to foundation:', faculty.name);
    } else if (DEPARTMENTS.structural.some(engDept => 
      engDept.toLowerCase() === dept?.toLowerCase() || 
      dept?.toLowerCase().includes(engDept.toLowerCase()) ||
      (engDept === 'Electrical & Electronics Engineering' && dept?.includes('EEE')) ||
      (engDept === 'Electronics & Communication Engineering' && dept?.includes('ECE'))
    )) {
      grouped.structural.push(faculty);
      console.log('Added to structural:', faculty.name);
    } else if (DEPARTMENTS.innovation.some(innovationDept => 
      innovationDept.toLowerCase() === dept?.toLowerCase() || 
      dept?.toLowerCase().includes(innovationDept.toLowerCase()) ||
      (innovationDept === 'Computer Science & Engineering' && dept?.includes('innovation')) ||
      (innovationDept === 'Information Science & Engineering' && dept?.includes('ISE'))
    )) {
      grouped.innovation.push(faculty);
      console.log('Added to innovation:', faculty.name);
    } else {
      console.log('Department not matched:', dept);
    }
  });
  
  console.log('Grouped faculty:', grouped); // Debug log
  return grouped;
}, [allFaculty]);
  // Validation logic
  const validateTeamComposition = useCallback(() => {
    const errors = [];
    const selectedMembers = [...teamData.members];
    if (teamData.leader) selectedMembers.push(teamData.leader);

    // Check total count
    if (selectedMembers.length !== 5) {
      errors.push(`Team must have exactly 5 members (currently ${selectedMembers.length})`);
    }

    // Check unique departments
    const departments = selectedMembers.map(m => m.department);
    const uniqueDepartments = new Set(departments);
    if (uniqueDepartments.size !== departments.length) {
      errors.push('All team members must be from different departments');
    }

    // Check group constraints
    const innovationCount = selectedMembers.filter(m => DEPARTMENTS.innovation.includes(m.department)).length;
    const structuralCount = selectedMembers.filter(m => DEPARTMENTS.structural.includes(m.department)).length;
    const foundationCount = selectedMembers.filter(m => DEPARTMENTS.foundation.includes(m.department)).length;

    if (innovationCount > 2) errors.push(`Too many innovation group members (${innovationCount}/2 max)`);
    if (structuralCount > 2) errors.push(`Too many structural group members (${structuralCount}/2 max)`);
    if (foundationCount > 1) errors.push(`Too many foundation group members (${foundationCount}/1 max)`);

    setValidationErrors(errors);
    return errors.length === 0;
  }, [teamData.members, teamData.leader]);

  // Check if faculty can be selected
  const canSelectFaculty = useCallback((faculty) => {
    if (!teamData.leader) return { canSelect: false, reason: 'Leader not set' };
    
    const currentMembers = [...teamData.members, teamData.leader];
    
    // Check if already selected
    if (currentMembers.some(m => m._id === faculty._id)) {
      return { canSelect: false, reason: 'Already selected' };
    }

    // Check if would exceed 5 members
    if (currentMembers.length >= 5) {
      return { canSelect: false, reason: 'Team is full (5 members max)' };
    }

    // Check department uniqueness
    if (currentMembers.some(m => m.department === faculty.department)) {
      return { canSelect: false, reason: 'Department already represented' };
    }

    // Check group constraints
    const testMembers = [...currentMembers, faculty];
    const innovationCount = testMembers.filter(m => DEPARTMENTS.innovation.includes(m.department)).length;
    const structuralCount = testMembers.filter(m => DEPARTMENTS.structural.includes(m.department)).length;
    const foundationCount = testMembers.filter(m => DEPARTMENTS.foundation.includes(m.department)).length;

    if (DEPARTMENTS.innovation.includes(faculty.department) && innovationCount > 2) {
      return { canSelect: false, reason: 'innovation group limit reached (2 max)' };
    }
    if (DEPARTMENTS.structural.includes(faculty.department) && structuralCount > 2) {
      return { canSelect: false, reason: 'structural group limit reached (2 max)' };
    }
    if (DEPARTMENTS.foundation.includes(faculty.department) && foundationCount > 1) {
      return { canSelect: false, reason: 'foundation group limit reached (1 max)' };
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

  const toggleGroup = useCallback((group) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
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

      const response = await fetch('https://profhack-backend.onrender.com/api/teams/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        // Success - redirect back or show success message
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
  }, [teamData, validateTeamComposition, onBack]);

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

                {/* Validation Messages */}
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
                  <p className="text-sm font-medium text-gray-600">Loading faculty...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold tracking-wider uppercase text-gray-600 mb-4">
                    Select Faculty Members
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
                  
                  {Object.entries(getFilteredGroupedFaculty()).map(([groupKey, facultyList]) => {
                    const groupDisplayNames = {
                      'foundation': 'Foundation Layer',
                      'foundation': 'foundation Layer',
                      'innovation': 'Innovation Layer (Computer Science & Technology)'
                    };
                    
                    const displayName = groupDisplayNames[groupKey] || groupKey.toUpperCase();
                    
                    return (
                      <div key={groupKey} className="border-2 border-gray-300">
                        <button
                          onClick={() => toggleGroup(groupKey)}
                          className="w-full p-4 bg-gray-100 hover:bg-gray-200 flex items-center justify-between font-bold text-sm uppercase tracking-wide transition-colors"
                        >
                          <span>
                            {displayName} ({facultyList.length} faculty)
                          </span>
                          {expandedGroups[groupKey] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                        </button>
                        
                        {expandedGroups[groupKey] && (
                          <div className="p-4 space-y-2 max-h-60 overflow-y-auto">
                            {facultyList.length === 0 ? (
                              <p className="text-sm text-gray-500 italic text-center py-4">
                                No faculty found matching your search
                              </p>
                            ) : (
                              facultyList.map(faculty => {
                                const { canSelect, reason } = canSelectFaculty(faculty);
                                const isSelected = teamData.members.some(m => m._id === faculty._id) || 
                                                 (teamData.leader && teamData.leader._id === faculty._id);
                                
                                return (
                                  <FacultyCard
                                    key={faculty._id}
                                    faculty={faculty}
                                    isSelected={isSelected}
                                    onSelect={handleMemberSelect}
                                    isDisabled={!canSelect}
                                    disabledReason={reason}
                                  />
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {Object.keys(getFilteredGroupedFaculty()).length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-sm text-gray-500">No faculty found matching your search criteria</p>
                    </div>
                  )}
                </div>
              )}
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