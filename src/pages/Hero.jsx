import React, { useState, useEffect } from 'react';
import bmsitLogo from './assets/bmsit.png';
import ieeeLogo from './assets/stb.png';
import iiclogo from './assets/iic.png';
const Button = ({ children, onClick, variant, className, type, disabled, ...props }) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={className}
    {...props}
  >
    {children}
  </button>
);

const OptimizedHero = ({ setCurrentPage = () => {} }) => {
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

 
  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Dynamic Grid Background */}
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

      <div className="relative z-10 pt-6 px-4">
        <div className="max-w-7xl mx-auto">
          
         
          <div className="flex md:hidden justify-center items-center gap-8 mb-8">
           
            <div
              className="h-14 px-4 bg-transparent flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)'
              }}
            >
              <img src={bmsitLogo} alt="BMSIT Logo" className="h-12 object-contain" />
            </div>
            
     
            <div className="w-14 h-14 bg-transparent flex items-center justify-center  hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-full">
              <img src={ieeeLogo} alt="IEEE Logo" className="w-12 h-12 object-contain" />
            </div>
            
            
            <div
              className="w-14 h-14 bg-transparent flex items-center justify-center  hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{
                clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)'
              }}
            >
              <img src={iiclogo} alt="ProfHack Logo" className="w-10 h-10 object-contain" />
            </div>
          </div>

          {/* Desktop Logo Layout */}
          <div className="hidden md:flex justify-between items-start mb-12">
           
            <div className="flex items-center">
              <div
                className="group h-20 px-6 bg-transparent flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-1"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)'
                }}
              >
                <img src={bmsitLogo} alt="BMSIT Logo" className="h-18 object-contain group-hover:scale-105 transition-transform" />
              </div>
            </div>
            
           
            <div className="flex items-center gap-8">
             
              <div
                className="group w-20 h-20 bg-transparent flex items-center justify-center  hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-rotate-2 rounded-full"
              >
                <img src={ieeeLogo} alt="IEEE Logo" className="w-18 h-18 object-contain group-hover:scale-105 transition-transform" />
              </div>
              
              
              <div
                className="group w-20 h-20 bg-transparent flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-rotate-3"
                style={{
                  clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0% 100%)'
                }}
              >
                <img src={iiclogo} alt="ProfHack Logo" className="w-16 h-16 object-contain group-hover:scale-105 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-140px)] px-4">
        <div className="text-center max-w-5xl mx-auto">
 
          <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl md:text-2xl font-bold tracking-[0.3em] text-black uppercase mb-4">
              BMSIT&M X IEEE
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-black to-transparent mx-auto"></div>
          </div>

          <div className="mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black tracking-tighter text-black leading-none mb-6">
               ProfHack 
            </h1>
          </div>

          <div className="mb-14 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <p className="text-lg md:text-xl text-gray-700 font-medium tracking-wide max-w-3xl mx-auto leading-relaxed">
              Join the ultimate hackathon experience. 
              <span className="font-bold text-black"> Innovate, collaborate, and showcase</span> your skills 
              in a competitive environment designed to push your limits and 
              <span className="font-bold text-black"> transform ideas into reality</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Button
              onClick={() => setCurrentPage('register')}
              className="
                group relative overflow-hidden
                w-full sm:w-auto min-w-[200px]
                border-2 border-black text-white font-bold tracking-wider
                bg-black hover:bg-transparent hover:text-black 
                px-10 py-5 rounded-none uppercase text-sm
                transition-all duration-500 transform hover:scale-110
                shadow-2xl hover:shadow-black/50
                before:absolute before:inset-0 before:bg-white before:translate-x-[-100%] 
                before:transition-transform before:duration-500 hover:before:translate-x-0
                before:z-[-1]
              "
            >
              <span className="relative z-10">Register Now</span>
            </Button>
            
            <Button
              onClick={() => setCurrentPage('login')}
              className="
                group relative overflow-hidden
                w-full sm:w-auto min-w-[200px]
                border-2 border-black text-black font-bold tracking-wider
                bg-transparent hover:bg-black hover:text-white 
                px-10 py-5 rounded-none uppercase text-sm
                transition-all duration-500 transform hover:scale-110
                shadow-2xl hover:shadow-black/50
                before:absolute before:inset-0 before:bg-black before:translate-x-[-100%] 
                before:transition-transform before:duration-500 hover:before:translate-x-0
                before:z-[-1]
              "
            >
              <span className="relative z-10">Login</span>
            </Button>
          </div>

          <div className="mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600 font-medium">
              <div className="w-8 h-px bg-gray-400"></div>
              <span className="tracking-wider uppercase">Ready to innovate?</span>
              <div className="w-8 h-px bg-gray-400"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(-20px) rotate(120deg) scale(1.1); }
          66% { transform: translateY(10px) rotate(240deg) scale(0.9); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateX(0px) rotate(0deg) scale(1); }
          50% { transform: translateX(15px) rotate(180deg) scale(1.2); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg) scale(1); }
          25% { transform: translate(10px, -15px) rotate(90deg) scale(1.1); }
          50% { transform: translate(-5px, -25px) rotate(180deg) scale(0.8); }
          75% { transform: translate(-15px, -10px) rotate(270deg) scale(1.05); }
        }
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

export default OptimizedHero;