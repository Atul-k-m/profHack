import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'HOME', href: '#hero' },
    { name: 'Organizers', href: '#hero' },
    { name: 'ABOUT', href: '#about' },
    { name: 'TIMELINE', href: '#timeline' },
    { name: 'TRACKS', href: '#tracks' }
  ];

  const handleNavClick = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-16 h-16 bg-black text-white rounded-full shadow-lg
            hover:bg-gray-900 hover:shadow-xl
            transition-all duration-300 transform hover:scale-110
            flex items-center justify-center
            ${isOpen ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100'}
          `}
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          <Menu size={24} strokeWidth={2} />
        </button>
      </div>

      <div
        className={`
          fixed inset-0 z-40 bg-amber-50 text-gray-900
          transition-all duration-700 ease-in-out
          ${isOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
          }
        `}
        style={{ fontFamily: 'Sora, sans-serif' }}
      >
        <div className="absolute inset-0 opacity-[0.06]">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, #374151 0.5px),
                linear-gradient(to bottom, #374151 )
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="
            absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 sm:w-16 sm:h-16
            bg-black text-white rounded-full shadow-lg
            hover:bg-gray-900 hover:shadow-xl
            transition-all duration-300 transform hover:scale-110
            flex items-center justify-center z-50
          "
        >
          <X size={20} strokeWidth={2} className="sm:w-6 sm:h-6" />
        </button>

        <div className="relative z-10 flex flex-col h-screen">
          
          <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-8 sm:py-12">
            
            <div className="mb-6 sm:mb-8 md:mb-10 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-2 sm:mb-3 md:mb-4 text-gray-900">
                eBooT
              </h1>
              <div className="w-20 sm:w-24 md:w-32 h-1 bg-gray-900 mx-auto mb-2 sm:mb-3 md:mb-4"></div>
              <p className="text-xs sm:text-sm md:text-base tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.25em] text-gray-700 uppercase font-semibold">
                Faculty Hackathon
              </p>
            </div>

            <nav className="flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className={`
                    w-full opacity-0 transform translate-y-8
                    ${isOpen ? 'animate-fade-in-up' : ''}
                  `}
                  style={{ 
                    animationDelay: `${index * 0.1 + 0.4}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="
                      group relative w-full text-base sm:text-lg md:text-xl lg:text-2xl font-semibold tracking-wide
                      py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-transparent border-2 border-gray-900
                      hover:bg-gray-900 hover:text-white
                      transition-all duration-400 transform hover:scale-105
                      uppercase text-center
                      focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                    "
                  >
                    <span className="relative z-10">{item.name}</span>
                    
                    <div className="
                      absolute bottom-0 left-0 w-full h-1 bg-gray-900
                      transform scale-x-0 group-hover:scale-x-100
                      transition-transform duration-500 origin-left
                    "></div>
                    
                    <span className="
                      absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-gray-900 text-white rounded-full
                      flex items-center justify-center font-bold text-xs
                      opacity-0 group-hover:opacity-100 transition-all duration-300
                      transform scale-75 group-hover:scale-100
                    ">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </button>
                </div>
              ))}
            </nav>
          </div>

          <div className="w-full text-center pb-3 sm:pb-4 md:pb-6 px-4">
            <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 text-xs text-gray-600 font-medium">
              <div className="w-6 sm:w-8 md:w-12 h-px bg-gray-500"></div>
              <span className="tracking-[0.15em] sm:tracking-[0.2em] uppercase whitespace-nowrap text-center">Innovation Awaits</span>
              <div className="w-6 sm:w-8 md:w-12 h-px bg-gray-500"></div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
        
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
          animation: fade-in-up 0.7s ease-out forwards;
        }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        button:focus {
          outline: none;
        }
      `}</style>
    </>
  );
};

export default Navbar;