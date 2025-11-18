import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const Leaderboard = () => {
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

  // Updated team data
  const rawTeams = [
    { teamId: 1, name: "AI_Kranthi", leader: "Dr. Kantharaju V", score: 70 },
    { teamId: 2, name: "AIGLE AIR", leader: "Prof.S.Mahalakshmi", score: 88 },
    { teamId: 3, name: "AIkido-Syntax for Society", leader: "Dr. Anupama H S", score: 83 },
    { teamId: 4, name: "Anveshana", leader: "Mrs. Manjula B K", score: 73 },
    { teamId: 5, name: "ApahaShakti", leader: "Dr. Chandrashekharappa Agasnalli", score: 93 },
    { teamId: 6, name: "Ashwamedha", leader: "Dr. Mallikarjuna Gowda C.P", score: 70 },
    { teamId: 7, name: "AswamedhaX", leader: "Dr. N Rakesh", score: 90 },
    { teamId: 8, name: "CHAAM", leader: "Mrs. Annapareddy Haarika", score: 70 },
    { teamId: 9, name: "CHAAM", leader: "Mrs. Annapareddy Haarika", score: 70 },
    { teamId: 10, name: "Code of Karna", leader: "Ms. Ashwitha K", score: 78 },
    { teamId: 11, name: "cybersena", leader: "Dr.Sagargouda Patil", score: 55 },
    { teamId: 12, name: "Digital Dream Venture Smart Kit", leader: "Dr. Drakshaveni G", score: 75 },
    { teamId: 13, name: "Ananta", leader: "Dr. Paramita Sarkar", score: 75 },
    { teamId: 14, name: "DronAcharya", leader: "Dr. Raju Hajare", score: 86 },
    { teamId: 15, name: "EcoNexCampus", leader: "Dr. Shanthi D L", score: 65 },
    { teamId: 16, name: "ELITE", leader: "Dr. Veena N", score: 65 },
    { teamId: 17, name: "Face Track", leader: "Dr. Suryakanth B", score: 85 },
    { teamId: 18, name: "Green AI", leader: "Dr. Athiyamaan V", score: 81 },
    { teamId: 19, name: "GreenByte", leader: "Mr. Ajith S", score: 89 },
    { teamId: 20, name: "Hackademia United", leader: "Mr. Shobhit Tembhre", score: 92 },
    { teamId: 21, name: "Heart-Guard 360 Wings", leader: "Dr. Anitha V R", score: 91 },
    { teamId: 22, name: "Infinity Loops", leader: "Mrs. S Packiya Lekshmi", score: 72 },
    { teamId: 23, name: "Intel Tech", leader: "Mrs. Reshma C R", score: 60 },
    { teamId: 24, name: "Jeevadhara", leader: "Mr. Dwarakanath G V", score: 80 },
    { teamId: 25, name: "Jñānī Samūhaḥ", leader: "Dr. Shoba M", score: 82 },
    { teamId: 26, name: "KRISHIMEDHA", leader: "Dr. Ambika G N", score: 88 },
    { teamId: 27, name: "Lady Logicians", leader: "Ms. Brunda S", score: 80 },
    { teamId: 28, name: "MY3S", leader: "Mr. Yatheesh N G", score: 84 },
    { teamId: 29, name: "NeoPredict", leader: "Dr. Aparna K", score: 81 },
    { teamId: 30, name: "NeuroAura", leader: "Dr. Mutyala Sridevi", score: 90 },
    { teamId: 31, name: "PentaCoders", leader: "Dr. Mohan B A", score: 74 },
    { teamId: 32, name: "Ping Intelligent", leader: "Dr. Dhanalakshmi B K", score: 83 },
    { teamId: 33, name: "PRECOL", leader: "Mr. A Venkatesh", score: 75 },
    { teamId: 34, name: "Rescue Net", leader: "Unknown", score: 82 },
    { teamId: 35, name: "Silicon Squad", leader: "Mr. Beerappa Belasakarge", score: 78 },
    { teamId: 36, name: "Solution Makers", leader: "Mrs. Belji T", score: 70 },
    { teamId: 37, name: "SPUNK", leader: "Dr. Usha B A", score: 86 },
    { teamId: 38, name: "Synergy Innovations", leader: "Dr. B.R. Arun Kumar", score: 84 },
    { teamId: 39, name: "TECH FORGE", leader: "Dr. Anitha M", score: 88 },
    { teamId: 40, name: "Tech Titans", leader: "Ms. Renita Blossom Monteiro", score: 82 },
     { teamId: 41, name: "Tejaswi", leader: "Dr. Sumathi M S", score: 85 },
    { teamId: 42, name: "vinyas2025", leader: "Dr. Vinutha K", score: 65 },
    { teamId: 43, name: "YantraMinds", leader: "Dr. Bharathi Malakreddy A", score: 82 },
    { teamId: 44, name: "ನವೋನ್ಮೇಷ", leader: "Dr. Marsh M Bandi", score: 90 }
  ];

  // Sort by score descending
  const sorted = [...rawTeams].sort((a, b) => b.score - a.score);

  // Assign competition-style ranks
 let currentRank = 1;
let lastScore = null;
const ranked = [];

sorted.forEach((team) => {
  if (team.score !== lastScore) {
    currentRank = ranked.length + 1; // compact rank
  }
  ranked.push({ ...team, rank: currentRank });
  lastScore = team.score;
});
  const handleBackClick = () => {
    window.history.back();
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
          <div className="mb-6">
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
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] sm:tracking-[0.3em] text-black uppercase mb-3 sm:mb-4">
                Innovate • Collaborate • Elevate
              </h2>
              <div className="w-12 sm:w-16 md:w-20 h-0.5 bg-black mx-auto"></div>
            </div>

            <div className="mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-black leading-[0.9] mb-3 sm:mb-4">
                REBOOT
                <br />
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">LEADERBOARD</span>
              </h1>
            </div>
          </div>

          {/* Leaderboard Container */}
          <div>
            <div className="bg-white border-2 border-black shadow-xl h-[500px] sm:h-[600px] flex flex-col">
              {/* Table Header */}
              <div className="bg-black text-white p-3 sm:p-4 flex-shrink-0">
                <h3 className="text-base sm:text-lg md:text-xl font-black tracking-wide uppercase">
                  Current Team Rankings
                </h3>
              </div>

              {/* Leaderboard Table */}
              <div className="flex-1 overflow-y-auto overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b-2 border-gray-300 sticky top-0">
                    <tr>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-black text-black uppercase tracking-wide">
                        Rank
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-black text-black uppercase tracking-wide">
                        Team
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-black text-black uppercase tracking-wide hidden sm:table-cell">
                        Leader
                      </th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-black text-black uppercase tracking-wide">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranked.map((team, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-gray-200 hover:bg-amber-50 transition-colors ${
                          team.rank <= 3 ? 'bg-amber-50/50' : ''
                        }`}
                      >
                        <td className="px-3 sm:px-4 py-2 sm:py-3">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm sm:text-base font-black ${
                              team.rank === 1 ? 'text-yellow-600' :
                              team.rank === 2 ? 'text-gray-500' :
                              team.rank === 3 ? 'text-amber-700' :
                              'text-black'
                            }`}>
                              #{team.rank}
                            </span>
                            {team.rank === 1 && <span className="text-lg">🥇</span>}
                            {team.rank === 2 && <span className="text-lg">🥈</span>}
                            {team.rank === 3 && <span className="text-lg">🥉</span>}
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3">
                          <div className="font-bold text-xs sm:text-sm text-black">
                            {team.name}
                          </div>
                          <div className="text-xs text-gray-600 sm:hidden mt-1">
                            {team.leader}
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hidden sm:table-cell">
                          {team.leader}
                        </td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-center">
                          <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-black ${
                            team.score >= 90 ? 'bg-green-100 text-green-800' :
                            team.score >= 80 ? 'bg-blue-100 text-blue-800' :
                            team.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                            team.score > 0 ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {team.score}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="bg-gray-50 p-3 sm:p-4 border-t-2 border-gray-200 flex-shrink-0">
                <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs text-gray-600 font-medium">
                  <div className="w-6 sm:w-8 h-px bg-gray-400"></div>
                  <span className="tracking-wider uppercase">Updated with latest scores</span>
                  <div className="w-6 sm:w-8 h-px bg-gray-400"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="text-center mt-6 sm:mt-8">
            <div className="max-w-2xl mx-auto text-xs text-gray-600">
              <p>
                Rankings based on latest scores. Tied teams share the same rank.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;