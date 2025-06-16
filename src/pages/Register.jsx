import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

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

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/9731382840', '_blank');
  };
  const handleLoginClick = () => navigate('/login');
  const handleBackToHome = () => navigate('/');

  return (
    <div className="min-h-screen bg-amber-50 relative overflow-hidden">
      {/* faint grid backdrop */}
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

      <div className="relative z-10 max-w-6xl mx-auto py-12 px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-sm md:text-base font-bold uppercase tracking-widest mb-2">
            Registration Status
          </h2>
          <div className="w-16 h-px bg-black mx-auto" />
          <h1 className="mt-6 font-black text-3xl md:text-5xl leading-tight">
            <span className="block">DEAR</span>
            <span className="block text-4xl md:text-6xl">FACULTIES</span>
          </h1>
        </div>

        {/* Two-column grid for desktop */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Card 1 */}
          <div className="relative bg-white border-2 border-black p-6 md:p-8">
            <div className="absolute -top-3 -left-3 w-10 h-10 bg-black text-white flex items-center justify-center font-black">
              !
            </div>
            <h3 className="font-black uppercase tracking-wide text-xl mb-4">
              Registration Phase Over
            </h3>
            <p className="text-base text-gray-700 mb-4">
              As we move forward to the hackathon phase, we want to express our gratitude to all faculty members who have registered for 
              <span className="font-bold"> ReeBooT</span>.
            </p>
            <p className="text-base text-gray-700 font-semibold">
              <span className="font-bold">Thank you for registering!</span> Your participation will contribute to making this event a tremendous success.
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white border-2 border-black p-6 md:p-8">
            <div className="absolute -top-3 -left-3 w-10 h-10 bg-black text-white flex items-center justify-center font-black">
              ?
            </div>
            <h3 className="font-black uppercase tracking-wide text-lg mb-4">
              Missed Registration?
            </h3>
            <p className="text-base text-gray-700 mb-6">
              If you haven't registered yet and would like to participate, please reach out to us immediately.
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 uppercase transition-transform transform hover:-translate-y-1 hover:shadow-lg"
            >
              <span>📱</span>
              Contact via WhatsApp
            </button>
          </div>
        </div>

        {/* Buttons below grid */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleLoginClick}
            className="flex-1 sm:flex-none bg-black text-white font-bold px-6 py-3 uppercase group relative overflow-hidden"
          >
            <span className="relative z-10">Login to Dashboard</span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white via-gray-300 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </button>
          <button
            onClick={handleBackToHome}
            className="flex-1 sm:flex-none bg-white border-2 border-black text-black font-bold px-6 py-3 uppercase group relative overflow-hidden"
          >
            <span className="relative z-10">Back to Home</span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black via-gray-600 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </button>
        </div>

        {/* Footer tagline */}
        <div className="mt-12 text-center text-gray-600 uppercase tracking-wider">
          Ready to Innovate
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* you can re-add fade-in on individual cards if desired */
      `}</style>
    </div>
  );
};

export default Register;
