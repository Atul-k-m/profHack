import React, { useState, useEffect } from 'react';
import { Upload, FileText, Send, CheckCircle, AlertCircle, Users, Calendar, Target } from 'lucide-react';

const PPTSubmission = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [teamData, setTeamData] = useState(null);
  const [submissionData, setSubmissionData] = useState({
    selectedTrack: '',
    ideaBrief: '',
    pptFile: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const tracks = [
    "Smart & Sustainable Campus",
    "AI & Data Science for Social Impact", 
    "Future of Engineering Education (EdTech)",
    "Healthcare Engineering",
    "Industry 4.0 & Automation",
    "Climate Resilience & GreenTech",
    "Disaster Management & Infrastructure",
    "Assistive Technologies for Disabilities",
    "Smart Cities & Urban Mobility",
    "Open Innovation"
  ];

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

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      const response = await fetch('/api/team/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTeamData(data);
      } else {
        setErrors({ team: 'No team found. Please create or join a team first.' });
      }
    } catch (error) {
      setErrors({ team: 'Error fetching team data' });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        setErrors({ ...errors, file: 'Please upload a PDF file (.pdf)' });
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors({ ...errors, file: 'File size must be less than 10MB' });
        return;
      }

      setSubmissionData({ ...submissionData, pptFile: file });
      setErrors({ ...errors, file: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!submissionData.selectedTrack) {
      newErrors.track = 'Please select a competition track';
    }
    
    if (!submissionData.ideaBrief.trim()) {
      newErrors.ideaBrief = 'Please provide an idea brief';
    } else if (submissionData.ideaBrief.length < 50) {
      newErrors.ideaBrief = 'Idea brief must be at least 50 characters long';
    }
    
    if (!submissionData.pptFile) {
      newErrors.file = 'Please upload a PDF presentation';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData();
      formData.append('selectedTrack', submissionData.selectedTrack);
      formData.append('ideaBrief', submissionData.ideaBrief);
      formData.append('pptFile', submissionData.pptFile);

      const response = await fetch('/api/submissions/ppt', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmissionData({
          selectedTrack: '',
          ideaBrief: '',
          pptFile: null
        });
        // Reset file input
        const fileInput = document.getElementById('ppt-file');
        if (fileInput) fileInput.value = '';
      } else {
        setSubmitStatus('error');
        setErrors({ submit: result.message || 'Submission failed' });
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTeamMembers = (team) => {
    if (!team) return '';
    const allMembers = [
      { name: team.leader.name, department: team.leader.department, role: 'Leader' },
      ...team.members.map(member => ({ 
        name: member.name, 
        department: member.department, 
        role: 'Member' 
      }))
    ];
    return allMembers;
  };

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
        <div className="max-w-6xl mx-auto">
          
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
                SUBMIT YOUR
                <br />
                <span className="text-6xl md:text-8xl lg:text-9xl">PDF</span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Team Info Card */}
            <div className="xl:col-span-1 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="bg-white border-2 border-black p-6 mb-6">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 mr-3" />
                  <h3 className="text-xl font-black uppercase tracking-wide">Team Information</h3>
                </div>
                
                {teamData ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-lg mb-2">{teamData.teamName}</h4>
                      <p className="text-gray-600 text-sm">{teamData.description}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-bold mb-2">Team Members:</h5>
                      <div className="space-y-2">
                        {formatTeamMembers(teamData).map((member, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="font-medium">{member.name}</span>
                            <span className="text-gray-600">{member.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-red-600 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {errors.team || 'Loading team data...'}
                  </div>
                )}
              </div>

              {/* Submission Guidelines */}
              <div className="bg-black text-white p-6">
                <h3 className="text-lg font-black uppercase tracking-wide mb-4">Submission Guidelines</h3>
                <ul className="space-y-2 text-sm">
                  <li>• PDF format (.pdf)</li>
                  <li>• Maximum file size: 10MB</li>
                  <li>• Include team name in filename</li>
                  <li>• Minimum 50 characters for idea brief</li>
                  <li>• One submission per team</li>
                </ul>
              </div>
            </div>

            {/* Submission Form */}
            <div className="xl:col-span-2 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <form onSubmit={handleSubmit} className="bg-white border-2 border-black p-8">
                <div className="flex items-center mb-6">
                  <FileText className="w-6 h-6 mr-3" />
                  <h3 className="text-xl font-black uppercase tracking-wide">Project Submission Form</h3>
                </div>

                {/* Track Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                    Competition Track *
                  </label>
                  <select
                    value={submissionData.selectedTrack}
                    onChange={(e) => setSubmissionData({...submissionData, selectedTrack: e.target.value})}
                    className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">Select your competition track</option>
                    {tracks.map((track, index) => (
                      <option key={index} value={track}>{track}</option>
                    ))}
                  </select>
                  {errors.track && <p className="text-red-600 text-sm mt-1">{errors.track}</p>}
                </div>

                {/* Idea Brief */}
                <div className="mb-6">
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                    Idea Brief *
                  </label>
                  <textarea
                    value={submissionData.ideaBrief}
                    onChange={(e) => setSubmissionData({...submissionData, ideaBrief: e.target.value})}
                    placeholder="Describe your project idea, approach, and expected impact..."
                    className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black h-32 resize-none"
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.ideaBrief && <p className="text-red-600 text-sm">{errors.ideaBrief}</p>}
                    <p className="text-gray-500 text-sm">{submissionData.ideaBrief.length}/500</p>
                  </div>
                </div>

                {/* File Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                    Upload PDF Presentation *
                  </label>
                  <div className="border-2 border-dashed border-black p-8 text-center">
                    <input
                      id="pdf-file"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="pdf-file" className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-bold mb-2">
                        {submissionData.pptFile ? submissionData.pptFile.name : 'Click to upload PDF'}
                      </p>
                      <p className="text-gray-600 text-sm">
                        PDF format, max 10MB
                      </p>
                    </label>
                  </div>
                  {errors.file && <p className="text-red-600 text-sm mt-1">{errors.file}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting || !teamData}
                    className="bg-black text-white px-8 py-3 font-bold uppercase tracking-wide hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Project
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center text-green-600 font-bold">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Submission Successful!
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="flex items-center text-red-600 font-bold">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      {errors.submit || 'Submission Failed'}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600 font-medium">
              <div className="w-12 h-px bg-gray-400"></div>
              <span className="tracking-wider uppercase">Secure Submission Portal</span>
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

export default PPTSubmission;