import React, { useState, useCallback } from 'react';
import CircleOfFifths from './components/CircleOfFifths';
import InfoPanel from './components/InfoPanel';
import Controls from './components/Controls';

const App: React.FC = () => {
  const [selectedKeyIndex, setSelectedKeyIndex] = useState(0); // C Major by default

  const handleKeySelect = useCallback((index: number) => {
    setSelectedKeyIndex(index);
  }, []);

  const handleRotateLeft = useCallback(() => {
    setSelectedKeyIndex(prevIndex => (prevIndex - 1 + 12) % 12);
  }, []);

  const handleRotateRight = useCallback(() => {
    setSelectedKeyIndex(prevIndex => (prevIndex + 1) % 12);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center p-4 overflow-hidden">
      <header className="text-center mb-4 md:mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Circle of Fifths Explorer
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl text-sm md:text-base">
          An interactive tool for composers and musicians. Click a major chord, drag the circle, or use the buttons to select a key.
        </p>
      </header>
      
      <main className="flex flex-col xl:flex-row items-center justify-center gap-8 lg:gap-12 w-full max-w-screen-2xl">
        <div className="flex flex-col items-center gap-2">
          <CircleOfFifths
            selectedKeyIndex={selectedKeyIndex}
            onKeySelect={handleKeySelect}
            onRotateLeft={handleRotateLeft}
            onRotateRight={handleRotateRight}
          />
          <Controls 
            onRotateLeft={handleRotateLeft}
            onRotateRight={handleRotateRight}
          />
        </div>
        <div className="w-full xl:max-w-sm flex justify-center">
          <InfoPanel 
            selectedKeyIndex={selectedKeyIndex}
          />
        </div>
      </main>
    </div>
  );
};

export default App;