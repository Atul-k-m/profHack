import React from 'react';

const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
  const baseClasses = "font-bold tracking-wide uppercase transition-all duration-200 border-2 border-black";
  const variants = {
    primary: "bg-black text-white hover:bg-white hover:text-black",
    secondary: "bg-white text-black hover:bg-black hover:text-white",
    danger: "bg-red-500 text-white hover:bg-red-600 border-red-500"
  };
  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;