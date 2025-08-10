import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
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

  const leaderboardData = [
    { rank: 1, name: "DIGITAL Dreams Venture Smart Kit", leader: "Dr. Drakshaveni G", score: 0, badge: "🏆" },
    { rank: 2, name: "AswamedhaX", leader: "Dr. N Rakesh", score: 0, badge: "🥈" },
    { rank: 3, name: "SPUNK", leader: "Dr. Usha B A", score: 0, badge: "🥉" },
    { rank: 4, name: "GreenByte", leader: "Mr. Ajith S", score: 0, badge: "" },
    { rank: 5, name: "Team Chanakya", leader: "Dr. Hemamalini B H", score: 0, badge: "" },
    { rank: 6, name: "AIGLE AIR", leader: "Mrs. S. Mahalakshmi", score: 0, badge: "" },
    { rank: 7, name: "ನವೋನ್ಮೇಷ", leader: "Dr. Marsh M Bandi", score: 0, badge: "" },
    { rank: 8, name: "Ping intelligent", leader: "Dr. Dhanalakshmi B K", score: 0, badge: "" },
    { rank: 9, name: "MYTriSpark", leader: "Mr. Yatheesh N G", score: 0, badge: "" },
    { rank: 10, name: "Intel Tech", leader: "Mrs. Reshma C R", score: 0, badge: "" },
    { rank: 11, name: "YantraMinds", leader: "Dr. Bharathi Malakreddy A", score: 0, badge: "" },
    { rank: 12, name: "Synergy", leader: "Dr. B.R. Arun Kumar", score: 0, badge: "" },
    { rank: 13, name: "PentaCoders", leader: "Dr. Mohan B A", score: 0, badge: "" },
    { rank: 14, name: "PRECOL", leader: "Mr. A Venkatesh", score: 0, badge: "" },
    { rank: 15, name: "Advitīya", leader: "Dr. Rajesh Gopinath", score: 0, badge: "" },
    { rank: 16, name: "DronAcharya", leader: "Dr. Raju Hajare", score: 0, badge: "" },
    { rank: 17, name: "Jeevadhara", leader: "Mr. Dwarakanath G V", score: 0, badge: "" },
    { rank: 18, name: "Jñānī Samūhaḥ (ज्ञानी समूहः)", leader: "Dr. Shoba M", score: 0, badge: "" },
    { rank: 19, name: "Apahshakti", leader: "Dr. Chandrashekharappa Agasnalli", score: 0, badge: "" },
    { rank: 20, name: "Ashwamedha", leader: "Dr. Mallikarjuna Gowda C.P", score: 0, badge: "" },
    { rank: 21, name: "NeuroAura", leader: "Dr. Mutyala Sridevi", score: 0, badge: "" },
    { rank: 22, name: "Heart-Guard 360 Wings", leader: "Dr. Anitha V R", score: 0, badge: "" },
    { rank: 23, name: "Tejasvi (तेजस्वि)", leader: "Dr. Sumathi M S", score: 0, badge: "" },
    { rank: 24, name: "Chitragupt", leader: "Dr. Geeta Amol Patil", score: 0, badge: "" },
    { rank: 25, name: "KRISHIMEDHA", leader: "Dr. Ambika G N", score: 0, badge: "" },
    { rank: 26, name: "AIkido-Syntax for Society", leader: "Dr. Anupama H S", score: 0, badge: "" },
    { rank: 27, name: "NeoPredict", leader: "Dr. Aparna K", score: 0, badge: "" },
    { rank: 28, name: "GreenMind AI", leader: "Dr. Athiyamaan V", score: 0, badge: "" },
    { rank: 29, name: "Vinyas2025", leader: "Dr. Vinutha K", score: 0, badge: "" },
    { rank: 30, name: "EcoNex Campus", leader: "Dr. Shanthi D L", score: 0, badge: "" },
    { rank: 31, name: "CHAAM ⭐", leader: "Mrs. Annapareddy Haarika", score: 0, badge: "" },
    { rank: 32, name: "Panchkruti", leader: "Ms. Spandana L", score: 0, badge: "" },
    { rank: 33, name: "Code of Karna", leader: "Ms. Ashwitha K", score: 0, badge: "" },
    { rank: 34, name: "Solution Makers", leader: "Mrs. Belji T", score: 0, badge: "" },
    { rank: 35, name: "AI_KRANTHI", leader: "Dr. Kantharaju V", score: 0, badge: "" },
    { rank: 36, name: "Elite", leader: "Dr. Veena N", score: 0, badge: "" },
    { rank: 37, name: "Face Track", leader: "Dr. Suryakanth B", score: 0, badge: "" },
    { rank: 38, name: "Silicon Squad", leader: "Mr. Beerappa Belasakarge", score: 0, badge: "" },
    { rank: 39, name: "TechIdea", leader: "Dr. Chethana C", score: 0, badge: "" },
    { rank: 40, name: "Cybersena", leader: "Dr.Sagargouda Patil", score: 0, badge: "" },
    { rank: 41, name: "TechForge", leader: "Dr. Anitha M", score: 0, badge: "" },
    { rank: 42, name: "Aavishkar", leader: "Dr. Vijayalakshmi G V", score: 0, badge: "" },
    { rank: 43, name: "Fusion_Force", leader: "Ms. Chaitra D B", score: 0, badge: "" },
    { rank: 44, name: "Idea Spark", leader: "Mrs. Pragathi M", score: 0, badge: "" },
    { rank: 45, name: "TechSangama", leader: "Mr. Sonnegowda K", score: 0, badge: "" },
    { rank: 46, name: "Ananta", leader: "Dr. Paramita Sarkar", score: 0, badge: "" },
    { rank: 47, name: "Anveshana", leader: "Mrs. Manjula B K", score: 0, badge: "" },
    { rank: 48, name: "Infinity Loops", leader: "Mrs. S Packiya Lekshmi", score: 0, badge: "" },
    { rank: 49, name: "EdgeMinds", leader: "Syed Matheen Pasha", score: 0, badge: "" },
    { rank: 50, name: "Tech Titans", leader: "Ms. Renita Blossom Monteiro", score: 0, badge: "" },
    { rank: 51, name: "Social Hacktivists", leader: "Mrs. Aruna N", score: 0, badge: "" },
    { rank: 52, name: "Lady Logicians", leader: "Ms. Brunda S", score: 0, badge: "" },
    { rank: 53, name: "Hackademia United", leader: "Mr. Shobhit Tembhre", score: 0, badge: "" },
    { rank: 54, name: "Panchajanya", leader: "Dr. Surekha r Gondkar", score: 0, badge: "" }
  ];

  const handleBackClick = () => {
    // You can customize this to navigate wherever needed
    navigate('/'); // Navigate to home or any other page
  };

  return (
    <div className="min-h-screen bg-amber-50 relative overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 opacity-[0.3] pointer-events-none">
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

      <div className="relative z-10 pt-4 sm:pt-8 md:pt-12 pb-8 sm:pb-12 md:pb-16 px-3 sm:px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button */}
          <div className="mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors duration-200 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm sm:text-base">Back</span>
            </button>
          </div>

          {/* Header Section - Compact */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="mb-4 sm:mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] sm:tracking-[0.3em] text-black uppercase mb-3 sm:mb-4">
                Innovate • Collaborate • Elevate
              </h2>
              <div className="w-12 sm:w-16 md:w-20 h-0.5 bg-black mx-auto"></div>
            </div>

            <div className="mb-4 sm:mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-black leading-[0.9] mb-3 sm:mb-4">
               REBOOT
                <br />
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">LEADERBOARD</span>
              </h1>
            </div>

           
          </div>

          {/* Leaderboard Container - Taller and Thinner */}
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="bg-white border-2 border-black shadow-xl max-h-[700px] sm:max-h-[800px] flex flex-col">
              
              {/* Table Header - Fixed */}
              <div className="bg-black text-white p-3 sm:p-4 flex-shrink-0">
                <h3 className="text-base sm:text-lg md:text-xl font-black tracking-wide uppercase">
                  Current Team Rankings
                </h3>
              </div>

              {/* Scrollable Table Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="divide-y divide-gray-100">
                  {leaderboardData.map((team, index) => (
                    <div
                      key={index}
                      className={`p-3 sm:p-4 hover:bg-gray-50 transition-colors duration-200 ${
                        team.rank <= 3 ? 'bg-amber-50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 sm:gap-4">
                        
                        {/* Left side - Rank and Info */}
                        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                            <div className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-black text-sm sm:text-base ${
                              team.rank === 1 ? 'bg-yellow-400 text-black' :
                              team.rank === 2 ? 'bg-gray-300 text-black' :
                              team.rank === 3 ? 'bg-orange-300 text-black' :
                              'bg-black text-white'
                            }`}>
                              {team.rank}
                            </div>
                            {team.badge && (
                              <span className="text-lg sm:text-xl flex-shrink-0">{team.badge}</span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm sm:text-base md:text-lg font-black text-black mb-1 break-words leading-tight">
                              {team.name}
                            </h4>
                            <p className="text-xs text-gray-600 font-medium break-words">
                              Led by: {team.leader}
                            </p>
                          </div>
                        </div>

                        {/* Right side - Score Only */}
                        <div className="flex items-center flex-shrink-0">
                          <div className="text-right">
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Score
                            </div>
                            <div className="text-base sm:text-lg md:text-xl font-black text-black">
                              {team.score.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Table Footer - Fixed */}
              <div className="bg-gray-50 p-3 sm:p-4 border-t-2 border-gray-200 flex-shrink-0">
                <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs text-gray-600 font-medium">
                  <div className="w-6 sm:w-8 h-px bg-gray-400"></div>
                  <span className="tracking-wider uppercase">Updated Every Hour</span>
                  <div className="w-6 sm:w-8 h-px bg-gray-400"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Compact */}
          <div className="text-center mt-6 sm:mt-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs text-gray-600 font-medium">
              <div className="w-6 sm:w-8 h-px bg-gray-400"></div>
              <span className="tracking-wider uppercase text-center">Competition In Progress</span>
              <div className="w-6 sm:w-8 h-px bg-gray-400"></div>
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
        
        /* Custom scrollbar styling */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        /* Better text wrapping for long team names */
        .break-words {
          word-wrap: break-word;
          word-break: break-word;
          hyphens: auto;
        }
        
        /* Additional mobile-specific styles */
        @media (max-width: 640px) {
          .tracking-tighter {
            letter-spacing: -0.03em;
          }
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;