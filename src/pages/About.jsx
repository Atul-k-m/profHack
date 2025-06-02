import React, { useState, useEffect } from 'react';

const About = () => {
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

  const aboutCards = [
    {
      title: "Multi-Round Competition",
      description: "A comprehensive month-long program featuring multiple evaluation rounds, each designed to assess different aspects of innovation, technical excellence, and practical implementation.",
      number: "01"
    },
    {
      title: "Faculty Excellence",
      description: "Exclusively designed for our esteemed faculty members to showcase their research capabilities, pedagogical innovations, and technological expertise in a competitive academic environment.",
      number: "02"
    },
    {
      title: "Professional Development",
      description: "An opportunity for continuous learning, skill enhancement, and academic growth while contributing to cutting-edge solutions that benefit educational and research communities.",
      number: "03"
    },
    {
      title: "Research & Innovation",
      description: "Encourages interdisciplinary collaboration, promotes research-driven solutions, and fosters an environment where academic excellence meets practical innovation.",
      number: "04"
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50 relative overflow-hidden">
   
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="w-full h-full transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
      </div>

      <div className="relative z-10 pt-8 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-24 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-12 sm:mb-16 md:mb-24">
            <div className="mb-6 sm:mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-[0.2em] sm:tracking-[0.4em] text-black uppercase mb-4 sm:mb-6">
                About ProfHack
              </h2>
              <div className="w-16 sm:w-20 md:w-24 h-0.5 bg-black mx-auto"></div>
            </div>

            <div className="mb-8 sm:mb-10 md:mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-black leading-[0.9] mb-4 sm:mb-6 md:mb-8">
                WHERE IDEAS
                <br />
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl">TRANSFORM</span>
              </h1>
            </div>

            <div className="mb-8 sm:mb-12 md:mb-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-medium tracking-wide max-w-4xl mx-auto leading-relaxed px-2 sm:px-0">
                A month-long professional hackathon designed exclusively for our distinguished faculty members. 
                <span className="font-bold text-black"> Showcase your expertise</span>, compete through multiple evaluation rounds, 
                and contribute to innovative solutions that advance academic excellence and 
                <span className="font-bold text-black"> shape the future of education</span>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
            {aboutCards.map((card, index) => (
              <div
                key={index}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${0.7 + index * 0.2}s` }}
              >
                <div className="group relative h-full bg-white border-2 border-black hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1">

                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-black text-white flex items-center justify-center font-black text-base sm:text-lg tracking-wider">
                    {card.number}
                  </div>

                  <div className="p-4 sm:p-6 md:p-8 pt-8 sm:pt-10 md:pt-12">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-black tracking-wide uppercase mb-3 sm:mb-4 md:mb-6 text-black leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-medium tracking-wide text-sm sm:text-base">
                      {card.description}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black via-gray-600 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16 md:mt-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '1.7s' }}>
            <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-600 font-medium">
              <div className="w-8 sm:w-10 md:w-12 h-px bg-gray-400"></div>
              <span className="tracking-wider uppercase text-center">Excellence Through Innovation</span>
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

export default About;