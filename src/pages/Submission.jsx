import React, { useState, useEffect } from 'react';
import { ChevronDown, Users, Target, Send, ArrowLeft, CheckCircle } from 'lucide-react';

const Submissions = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedTrack, setSelectedTrack] = useState('');
  const [description, setDescription] = useState('');
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Mock team data for demo
  const mockTeamData = {
    _id: 'team_123',
    teamName: 'Innovation Squad',
    leader: { name: 'John Doe' },
    members: [
      { name: 'John Doe' },
      { name: 'Jane Smith' },
      { name: 'Alex Johnson' },
      { name: 'Sarah Wilson' }
    ]
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simulate loading team data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTeamData(mockTeamData);
      setLoading(false);
    }, 1000);
  }, []);

  const tracks = [
    { 
      id: 'smart-campus', 
      name: 'Smart & Sustainable Campus',
      description: 'Develop innovative solutions for energy efficiency, waste management, and smart infrastructure on campus'
    },
    { 
      id: 'ai-social-impact', 
      name: 'AI & Data Science for Social Impact',
      description: 'Leverage artificial intelligence and data analytics to address social challenges and create positive community impact'
    },
    { 
      id: 'edtech', 
      name: 'Future of Engineering Education (EdTech)',
      description: 'Create cutting-edge educational technologies to transform how engineering is taught and learned'
    },
    { 
      id: 'healthcare', 
      name: 'Healthcare Engineering',
      description: 'Engineer innovative solutions for medical diagnostics, treatment, and healthcare delivery systems'
    },
    { 
      id: 'industry-4', 
      name: 'Industry 4.0 & Automation',
      description: 'Build smart manufacturing solutions, IoT integration, and automated systems for industrial applications'
    },
    { 
      id: 'greentech', 
      name: 'Climate Resilience & GreenTech',
      description: 'Develop sustainable technologies and solutions to combat climate change and environmental challenges'
    },
    { 
      id: 'disaster-management', 
      name: 'Disaster Management & Infrastructure',
      description: 'Create systems for disaster preparedness, response, and resilient infrastructure development'
    },
    { 
      id: 'assistive-tech', 
      name: 'Assistive Technologies for Disabilities',
      description: 'Design inclusive technologies that enhance accessibility and quality of life for people with disabilities'
    },
    { 
      id: 'smart-cities', 
      name: 'Smart Cities & Urban Mobility',
      description: 'Develop intelligent urban solutions for transportation, traffic management, and city planning'
    },
    { 
      id: 'open-innovation', 
      name: 'Open Innovation',
      description: 'Explore groundbreaking ideas and unconventional solutions that don\'t fit traditional categories'
    }
  ];

  const handleSubmit = async () => {
    if (!selectedTrack) {
      alert('Please select a track');
      return;
    }

    if (!teamData) {
      alert('Team data not available');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitSuccess(true);
      setIsSubmitting(false);
      setDescription('');
      setSelectedTrack('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 2000);
  };

  const handleBackToTeams = () => {
    console.log('Navigate back to teams');
  };

  const handleTrackSelect = (trackId) => {
    setSelectedTrack(trackId);
    setShowDropdown(false);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showDropdown]);

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading team data...</p>
        </div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-black mb-2">No Team Found</h2>
            <p className="text-gray-600">You need to be part of a team to make submissions.</p>
          </div>
          <button 
            onClick={handleBackToTeams}
            className="bg-black text-white px-6 py-3 font-bold tracking-wide uppercase hover:bg-gray-800 transition-colors"
          >
            Create or Join Team
          </button>
        </div>
      </div>
    );
  }

  const selectedTrackData = tracks.find(t => t.id === selectedTrack);

  return (
    <div className="min-h-screen bg-amber-50 relative">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="w-full h-full transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-pulse">
          <CheckCircle className="w-5 h-5" />
          Submission Successful!
        </div>
      )}

      <div className="relative z-10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={handleBackToTeams}
              className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Teams
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-sm md:text-base font-bold tracking-[0.4em] text-black uppercase mb-4">
              Project Submission
            </h2>
            <div className="w-20 h-0.5 bg-black mx-auto mb-8"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black leading-tight">
              SUBMIT
              <br />
              <span className="text-5xl md:text-6xl lg:text-7xl">PROJECT</span>
            </h1>
          </div>

          {/* Team Info Card */}
          <div className="mb-8">
            <div className="bg-white border-2 border-black p-6 relative shadow-lg">
              <div className="absolute -top-3 -left-3 w-12 h-12 bg-black text-white flex items-center justify-center font-black text-lg">
                <Users className="w-6 h-6" />
              </div>
              
              <div className="pt-4">
                <h3 className="text-xl font-black tracking-wide uppercase mb-4 text-black">
                  Team Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-black mb-2">Team Name:</p>
                    <p className="text-gray-700 font-medium text-lg">{teamData.teamName}</p>
                  </div>
                  
                  <div>
                    <p className="font-bold text-black mb-2">Team Leader:</p>
                    <p className="text-gray-700 font-medium text-lg">{teamData.leader.name}</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <p className="font-bold text-black mb-3">Team Members:</p>
                    <div className="flex flex-wrap gap-2">
                      {teamData.members.map((member, index) => (
                        <span key={index} className="bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded">
                          {member.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Track Selection */}
          <div className="mb-8">
            <div className="bg-white border-2 border-black p-6 relative shadow-lg">
              <div className="absolute -top-3 -left-3 w-12 h-12 bg-black text-white flex items-center justify-center font-black text-lg">
                <Target className="w-6 h-6" />
              </div>
              
              <div className="pt-4">
                <h3 className="text-xl font-black tracking-wide uppercase mb-4 text-black">
                  Select Track
                </h3>
                
                <div className="dropdown-container relative">
                  <button
                    type="button"
                    onClick={handleDropdownToggle}
                    className="w-full bg-white border-2 border-black p-4 text-left font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between relative z-10"
                  >
                    <span className="text-base">
                      {selectedTrack ? tracks.find(t => t.id === selectedTrack)?.name : 'Choose your innovation track...'}
                    </span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute top-full left-0 right-0 bg-white border-2 border-black border-t-0 z-50 max-h-80 overflow-y-auto shadow-2xl">
                      {tracks.map((track) => (
                        <button
                          key={track.id}
                          type="button"
                          onClick={() => handleTrackSelect(track.id)}
                          className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0 block"
                        >
                          <div className="font-bold text-black text-base mb-1">{track.name}</div>
                          <div className="text-sm text-gray-600">{track.description}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Track Description */}
                {selectedTrackData && (
                  <div className="mt-4 p-4 bg-gray-50 border-l-4 border-black">
                    <h4 className="font-bold text-black mb-2 text-lg">{selectedTrackData.name}</h4>
                    <p className="text-gray-700">{selectedTrackData.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-10">
            <div className="bg-white border-2 border-black p-6 relative shadow-lg">
              <div className="absolute -top-3 -left-3 w-12 h-12 bg-black text-white flex items-center justify-center font-black text-lg">
                02
              </div>
              
              <div className="pt-4">
                <h3 className="text-xl font-black tracking-wide uppercase mb-4 text-black">
                  Description (Optional)
                </h3>
                
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="w-full border-2 border-black p-4 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 resize-none text-base"
                  placeholder="Add any additional details about your project submission..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mb-12">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-black text-white px-12 py-4 font-black text-lg tracking-wide uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3 shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Project
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-600 font-medium">
              <div className="w-10 h-px bg-gray-400"></div>
              <span className="tracking-wider uppercase">Innovation Through Collaboration</span>
              <div className="w-10 h-px bg-gray-400"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Submissions;