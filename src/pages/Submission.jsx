import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, Users, Target, Lightbulb, FileText, CheckCircle, AlertCircle, Crown } from 'lucide-react';

const Card = React.memo(({ children, className = "" }) => (
  <div className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
    {children}
  </div>
));

const MemberCard = ({ member, isLeader, isCompact = true }) => (
  <div className={`flex items-center gap-3 p-2 rounded-lg border border-gray-100 bg-gray-50`}>
    <div className={`relative ${isCompact ? 'w-8 h-8' : 'w-10 h-10'} rounded-full flex items-center justify-center text-sm font-bold ${
      isLeader 
        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white' 
        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
    }`}>
      {isLeader ? <Crown size={isCompact ? 14 : 16} /> : member.name.charAt(0)}
    </div>
    
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <p className={`text-sm font-semibold truncate text-gray-900`}>
          {member.name}
        </p>
        {isLeader && (
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
            Leader
          </span>
        )}
      </div>
      <p className="text-xs text-gray-600 truncate">{member.department}</p>
    </div>
  </div>
);

const TrackCard = ({ track, isSelected, onSelect }) => (
  <div 
    className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${
      isSelected 
        ? 'border-blue-500 bg-blue-50 shadow-md' 
        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
    }`}
    onClick={() => onSelect(track)}
  >
    <div className="flex items-start justify-between mb-2">
      <h3 className={`font-semibold text-lg ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
        {track.name}
      </h3>
      {isSelected && (
        <CheckCircle className="text-blue-500" size={20} />
      )}
    </div>
    <p className="text-sm text-gray-600 mb-3">{track.description}</p>
    <div className="flex flex-wrap gap-2">
      {track.keywords && track.keywords.map((keyword, index) => (
        <span 
          key={index} 
          className={`text-xs px-2 py-1 rounded-full ${
            isSelected 
              ? 'bg-blue-200 text-blue-700' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {keyword}
        </span>
      ))}
    </div>
  </div>
);

const Submissions = ({ onBack }) => {
  const [userTeam, setUserTeam] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    problemStatement: '',
    proposedSolution: '',
    technicalApproach: '',
    expectedOutcome: '',
    additionalNotes: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUserTeam();
    fetchTracks();
  }, []);

  const fetchUserTeam = async () => {
    try {
      const response = await fetch('/api/teams/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserTeam(data);
      } else {
        throw new Error('Failed to fetch team data');
      }
    } catch (error) {
      console.error('Error fetching team:', error);
      setError('Failed to load team information');
    }
  };

  const fetchTracks = async () => {
    try {
      const response = await fetch('/api/tracks');
      if (response.ok) {
        const data = await response.json();
        setTracks(data);
      } else {
        throw new Error('Failed to fetch tracks');
      }
    } catch (error) {
      console.error('Error fetching tracks:', error);
      setError('Failed to load tracks');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedTrack) {
      setError('Please select a track for your submission');
      return;
    }

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const submissionData = {
        ...formData,
        trackId: selectedTrack._id,
        teamId: userTeam._id
      };

      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        setSuccess('Submission created successfully!');
        setTimeout(() => {
          onBack();
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create submission');
      }
    } catch (error) {
      console.error('Error creating submission:', error);
      setError(error.message || 'Failed to create submission');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!userTeam) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Team Found</h2>
          <p className="text-gray-600 mb-6">You need to be part of a team to submit an idea.</p>
          <button
            onClick={onBack}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Teams
          </button>
        </div>
      </div>
    );
  }

  const allMembers = [userTeam.leader, ...userTeam.members];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-1 h-8 bg-purple-500 rounded-full"></div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Submit Team Idea</h1>
            <p className="text-gray-600 text-sm">Share your innovative solution with the world</p>
          </div>
        </div>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="text-red-500" size={16} />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={16} />
            <span className="text-green-700 text-sm">{success}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Team & Track Selection */}
        <div className="lg:col-span-1 space-y-6">
          {/* Team Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users size={20} />
              Your Team
            </h3>
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">{userTeam.teamName}</h4>
              <p className="text-sm text-gray-600 mb-3">{userTeam.description}</p>
            </div>
            <div className="space-y-2">
              {allMembers.map(member => (
                <MemberCard 
                  key={member._id}
                  member={member} 
                  isLeader={member._id === userTeam.leader._id}
                />
              ))}
            </div>
          </Card>

          {/* Track Selection */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target size={20} />
              Select Track *
            </h3>
            <div className="space-y-3">
              {tracks.map(track => (
                <TrackCard
                  key={track._id}
                  track={track}
                  isSelected={selectedTrack?._id === track._id}
                  onSelect={setSelectedTrack}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Submission Form */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Lightbulb size={20} />
              Idea Details
            </h3>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your project title"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Provide a brief overview of your project"
                  required
                />
              </div>

              {/* Problem Statement */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Problem Statement
                </label>
                <textarea
                  name="problemStatement"
                  value={formData.problemStatement}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="What problem are you solving?"
                />
              </div>

              {/* Proposed Solution */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proposed Solution
                </label>
                <textarea
                  name="proposedSolution"
                  value={formData.proposedSolution}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="How will you solve this problem?"
                />
              </div>

              {/* Technical Approach */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technical Approach
                </label>
                <textarea
                  name="technicalApproach"
                  value={formData.technicalApproach}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="What technologies and methods will you use?"
                />
              </div>

              {/* Expected Outcome */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Outcome
                </label>
                <textarea
                  name="expectedOutcome"
                  value={formData.expectedOutcome}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="What do you expect to achieve?"
                />
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Any additional information you'd like to share"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white hover:bg-purple-700 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Idea
                  </>
                )}
              </button>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default Submissions;