import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Leaderboard.jsx
 *
 * - Uses final scores extracted from the uploaded PDF where available.
 * - Ties share the same rank (competition ranking). Next rank skips accordingly.
 * - Teams with no final score found in the PDF are included with score: 0 and teamId: null.
 *
 * If you want the missing teams updated, provide the scores (or re-upload a PDF/CSV)
 * and I will update the array and ranks.
 */

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

  // ====== Final data ======
  // Best-effort mapping: scores and teamIds taken from uploaded PDF where found.
  // Teams not found in PDF are included with score: 0 and teamId: null so they appear at the bottom.
  const rawTeams = [
    // Teams that were present in your original array (kept all) --
    // Updated scores from the uploaded PDF when available.
    { teamId: 6, name: "GreenByte", leader: "Mr. Ajith S", score: 82 },
    { teamId: 34, name: "Face Track", leader: "Dr. Suryakanth B", score: 85 },
    { teamId: 3, name: "KRISHIMEDHA", leader: "Dr. Ambika G N", score: 91 },
    { teamId: 23, name: "NeoPredict", leader: "Dr. Aparna K", score: 69 },
    { teamId: 20, name: "Tejasvi (तेजस्वि)", leader: "Dr. Sumathi M S", score: 0 }, // no final found
    { teamId: 8, name: "AIkido-Syntax for Society", leader: "Dr. Anupama H S", score: 76 },
    { teamId: 26, name: "Cybersena", leader: "Dr.Sagargouda Patil", score: 50 },
    { teamId: 46, name: "Silicon Squad", leader: "Mr. Beerappa Belasakarge", score: 34 },
    { teamId: 19, name: "MYTriSpark", leader: "Mr. Yatheesh N G", score: 68 }, // MY3S mapped
    { teamId: 11, name: "NeuroAura", leader: "Dr. Mutyala Sridevi", score: 82 },
    { teamId: null, name: "Team Chanakya", leader: "Dr. Hemamalini B H", score: 0 }, // not found in PDF
    { teamId: 38, name: "YantraMinds", leader: "Dr. Bharathi Malakreddy A", score: 62 },
    { teamId: 21, name: "Heart-Guard 360 Wings", leader: "Dr. Anitha V R", score: 88 },
    { teamId: 10, name: "Jñānī Samūhaḥ (ज्ञानी समूहः)", leader: "Dr. Shoba M", score: 71 },
    { teamId: 36, name: "CHAAM ⭐", leader: "Mrs. Annapareddy Haarika", score: 65 },
    { teamId: 9, name: "Synergy", leader: "Dr. B.R. Arun Kumar", score: 81 }, // Synergy Innovations
    { teamId: 25, name: "Jeevadhara", leader: "Mr. Dwarakanath G V", score: 91 },
    { teamId: 24, name: "Vinyas2025", leader: "Dr. Vinutha K", score: 52 },
    { teamId: 22, name: "SPUNK", leader: "Dr. Usha B A", score: 68 },
    { teamId: 1, name: "AI_KRANTHI", leader: "Dr. Kantharaju V", score: 88 }, // AI_Kranthi in PDF
    { teamId: null, name: "Code of Karna", leader: "Ms. Ashwitha K", score: 95 },
    { teamId: 29, name: "Ping intelligent", leader: "Dr. Dhanalakshmi B K", score: 81 },
    { teamId: 42, name: "PentaCoders", leader: "Dr. Mohan B A", score: 81 },
    { teamId: 31, name: "Anveshana", leader: "Mrs. Manjula B K", score: 61 },
    { teamId: 16, name: "AswamedhaX", leader: "Dr. N Rakesh", score: 91 },
    { teamId: 2, name: "Solution Makers", leader: "Mrs. Belji T", score: 85 },
    { teamId: 46, name: "Elite", leader: "Dr. Veena N", score: 65 }, // NOTE: same teamId (46) appears twice in PDF; kept as-is
    { teamId: 4, name: "Lady Logicians", leader: "Ms. Brunda S", score: 95 },
    { teamId: null, name: "Aavishkar", leader: "Dr. Vijayalakshmi G V", score: 0 },
    { teamId: null, name: "Advitīya", leader: "Dr. Rajesh Gopinath", score: 0 },
    { teamId: 40, name: "AIGLE AIR", leader: "Prof.S.Mahalakshmi", score: 74 },
    { teamId: 5, name: "Ananta", leader: "Dr. Paramita Sarkar", score: 86 },
    { teamId: null, name: "Chitragupt", leader: "Dr. Geeta Amol Patil", score: 0 },
    { teamId: null, name: "Digital Dreams Venture Smart Kit", leader: "Dr. Drakshaveni G", score: 87 },
    { teamId: 13, name: "DronAcharya", leader: "Dr. Raju Hajare", score: 88 },
    { teamId: 32, name: "EcoNex Campus", leader: "Dr. Shanthi D L", score: 53 },
    { teamId: null, name: "Fusion_Force", leader: "Ms. Chaitra D B", score: 0 },
    { teamId: null, name: "GreenMind AI", leader: "Dr. Athiyamaan V", score: 71 }, // mapped to "Green AI" row
    { teamId: null, name: "Hackademia United", leader: "Mr. Shobhit Tembhre", score: 96 },
    { teamId: null, name: "Idea Spark", leader: "Mrs. Pragathi M", score: 0 },
    { teamId: 33, name: "Intel Tech", leader: "Mrs. Reshma C R", score: 56 },
    { teamId: null, name: "Panchkruti", leader: "Ms. Spandana L", score: 0 },
    { teamId: 28, name: "PRECOL", leader: "Mr. A Venkatesh", score: 96 },
    { teamId: 44, name: "Tech Forge", leader: "Dr. Anitha M", score: 87 },
    { teamId: null, name: "TechIdea", leader: "Dr. Chethana C", score: 0 },
    { teamId: null, name: "TechSangama", leader: "Mr. Sonnegowda K", score: 0 },
    { teamId: null, name: "ನವೋನ್ಮೇಷ", leader: "Dr. Marsh M Bandi", score: 88 }, // non-ascii name present in PDF
    { teamId: null, name: "EDGEMINDS", leader: "Syed Matheen Pasha", score: 0 },
    { teamId: 45, name: "Ashwamedha", leader: "Dr. Mallikarjuna Gowda C.P", score: 54 },
    { teamId: 18, name: "Infinity Loops", leader: "Mrs. S Packiya Lekshmi", score: 71 },
    { teamId: null, name: "Social Hacktivists", leader: "Mrs. Aruna N", score: 0 },
    { teamId: 7, name: "Apahshakti", leader: "Dr. Chandrashekharappa Agasnalli", score: 93 },
    { teamId: null, name: "Panchajanya", leader: "Dr. Surekha R Gondkar", score: 0 },
    { teamId: 15, name: "Tech Titans", leader: "Ms. Renita Blossom Monteiro", score: 93 }
    // If you have additional teams in your original list not present above, we can append them here.
  ];

  // ====== Ranking logic (competition ranking: tie -> same rank, next rank = index+1) ======
  // 1) Sort descending by score
  const sorted = [...rawTeams].sort((a, b) => b.score - a.score);

  // 2) Assign competition-style ranks:
  //    - items with same score get same rank
  //    - rank number = index + 1 (so ties consume positions and next rank skips)
  const ranked = sorted.map((team, idx) => {
    if (idx === 0) {
      return { ...team, rank: 1 };
    }
    const prev = sorted[idx - 1];
    // If same score as previous, reuse previous rank
    if (team.score === prev.score) {
      return { ...team, rank: prev.rank };
    }
    // else rank = idx + 1 (competition ranking)
    return { ...team, rank: idx + 1 };
  });

  const handleBackClick = () => {
    navigate('/');
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

          {/* Header */}
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

          {/* Leaderboard Container */}
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="bg-white border-2 border-black shadow-xl max-h-[700px] sm:max-h-[800px] flex flex-col">
              {/* Table Header */}
              <div className="bg-black text-white p-3 sm:p-4 flex-shrink-0">
                <h3 className="text-base sm:text-lg md:text-xl font-black tracking-wide uppercase">
                  Current Team Rankings
                </h3>
              </div>

              {/* Scrollable Table Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="divide-y divide-gray-100">
                  {ranked.map((team, index) => (
                    <div
                      key={`${team.name}-${index}`}
                      className={`p-3 sm:p-4 hover:bg-gray-50 transition-colors duration-200 ${
                        team.rank <= 3 && team.score > 0 ? 'bg-amber-50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 sm:gap-4">
                        {/* Left: Rank + Info */}
                        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                            <div
                              className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-black text-sm sm:text-base ${
                                team.rank === 1 ? 'bg-yellow-400 text-black' :
                                team.rank === 2 ? 'bg-gray-300 text-black' :
                                team.rank === 3 ? 'bg-orange-300 text-black' :
                                'bg-black text-white'
                              }`}
                            >
                              {team.rank}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2">
                              <h4 className="text-sm sm:text-base md:text-lg font-black text-black mb-1 break-words leading-tight">
                                {team.name}
                              </h4>
                              <span className="text-xs text-gray-500 font-medium">
                                {team.teamId ? `ID: ${team.teamId}` : 'ID: —'}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 font-medium break-words">
                              Led by: {team.leader}
                            </p>
                          </div>
                        </div>

                        {/* Right: Score */}
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

              {/* Table Footer */}
              <div className="bg-gray-50 p-3 sm:p-4 border-t-2 border-gray-200 flex-shrink-0">
                <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs text-gray-600 font-medium">
                  <div className="w-6 sm:w-8 h-px bg-gray-400"></div>
                  <span className="tracking-wider uppercase">Updated using uploaded final scores</span>
                  <div className="w-6 sm:w-8 h-px bg-gray-400"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="text-center mt-6 sm:mt-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="max-w-2xl mx-auto text-xs text-gray-600">
              <p>
                Ranks computed from final scores found in the uploaded PDF. Teams with <strong>score 0</strong> had no matching
                final score in the PDF excerpt and are listed at the bottom. If you have updated scores for those
                teams, provide them and I'll update the leaderboard.
              </p>
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
