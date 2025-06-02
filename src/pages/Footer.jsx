import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-amber-50 border-t-4 border-black relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 py-12 sm:py-16 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          
         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 sm:mb-12">
            
   
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-black mb-3 sm:mb-4">
                ProfHack
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-medium tracking-wide leading-relaxed">
                Where Ideas Transform
              </p>
              <div className="w-16 h-1 bg-black mt-4 mx-auto md:mx-0"></div>
            </div>

          
            <div className="text-center">
              <h4 className="text-base sm:text-lg font-black tracking-[0.2em] uppercase text-black mb-6">
                Quick Links
              </h4>
              <div className="space-y-4">
                <a href="#" className="block text-base text-gray-700 hover:text-black font-semibold tracking-wide transition-all duration-300 hover:transform hover:scale-105">
                  About
                </a>
                <a href="#" className="block text-base text-gray-700 hover:text-black font-semibold tracking-wide transition-all duration-300 hover:transform hover:scale-105">
                  Timeline
                </a>
                <a href="#" className="block text-base text-gray-700 hover:text-black font-semibold tracking-wide transition-all duration-300 hover:transform hover:scale-105">
                  Contact
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-right">
              <h4 className="text-base sm:text-lg font-black tracking-[0.2em] uppercase text-black mb-6">
                Connect
              </h4>
              <div className="space-y-4">
                <p className="text-base text-gray-700 font-semibold tracking-wide">
                  profhack@bmsit.in
                </p>
                <p className="text-base text-gray-700 font-semibold tracking-wide">
                  +91 1111222222
                </p>
              </div>
            </div>

          </div>

        
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-black to-transparent mb-8"></div>

          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-sm sm:text-base text-gray-600 font-medium tracking-wide">
              © 2025 ProfHack. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4 text-sm sm:text-base text-gray-600 font-semibold">
              <div className="w-8 h-px bg-gray-400"></div>
              <span className="tracking-[0.15em] uppercase">Excellence Through Innovation</span>
              <div className="w-8 h-px bg-gray-400"></div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;