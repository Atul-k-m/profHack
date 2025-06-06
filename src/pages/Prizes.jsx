import React, { useState, useEffect } from 'react';

const PrizesSection = () => {
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

  const prizes = [
    {
      position: "First Prize",
      amount: "₹80,000",
      rank: "1st",
      delay: "0.2s"
    },
    {
      position: "Second Prize", 
      amount: "₹60,000",
      rank: "2nd",
      delay: "0.4s"
    },
    {
      position: "Third Prize",
      amount: "₹40,000", 
      rank: "3rd",
      delay: "0.6s"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden py-16">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div 
          className="w-full h-full transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 opacity-0 animate-fade-in-up">
          <h2 className="text-lg md:text-xl font-bold tracking-[0.3em] text-black uppercase mb-3">
            Seed Grants
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-black to-transparent mx-auto mb-6"></div>
          
          <h1 className="text-5xl sm:text-6xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black leading-none mb-4">
            PRIZES
          </h1>
          
          <p className="text-base md:text-lg text-gray-700 font-medium tracking-wide max-w-xl mx-auto leading-relaxed">
            <span className="font-bold text-black">Compete for incredible rewards</span> and 
            turn your innovative ideas into 
            <span className="font-bold text-black"> funded ventures</span>.
          </p>
        </div>

        {/* Prize Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className="opacity-0 animate-fade-in-up group"
              style={{ animationDelay: prize.delay }}
            >
              <div className="relative">
                {/* Prize Card */}
                <div
                  className={`
                    relative bg-white border-2 border-black
                    ${index === 0 ? 'transform md:scale-105 md:-translate-y-4' : ''}
                    transition-all duration-500 hover:scale-105 hover:-translate-y-4
                    shadow-2xl hover:shadow-black/30
                    p-6 md:p-8
                  `}
                >
                  {/* Rank Badge */}
                  <div className={`
                    absolute -top-4 left-1/2 transform -translate-x-1/2
                    w-10 h-10 rounded-full border-2 border-black
                    flex items-center justify-center font-black text-base
                    ${index === 0 ? 'bg-yellow-400 text-black' : 
                      index === 1 ? 'bg-gray-300 text-black' : 
                      'bg-orange-400 text-black'}
                    shadow-lg
                  `}>
                    {prize.rank}
                  </div>

                  {/* Card Content */}
                  <div className="pt-6 text-center">
                    <h3 className="text-lg md:text-xl font-bold tracking-wider text-black uppercase mb-4">
                      {prize.position}
                    </h3>
                    
                    <div className="text-3xl md:text-4xl lg:text-5xl font-black text-black leading-none mb-3">
                      {prize.amount}
                    </div>
                    <div className="w-12 h-0.5 bg-black mx-auto"></div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Prize Pool */}
        <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="inline-block relative">
            <div
              className="bg-black text-white px-10 py-5 shadow-2xl"
              style={{
                clipPath: 'polygon(5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%, 0% 50%)'
              }}
            >
              <div className="text-center">
                <div className="text-sm md:text-base font-bold tracking-wider uppercase mb-1">
                  Total Prize Pool
                </div>
                <div className="text-2xl md:text-3xl font-black tracking-tight">
                  ₹1,80,000
                </div>
              </div>
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

export default PrizesSection;