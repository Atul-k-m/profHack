import React, { useState, useEffect } from 'react';
import { Linkedin, Twitter, Mail, Github, Instagram } from 'lucide-react';

const Organizers = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const organizers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Event Director",
      department: "Computer Science",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      socials: {
        linkedin: "#",
        twitter: "#",
        email: "sarah.johnson@university.edu",
        github: "#"
      }
    },
    {
      name: "Prof. Michael Chen",
      role: "Technical Lead",
      department: "Engineering",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      socials: {
        linkedin: "#",
        email: "michael.chen@university.edu",
        github: "#",
        twitter: "#"
      }
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Innovation Coordinator",
      department: "Research & Development",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      socials: {
        linkedin: "#",
        email: "emily.rodriguez@university.edu",
        instagram: "#",
        twitter: "#"
      }
    },
    {
      name: "Prof. David Kumar",
      role: "Academic Advisor",
      department: "Information Technology",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      socials: {
        linkedin: "#",
        email: "david.kumar@university.edu",
        github: "#",
        twitter: "#"
      }
    },
    {
      name: "Dr. Lisa Thompson",
      role: "Program Manager",
      department: "Business Administration",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      socials: {
        linkedin: "#",
        email: "lisa.thompson@university.edu",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      name: "Prof. Alex Patel",
      role: "Evaluation Committee",
      department: "Mathematics",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      socials: {
        linkedin: "#",
        email: "alex.patel@university.edu",
        github: "#",
        twitter: "#"
      }
    }
  ];

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin size={16} />;
      case 'twitter':
        return <Twitter size={16} />;
      case 'email':
        return <Mail size={16} />;
      case 'github':
        return <Github size={16} />;
      case 'instagram':
        return <Instagram size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 relative overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="w-full h-full transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 pt-8 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-24 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16 md:mb-24">
            <div className="mb-6 sm:mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-[0.2em] sm:tracking-[0.4em] text-black uppercase mb-4 sm:mb-6">
                Meet The Team
              </h2>
              <div className="w-16 sm:w-20 md:w-24 h-0.5 bg-black mx-auto"></div>
            </div>

          

            <div className="mb-8 sm:mb-12 md:mb-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-medium tracking-wide max-w-4xl mx-auto leading-relaxed px-2 sm:px-0">
                Meet the dedicated team of academic leaders and innovators who bring 
                <span className="font-bold text-black"> ReeBooT to life</span>. Our organizers combine 
                years of research experience with a passion for 
                <span className="font-bold text-black"> fostering excellence</span> in faculty development.
              </p>
            </div>
          </div>

          {/* Organizers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20">
            {organizers.map((organizer, index) => (
              <div
                key={index}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${0.7 + index * 0.15}s` }}
              >
                <div className="group relative">
                  {/* Main Image Container */}
                  <div className="relative">
                    <div className="w-full aspect-square bg-white border-2 border-black overflow-hidden">
                      <img
                        src={organizer.image}
                        alt={organizer.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    
                    {/* Overlapping Card */}
                    <div className="absolute -bottom-4 -right-4 bg-white border-2 border-black p-4 min-w-[200px] transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300">
                      <div className="mb-3">
                        <h3 className="text-lg font-black tracking-wide uppercase text-black leading-tight mb-1">
                          {organizer.name}
                        </h3>
                        <p className="text-sm font-bold text-gray-700 mb-1">
                          {organizer.role}
                        </p>
                        <p className="text-xs text-gray-600 font-medium tracking-wide">
                          {organizer.department}
                        </p>
                      </div>
                      
                      {/* Social Media Icons */}
                      <div className="flex gap-2 flex-wrap">
                        {Object.entries(organizer.socials).map(([platform, url]) => (
                          <a
                            key={platform}
                            href={url}
                            className="w-8 h-8 bg-black text-white flex items-center justify-center hover:bg-gray-700 transition-colors duration-200 border border-black"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {getSocialIcon(platform)}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="text-center mt-12 sm:mt-16 md:mt-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '2.2s' }}>
            <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-600 font-medium">
              <div className="w-8 sm:w-10 md:w-12 h-px bg-gray-400"></div>
              <span className="tracking-wider uppercase text-center">Leading Innovation Together</span>
              <div className="w-8 sm:w-10 md:w-12 h-px bg-gray-400"></div>
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
        
        /* Additional mobile-specific styles */
        @media (max-width: 640px) {
          .tracking-tighter {
            letter-spacing: -0.05em;
          }
        }
      `}</style>
    </div>
  );
};

export default Organizers;