
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, isActive = false }) => {
  const baseClasses = 'bg-white shadow-lg rounded-lg p-4 sm:p-6 transition-all duration-200 ease-in-out';
  const interactiveClasses = onClick ? `cursor-pointer hover:shadow-xl hover:scale-105 transform ${isActive ? 'ring-2 ring-sky-500 scale-105 shadow-xl' : 'hover:ring-1 hover:ring-sky-300'}` : '';
  
  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
