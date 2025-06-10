import React, { useState, useRef } from 'react';

const Timeline = () => {
  const [activePhase, setActivePhase] = useState(null);
  const timelineRef = useRef(null);

  const phases = [
    {
      phase: "01",
      title: "Skill Collection",
      date: "10.06.2025 - 14.06.2025",
      action: "Faculty enter their skills and competencies in the hackathon portal"
    },
    {
      phase: "02",
      title: "Team Formation",
      date: "15.06.2025 - 18.06.2025", 
      action: "Identify the team leader and form the team and enter in the hackathon portal"
    },
    {
      phase: "03",
      title: "Idea Problem Pitching",
      date: "27.06.2025",
      action: "Submission of the idea"
    },
    {
      phase: "04",
      title: "Brainstorming Sessions by Industry Experts",
      date: "28.06.2025 (Saturday)",
      action: "Teams present ideas and receive mentor feedback"
    },
    {
      phase: "05",
      title: "Implementation",
      date: "Seven weeks",
      action: "Implementation of the idea and interaction with mentors"
    },
    {
      phase: "06",
      title: "Final Evaluation",
      date: "12.08.2025",
      action: "Final assessment and judging"
    },
    {
      phase: "07",
      title: "Demonstration",
      date: "13.08.2025",
      action: "Project demonstrations and presentations"
    },
    {
      phase: "08",
      title: "Winners",
      date: "Post Event",
      action: "Top three winners announcement"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">

      <div className="fixed inset-0 opacity-5 pointer-events-none">
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

      <div className="relative z-10 py-8 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
         
          <div className="text-center mb-12 md:mb-20">
            <div className="mb-6 md:mb-8">
              <h2 className="text-lg md:text-2xl font-bold tracking-[0.3em] text-black uppercase mb-4">
                EVENT TIMELINE
              </h2>
              <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-black to-transparent mx-auto"></div>
            </div>

            <div className="mb-8 md:mb-10">
              <h1 className="text-3xl md:text-6xl lg:text-8xl font-black tracking-tighter text-black leading-none mb-4 md:mb-6">
                ROADMAP
              </h1>
              <p className="text-base md:text-xl text-gray-700 font-medium tracking-wide max-w-3xl mx-auto leading-relaxed">
                Follow the journey from <span className="font-bold text-black">ideation to innovation</span> through our carefully crafted hackathon experience.
              </p>
            </div>
          </div>

  
          <div className="hidden md:block relative">
            
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-black/20 h-full"></div>
           
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-black"
              style={{ height: '100%' }}
            ></div>

            <div className="space-y-16">
              {phases.map((phase, index) => {
                const isLeft = index % 2 === 0;
                
                return (
                  <div
                    key={index}
                    className={`
                      flex items-center relative
                      ${isLeft ? 'flex-row-reverse' : 'flex-row'}
                    `}
                  >

                    <div 
                      className="w-5/12 cursor-pointer z-10"
                      onMouseEnter={() => setActivePhase(index)}
                      onMouseLeave={() => setActivePhase(null)}
                    >
                      <div className={`
                        bg-white border-2 border-black p-6 relative
                        ${activePhase === index ? 'shadow-2xl border-black' : 'shadow-lg'}
                        ${isLeft ? 'ml-8' : 'mr-8'}
                      `}>
                   
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-lg">
                            {phase.phase}
                          </div>
                          <h3 className="text-2xl font-black tracking-tight uppercase flex-1">
                            {phase.title}
                          </h3>
                        </div>
                      
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-px bg-black" />
                          <div className="w-3 h-3 bg-black transform rotate-45" />
                          <div className="flex-1 h-px bg-black/20" />
                        </div>
                        
                        <div className="text-sm font-bold text-black tracking-wider uppercase mb-4">
                          {phase.date}
                        </div>
                     
                        <p className="text-gray-700 font-medium leading-relaxed">
                          {phase.action}
                        </p>
                        
                        <div className={`
                          absolute top-1/2 transform -translate-y-1/2
                          w-8 h-px bg-black
                          ${isLeft ? '-right-8' : '-left-8'}
                        `}>
                          <div className={`
                            absolute top-1/2 transform -translate-y-1/2
                            w-2 h-2 bg-black rotate-45
                            ${isLeft ? '-right-1' : '-left-1'}
                          `}></div>
                        </div>
                        
                        <div className="absolute top-0 right-0 w-4 h-4 bg-black transform rotate-45 translate-x-2 -translate-y-2" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 bg-black transform rotate-45 -translate-x-1.5 translate-y-1.5" />
                      </div>
                    </div>

                  
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-30">
                      <div className="w-6 h-6 rounded-full border-4 border-white bg-black"></div>
                    </div>

                   
                    <div className="w-5/12"></div>
                  </div>
                );
              })}
            </div>
          </div>

          
          <div className="md:hidden space-y-8">
            {phases.map((phase, index) => (
              <div
                key={index}
                className="relative cursor-pointer"
                onMouseEnter={() => setActivePhase(index)}
                onMouseLeave={() => setActivePhase(null)}
              >
                <div className="flex items-start gap-4">
                  
                  
                  <div className="flex-shrink-0 relative">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-sm tracking-wider">
                      {phase.phase}
                    </div>
                    {index < phases.length - 1 && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-px h-8 bg-black/20" />
                    )}
                  </div>

                  
                  <div className={`
                    flex-1 bg-white text-black p-4 relative border-2 border-black 
                    ${activePhase === index ? 'shadow-xl' : 'shadow-md'}
                  `}>
                    <h3 className="text-lg font-black tracking-tight uppercase mb-3 leading-tight">
                      {phase.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-px bg-black" />
                      <div className="w-2 h-2 bg-black transform rotate-45" />
                      <div className="flex-1 h-px bg-black/20" />
                    </div>
                    
                    <div className="text-xs font-bold text-black tracking-wider uppercase mb-3">
                      {phase.date}
                    </div>
                    <p className="text-gray-700 font-medium text-sm leading-relaxed">
                      {phase.action}
                    </p>
                    
                    <div className="absolute top-0 right-0 w-3 h-3 bg-black transform rotate-45 translate-x-1.5 -translate-y-1.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          
          <div className="mt-16 md:mt-24 text-center">
            <div className="inline-flex items-center gap-4 text-black font-bold tracking-wider uppercase text-sm md:text-base">
              <div className="w-8 md:w-12 h-px bg-black" />
              <span>JOURNEY COMPLETE</span>
              <div className="w-8 md:w-12 h-px bg-black" />
            </div>
          </div>

        </div>
      </div>

      
      <div className="fixed top-20 right-20 w-3 h-3 md:w-4 md:h-4 bg-black/10 transform rotate-45" />
      <div className="fixed bottom-32 left-16 w-4 h-4 md:w-6 md:h-6 bg-black/5 transform rotate-45" />
      <div className="fixed top-1/3 left-10 w-2 h-2 bg-black/20 transform rotate-45" />
    </div>
  );
};

export default Timeline;