import React, { useState, useEffect } from 'react';
import { ChevronDown, Users, Target, Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Submissions = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedTrack, setSelectedTrack] = useState('');
  const [description, setDescription] = useState('');
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Backend base URL
  const BACKEND_URL = 'https://profhack-backend-npqc.onrender.com';

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

  // Fetch team data on component mount
  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No authentication token found');
        setLoading(false);
        return;
      }

      const response = await fetch(`${BACKEND_URL}/api/teams/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTeamData(data);
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch team data:', errorData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching team data:', error);
    } finally {
      setLoading(false);
    }
  };

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
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Authentication token not found. Please login again.');
        setIsSubmitting(false);
        return;
      }

      const payload = {
        trackId: selectedTrack,
        teamId: teamData._id,
        description: description.trim()
      };

      const response = await fetch(`${BACKEND_URL}/api/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        alert('Submission successful!');
        setDescription('');
        setSelectedTrack('');
        console.log('Submission result:', result);
        
        // Route to /teams after successful submission
        navigate('/teams');
      } else {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred during submission. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToTeams = () => {
    navigate('/teams');
  };

  const handleTrackSelect = (trackId) => {
    setSelectedTrack(trackId);
    setShowDropdown(false);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-base font-medium text-gray-700">Loading team data...</p>
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
    <div className="min-h-screen bg-amber-50 relative overflow-hidden">
      {/* Subtle Grid Background */}
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

      {/* Backdrop for closing dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}

      <div className="relative z-10 pt-16 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Back Button */}
          <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
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
            <div className="mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-base md:text-lg font-bold tracking-[0.4em] text-black uppercase mb-4">
                Project Submission
              </h2>
              <div className="w-20 h-0.5 bg-black mx-auto"></div>
            </div>

            <div className="mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black leading-[0.9] mb-6">
                SUBMIT
                <br />
                <span className="text-5xl md:text-6xl lg:text-7xl">PROJECT</span>
              </h1>
            </div>
          </div>

          {/* Team Info Card */}
          <div className="mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white border-2 border-black p-5 relative">
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-black text-white flex items-center justify-center font-black text-base">
                <Users className="w-5 h-5" />
              </div>
              
              <div className="pt-3">
                <h3 className="text-lg font-black tracking-wide uppercase mb-3 text-black">
                  Team Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="font-bold text-black mb-1">Team Name:</p>
                    <p className="text-gray-700 font-medium">{teamData.teamName}</p>
                  </div>
                  
                  <div>
                    <p className="font-bold text-black mb-1">Team Leader:</p>
                    <p className="text-gray-700 font-medium">{teamData.leader.name}</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <p className="font-bold text-black mb-2">Team Members:</p>
                    <div className="flex flex-wrap gap-2">
                      {teamData.members.map((member, index) => (
                        <span key={index} className="bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 border">
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
          <div className="mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="bg-white border-2 border-black p-5 relative">
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-black text-white flex items-center justify-center font-black text-base">
                <Target className="w-5 h-5" />
              </div>
              
              <div className="pt-3">
                <h3 className="text-lg font-black tracking-wide uppercase mb-3 text-black">
                  Select Track
                </h3>
                
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleDropdownToggle}
                    className="w-full bg-white border-2 border-black p-3 text-left font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <span>
                      {selectedTrack ? tracks.find(t => t.id === selectedTrack)?.name : 'Choose your innovation track...'}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute top-full left-0 right-0 bg-white border-2 border-black border-t-0 z-50 max-h-80 overflow-y-auto shadow-2xl">
                      {tracks.map((track) => (
                        <button
                          key={track.id}
                          type="button"
                          onClick={() => handleTrackSelect(track.id)}
                          className="w-full p-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0 font-medium text-gray-700 block"
                        >
                          <div className="font-semibold text-black">{track.name}</div>
                          <div className="text-sm text-gray-600 mt-1">{track.description}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Track Description */}
                {selectedTrackData && (
                  <div className="mt-4 p-3 bg-gray-50 border-l-4 border-black">
                    <h4 className="font-bold text-black mb-1">{selectedTrackData.name}</h4>
                    <p className="text-sm text-gray-700">{selectedTrackData.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Optional Description */}
          <div className="mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="bg-white border-2 border-black p-5 relative">
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-black text-white flex items-center justify-center font-black text-base">
                02
              </div>
              
              <div className="pt-3">
                <h3 className="text-lg font-black tracking-wide uppercase mb-3 text-black">
                  Description (Optional)
                </h3>
                
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full border-2 border-black p-3 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 resize-none"
                  placeholder="Add any additional details about your project submission..."
                />
              </div>
            </div>
          </div>

          <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-black text-white px-10 py-3 font-black text-base tracking-wide uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </>

              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Project
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-600 font-medium">
              <div className="w-10 h-px bg-gray-400"></div>
              <span className="tracking-wider uppercase">Innovation Through Collaboration</span>
              <div className="w-10 h-px bg-gray-400"></div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        /* Custom scrollbar for dropdown */
        .max-h-80::-webkit-scrollbar {
          width: 8px;
        }
        
        .max-h-80::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .max-h-80::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        
        .max-h-80::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default Submissions;