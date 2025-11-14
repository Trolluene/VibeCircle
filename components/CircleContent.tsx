import React from 'react';
import { Chord, ChordQuality } from '../types';
import { NOTE_COLORS, NOTE_POSITION_MAP } from '../constants';
import { getRootNote } from '../utils/musicTheory';

interface CircleContentProps {
  chord: Chord;
  quality: ChordQuality;
}

const CircleContent: React.FC<CircleContentProps> = ({ chord, quality }) => {
  
  if (quality === ChordQuality.INTERVAL) {
    const [line1, line2] = chord.name.split('\n');
    return (
      <div className="text-center text-gray-600 font-medium text-[9px] xs:text-[10px] sm:text-xs leading-snug">
        <div>{line1}</div>
        {line2 && <div>{line2}</div>}
      </div>
    );
  }

  if (quality === ChordQuality.MODE) {
    return (
      <div className="text-center">
        <span className="font-bold text-white uppercase tracking-wider text-[10px] xs:text-xs sm:text-sm md:text-base">
          {chord.name}
        </span>
      </div>
    );
  }
  
  const rootNoteOfChord = getRootNote(chord.name);
  const colorIndex = NOTE_POSITION_MAP.get(rootNoteOfChord) ?? 0;
  const color = NOTE_COLORS[colorIndex] || '#9ca3af';

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-0.5 sm:gap-1">
        <div
          className="px-1 py-0.5 sm:px-2 rounded-md flex items-center justify-center min-w-[24px] sm:min-w-[32px] md:min-w-[40px]"
          style={{ backgroundColor: color }}
        >
          <span className="font-bold text-white text-[10px] xs:text-xs sm:text-sm md:text-base">
            {chord.name}
          </span>
        </div>
        <div className="flex items-center justify-center gap-0.5 h-2 xs:h-2.5 sm:h-2.5">
          {chord.notes.slice(0,4).map((note, i) => {
            const rootNoteOfNote = getRootNote(note);
            const noteColorIndex = NOTE_POSITION_MAP.get(rootNoteOfNote) ?? 0;
            return (
              <div
                key={i}
                className="w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2 sm:h-2 rounded-full border border-gray-300"
                style={{ backgroundColor: NOTE_COLORS[noteColorIndex] }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CircleContent;