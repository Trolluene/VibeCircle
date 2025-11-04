import React, { useMemo } from 'react';
import type { DiatonicChord, CirclePosition } from '../types';
import { POSITIONAL_DATA, DIATONIC_CHORDS_FOR_KEY } from '../constants';

interface InfoPanelProps {
  selectedKeyIndex: number;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedKeyIndex }) => {
    const selectedKey: CirclePosition = POSITIONAL_DATA[selectedKeyIndex];

    const diatonicChords = useMemo((): DiatonicChord[] => {
      return DIATONIC_CHORDS_FOR_KEY[selectedKey.major] || [];
    }, [selectedKey.major]);

    const displayName = selectedKey.major.replace('b', '♭');

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200 w-full max-w-sm mx-auto">
      <div className="text-center mb-4 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">{displayName} <span className="text-gray-500 font-normal">Ionian</span></h2>
        <p className="text-gray-500 mt-1">{selectedKey.minor} is the relative minor</p>
        <div className="mt-2 text-sm text-gray-500 font-medium">
            {selectedKey.sharps > 0 && <span>{selectedKey.sharps} Sharp{selectedKey.sharps > 1 ? 's' : ''}</span>}
            {selectedKey.flats > 0 && <span>{selectedKey.flats} Flat{selectedKey.flats > 1 ? 's' : ''}</span>}
            {selectedKey.sharps === 0 && selectedKey.flats === 0 && <span>No Sharps or Flats</span>}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800 text-center">Diatonic Chords</h3>
        <ul className="space-y-2">
            {diatonicChords.map(chord => (
                 <li key={chord.numeral} className="flex justify-start items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <span className="font-mono font-bold text-blue-600 w-14 text-center text-lg">{chord.numeral}</span>
                    <span className="font-semibold text-gray-800 text-lg">{chord.name.replace('b', '♭')}</span>
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default InfoPanel;