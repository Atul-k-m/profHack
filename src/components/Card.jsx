import React from 'react';

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border-2 border-black shadow-lg relative overflow-hidden ${className}`}>
    <div 
      className="absolute inset-0 opacity-5 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, black 1px, transparent 1px),
          linear-gradient(to bottom, black 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}
    />
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

export default Card;