import React, { useState, useEffect } from 'react';
import { ChevronDown, Users, Target, Send } from 'lucide-react';

const Submissions = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedTrack, setSelectedTrack] = useState('');
  const [description, setDescription] = useState('');
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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
      const response = await fetch('/api/teams/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTeamData(data);
      } else {
        console.error('Failed to fetch team data');
      }
    } catch (error) {
      console.error('Error fetching team data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tracks = [
    { id: 'smart-campus', name: 'Smart & Sustainable Campus' },
    { id: 'ai-social-impact', name: 'AI & Data Science for Social Impact' },
    { id: 'edtech', name: 'Future of Engineering Education (EdTech)' },
    { id: 'healthcare', name: 'Healthcare Engineering' },
    { id: 'industry-4', name: 'Industry 4.0 & Automation' },
    { id: 'greentech', name: 'Climate Resilience & GreenTech' },
    { id: 'disaster-management', name: 'Disaster Management & Infrastructure' },
    { id: 'assistive-tech', name: 'Assistive Technologies for Disabilities' },
    { id: 'smart-cities', name: 'Smart Cities & Urban Mobility' },
    { id: 'open-innovation', name: 'Open Innovation' }
  ];

  const handleSubmit = async () => {
    if (!selectedTrack) {
      alert('Please select a track');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const payload = {
        trackId: selectedTrack,
        teamId: teamData._id,
        description: description.trim()
      };

      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Submission successful!');
        setDescription('');
        setSelectedTrack('');
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div className="mb-8">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">No Team Found</h2>
            <p className="text-gray-600">You need to be part of a team to make submissions.</p>
          </div>
          <button 
            onClick={() => window.location.href = '/teams'} 
            className="bg-black text-white px-6 py-3 font-bold tracking-wide uppercase hover:bg-gray-800 transition-colors"
          >
            Create or Join Team
          </button>
        </div>
      </div>
    );
  }

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
            backgroundSize: '80px 80px',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
      </div>

      <div className="relative z-10 pt-20 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-lg md:text-xl font-bold tracking-[0.4em] text-black uppercase mb-6">
                Project Submission
              </h2>
              <div className="w-24 h-0.5 bg-black mx-auto"></div>
            </div>

            <div className="mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-black leading-[0.9] mb-8">
                SUBMIT
                <br />
                <span className="text-6xl md:text-8xl lg:text-9xl">PROJECT</span>
              </h1>
            </div>
          </div>

          {/* Team Info Card */}
          <div className="mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="bg-white border-2 border-black p-6 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white flex items-center justify-center font-black text-lg">
                <Users className="w-6 h-6" />
              </div>
              
              <div className="pt-4">
                <h3 className="text-xl font-black tracking-wide uppercase mb-4 text-black">
                  Team Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-black mb-2">Team Name:</p>
                    <p className="text-gray-700 font-medium">{teamData.teamName}</p>
                  </div>
                  
                  <div>
                    <p className="font-bold text-black mb-2">Team Leader:</p>
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
          <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="bg-white border-2 border-black p-6 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white flex items-center justify-center font-black text-lg">
                <Target className="w-6 h-6" />
              </div>
              
              <div className="pt-4">
                <h3 className="text-xl font-black tracking-wide uppercase mb-4 text-black">
                  Select Track
                </h3>
                
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-full bg-white border-2 border-black p-4 text-left font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <span>
                      {selectedTrack ? tracks.find(t => t.id === selectedTrack)?.name : 'Choose your innovation track...'}
                    </span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute top-full left-0 right-0 bg-white border-2 border-black border-t-0 z-10 max-h-60 overflow-y-auto">
                      {tracks.map((track) => (
                        <button
                          key={track.id}
                          type="button"
                          onClick={() => {
                            setSelectedTrack(track.id);
                            setShowDropdown(false);
                          }}
                          className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0 font-medium text-gray-700"
                        >
                          {track.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Optional Description */}
          <div className="mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <div className="bg-white border-2 border-black p-6 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white flex items-center justify-center font-black text-lg">
                02
              </div>
              
              <div className="pt-4">
                <h3 className="text-xl font-black tracking-wide uppercase mb-4 text-black">
                  Description (Optional)
                </h3>
                
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full border-2 border-black p-4 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 resize-none"
                  placeholder="Add any additional details about your project submission..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-black text-white px-12 py-4 font-black text-lg tracking-wide uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3"
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
          <div className="text-center mt-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '1.3s' }}>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600 font-medium">
              <div className="w-12 h-px bg-gray-400"></div>
              <span className="tracking-wider uppercase">Innovation Through Collaboration</span>
              <div className="w-12 h-px bg-gray-400"></div>
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
      `}</style>
    </div>
  );
};

export default Submissions;