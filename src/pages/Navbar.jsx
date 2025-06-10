import React, { useState, useEffect } from 'react';

const Navbar = ({ setCurrentPage, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsAnimating(false);
      }, 600);
    } else {
      setIsMenuOpen(true);
    }
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    toggleMenu();
  };

  const navigationItems = [
    { name: 'Home', id: 'home', delay: '0.1s' },
    { name: 'About', id: 'about', delay: '0.2s' },
    { name: 'Timeline', id: 'timeline', delay: '0.3s' },
    { name: 'Tracks', id: 'tracks', delay: '0.4s' },
    { name: 'Prizes', id: 'prizes', delay: '0.5s' },
    { name: 'Contact', id: 'contact', delay: '0.6s' }
  ];

  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Floating Menu Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={toggleMenu}
          className={`
            relative w-16 h-16 bg-black text-white rounded-full shadow-2xl
            hover:scale-110 transition-all duration-300 ease-out
            flex items-center justify-center font-black text-lg tracking-wider
            ${isMenuOpen ? 'scale-110 bg-white text-black border-2 border-black' : ''}
          `}
        >
          <span className={`transition-all duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}>
            {isMenuOpen ? '✕' : '☰'}
          </span>
          
          {/* Ripple Effect */}
          <div className={`
            absolute inset-0 rounded-full border-2 border-black
            ${isMenuOpen ? 'animate-ping opacity-20' : 'opacity-0'}
          `}></div>
        </button>
      </div>

      {/* Full Screen Menu Overlay */}
      {isMenuOpen && (
        <div className={`
          fixed inset-0 z-40 bg-amber-50
          ${isAnimating ? 'animate-menu-close' : 'animate-menu-open'}
        `}>
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full animate-pulse"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 20%, #000 2px, transparent 2px),
                  radial-gradient(circle at 80% 80%, #000 2px, transparent 2px)
                `,
                backgroundSize: '100px 100px',
                animation: 'float 20s ease-in-out infinite'
              }}
            />
          </div>

          {/* Header Section */}
          <div className={`
            relative pt-12 pb-8 px-8 text-center border-b-2 border-black
            ${isAnimating ? 'animate-slide-up-out' : 'animate-slide-down-in'}
          `}>
            {/* Close Button */}
            <button
              onClick={toggleMenu}
              className="absolute top-8 right-8 w-12 h-12 bg-black text-white rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center font-black text-xl"
            >
              ✕
            </button>

            {/* Event Logo/Name */}
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <div className="w-16 h-16 bg-black mx-auto rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-black text-2xl">I</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black leading-tight">
                  INNOVATION
                  <br />
                  <span className="text-3xl md:text-5xl">CHALLENGE</span>
                </h1>
              </div>
              <p className="text-lg text-gray-700 font-medium tracking-wide">
                Faculty Innovation Competition 2025
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex items-center justify-center px-8">
            <nav className="max-w-2xl w-full">
              <ul className="space-y-6">
                {navigationItems.map((item, index) => (
                  <li
                    key={item.id}
                    className={`
                      ${isAnimating ? 'animate-fade-out' : 'animate-fade-in-up'}
                    `}
                    style={{ 
                      animationDelay: isAnimating ? `${0.1 * index}s` : item.delay 
                    }}
                  >
                    <button
                      onClick={() => handleNavigation(item.id)}
                      className={`
                        block w-full text-left py-4 px-6 rounded-none border-b-2 border-transparent
                        hover:border-black hover:bg-white hover:shadow-lg
                        transition-all duration-300 ease-out group
                        ${currentPage === item.id ? 'border-black bg-white shadow-lg' : ''}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl md:text-4xl font-black tracking-wider text-black group-hover:translate-x-2 transition-transform duration-300">
                          {item.name}
                        </span>
                        <span className="text-4xl font-black text-gray-400 group-hover:text-black group-hover:translate-x-2 transition-all duration-300">
                          →
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Footer */}
          <div className={`
            px-8 py-6 text-center border-t-2 border-black
            ${isAnimating ? 'animate-slide-down-out' : 'animate-slide-up-in'}
          `}>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600 font-medium">
              <div className="w-12 h-px bg-gray-400"></div>
              <span className="tracking-wider uppercase">Navigate Innovation</span>
              <div className="w-12 h-px bg-gray-400"></div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes menu-open {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes menu-close {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.8);
          }
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

        @keyframes fade-out {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        @keyframes slide-down-in {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up-out {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-50px);
          }
        }

        @keyframes slide-up-in {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down-out {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(50px);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .animate-menu-open {
          animation: menu-open 0.6s ease-out forwards;
        }
        
        .animate-menu-close {
          animation: menu-close 0.6s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-out {
          animation: fade-out 0.4s ease-out forwards;
        }

        .animate-slide-down-in {
          animation: slide-down-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up-out {
          animation: slide-up-out 0.6s ease-out forwards;
        }

        .animate-slide-up-in {
          animation: slide-up-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-down-out {
          animation: slide-down-out 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;