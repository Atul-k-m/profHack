import React, { useState, useEffect } from 'react';

const Tracks = () => {
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

  const trackCards = [
    {
      title: "Smart & Sustainable Campus",
      description: "Develop innovative solutions for energy-efficient campus infrastructure, smart resource management, and sustainable practices that transform educational environments into eco-friendly learning ecosystems.",
      number: "01"
    },
    {
      title: "AI & Data Science for Social Impact",
      description: "Harness the power of artificial intelligence and data analytics to address pressing social challenges, create inclusive solutions, and drive positive community transformation through technology.",
      number: "02"
    },
    {
      title: "Future of Engineering Education (EdTech)",
      description: "Revolutionize engineering pedagogy through cutting-edge educational technologies, immersive learning experiences, and innovative teaching methodologies that prepare students for tomorrow's challenges.",
      number: "03"
    },
    {
      title: "Healthcare Engineering",
      description: "Engineer breakthrough solutions in medical technology, biomedical devices, telemedicine, and health monitoring systems that improve patient outcomes and healthcare accessibility.",
      number: "04"
    },
    {
      title: "Industry 4.0 & Automation",
      description: "Design next-generation industrial automation systems, IoT-enabled manufacturing processes, and smart factory solutions that drive efficiency and productivity in modern industries.",
      number: "05"
    },
    {
      title: "Climate Resilience & GreenTech",
      description: "Create sustainable technologies and climate adaptation strategies that combat environmental challenges while promoting green innovation and renewable energy solutions.",
      number: "06"
    },
    {
      title: "Disaster Management & Infrastructure",
      description: "Develop robust systems for disaster prediction, emergency response, and resilient infrastructure that protect communities and enable rapid recovery from natural calamities.",
      number: "07"
    },
    {
      title: "Assistive Technologies for Disabilities",
      description: "Engineer inclusive solutions that enhance accessibility, independence, and quality of life for people with disabilities through innovative assistive technologies and adaptive systems.",
      number: "08"
    },
    {
      title: "Smart Cities & Urban Mobility",
      description: "Design intelligent urban systems, sustainable transportation networks, and smart city infrastructure that optimize resource usage and improve quality of urban life.",
      number: "09"
    },
    {
      title: "Open Innovation",
      description: "Explore groundbreaking ideas and interdisciplinary solutions that don't fit traditional categories but have the potential to create significant impact across multiple domains.",
      number: "10"
    }
  ];

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
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-lg md:text-xl font-bold tracking-[0.4em] text-black uppercase mb-6">
                Competition Tracks
              </h2>
              <div className="w-24 h-0.5 bg-black mx-auto"></div>
            </div>

            <div className="mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-black leading-[0.9] mb-8">
                INNOVATION
                <br />
                <span className="text-6xl md:text-8xl lg:text-9xl">DOMAINS</span>
              </h1>
            </div>

            <div className="mb-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <p className="text-lg md:text-xl text-gray-700 font-medium tracking-wide max-w-4xl mx-auto leading-relaxed">
                Choose your area of expertise and impact. Each track represents a critical domain where 
                <span className="font-bold text-black"> faculty innovation</span> can drive meaningful change. 
                From sustainable technology to social impact solutions, 
                <span className="font-bold text-black"> find your perfect challenge</span>.
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-20">
            {trackCards.map((card, index) => (
              <div
                key={index}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <div className="group relative h-full bg-white border-2 border-black hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 min-h-[280px]">
                  
                  {/* Card Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white flex items-center justify-center font-black text-lg tracking-wider">
                    {card.number}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 pt-10 h-full flex flex-col">
                    <h3 className="text-xl font-black tracking-wide uppercase mb-4 text-black leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-medium tracking-wide text-sm flex-grow">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Border Accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black via-gray-600 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '1.8s' }}>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600 font-medium">
              <div className="w-12 h-px bg-gray-400"></div>
              <span className="tracking-wider uppercase">Innovation Across All Domains</span>
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

export default Tracks;