
import React from 'react';

interface BackButtonProps {
  onClick: () => void;
  text?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, text = "Kategorietara Itzuli" }) => {
  return (
    <button
      onClick={onClick}
      className="mb-6 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out flex items-center group"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={2} 
        stroke="currentColor" 
        className="w-5 h-5 mr-2 transform transition-transform duration-200 group-hover:-translate-x-1"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
      {text}
    </button>
  );
};

export default BackButton;