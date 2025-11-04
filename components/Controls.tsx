import React from 'react';

interface ControlsProps {
  onRotateLeft: () => void;
  onRotateRight: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onRotateLeft, onRotateRight }) => {
  const ArrowLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );

  const ArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <div className="flex items-center justify-center gap-4 my-2 md:my-4">
      <button
        onClick={onRotateLeft}
        aria-label="Rotate key counter-clockwise"
        className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft />
      </button>
      <span className="text-gray-600 font-medium text-sm select-none uppercase tracking-wider">Rotate Key</span>
      <button
        onClick={onRotateRight}
        aria-label="Rotate key clockwise"
        className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all text-gray-600 hover:text-gray-800"
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default Controls;
