import React, { useMemo, useState, useRef } from 'react';
import { POSITIONAL_DATA, MODES, CHORD_NOTES_MAP, RELATIVE_POSITION_NUMERALS, INTERVAL_NAMES } from '../constants';
import { ChordQuality } from '../types';
import CircleSegment from './CircleSegment';
import CircleContent from './CircleContent';

interface CircleOfFifthsProps {
  selectedKeyIndex: number;
  onKeySelect: (index: number) => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
}

interface RingConfig {
  quality: ChordQuality;
  innerRadius: number;
  outerRadius: number;
}

const CircleOfFifths: React.FC<CircleOfFifthsProps> = ({ selectedKeyIndex, onKeySelect, onRotateLeft, onRotateRight }) => {
  const rings: RingConfig[] = [
    { quality: ChordQuality.INTERVAL, innerRadius: 5, outerRadius: 12 },
    { quality: ChordQuality.MAJOR, innerRadius: 12, outerRadius: 23 },
    { quality: ChordQuality.MINOR, innerRadius: 23, outerRadius: 33 },
    { quality: ChordQuality.DIMINISHED, innerRadius: 33, outerRadius: 43 },
    { quality: ChordQuality.MODE, innerRadius: 43, outerRadius: 49 },
  ];

  const pieces = useMemo(() => {
    // These positions (relative to the top 'I' position) are always diatonic.
    const DIATONIC_POSITIONS = [0, 1, 11];

    return rings.flatMap(ring => 
      Array.from({ length: 12 }, (_, i) => {
        const isChordRing = [ChordQuality.MAJOR, ChordQuality.MINOR, ChordQuality.DIMINISHED].includes(ring.quality);
        
        // If it's a chord ring, its content rotates. Get data from a rotated index.
        // Otherwise, for static rings (Modes, Intervals), get data from the static index `i`.
        const dataIndex = isChordRing ? (i + selectedKeyIndex) % 12 : i;
        const posData = POSITIONAL_DATA[dataIndex];
        
        let chordName: string;
        switch (ring.quality) {
          case ChordQuality.MAJOR: chordName = posData.major; break;
          case ChordQuality.MINOR: chordName = posData.minor; break;
          case ChordQuality.DIMINISHED: chordName = posData.diminished; break;
          // Static rings use the non-rotated index `i` for their labels.
          case ChordQuality.MODE: chordName = MODES.find(m => m.position === i)?.name || ''; break;
          case ChordQuality.INTERVAL: chordName = INTERVAL_NAMES[i]; break;
          default: chordName = '';
        }

        // The highlight zone is static, based on the segment's absolute position `i`.
        const isDiatonicMajor = ring.quality === ChordQuality.MAJOR && DIATONIC_POSITIONS.includes(i);
        const isDiatonicMinor = ring.quality === ChordQuality.MINOR && DIATONIC_POSITIONS.includes(i);
        const isDiatonicDiminished = ring.quality === ChordQuality.DIMINISHED && i === 0; // vii° is only at the tonic position.
        const isDiatonic = isDiatonicMajor || isDiatonicMinor || isDiatonicDiminished;
        
        const isTonic = ring.quality === ChordQuality.MAJOR && i === 0;
        
        // Roman numerals are labels for the static slots, so they are based on `i`.
        const numerals = RELATIVE_POSITION_NUMERALS[i];
        let numeral: string;
         switch (ring.quality) {
            case ChordQuality.MAJOR: numeral = numerals.major; break;
            case ChordQuality.MINOR: numeral = numerals.minor; break;
            case ChordQuality.DIMINISHED: numeral = numerals.diminished; break;
            default: numeral = '';
        }

        return {
          key: `${ring.quality}-${i}`,
          angle: i * 30, // Segments are always drawn at the same angle.
          innerRadius: ring.innerRadius,
          outerRadius: ring.outerRadius,
          quality: ring.quality,
          chordName,
          numeral,
          isDiatonic,
          isTonic,
          isClickable: isChordRing,
          // When clicking, select the key of the chord currently in that slot.
          onClick: isChordRing ? () => onKeySelect(dataIndex) : () => {},
          position: i,
        };
      })
    ).filter(p => p.chordName);
  }, [selectedKeyIndex, onKeySelect]);

  const getVisualCenterRadius = (inner: number, outer: number): number => {
    if (outer - inner > 10) {
      return inner * 0.48 + outer * 0.52;
    }
    return (inner + outer) / 2;
  };

  // Drag to rotate logic
  const [isDragging, setIsDragging] = useState(false);
  const lastPos = useRef(0);
  const accumulatedDelta = useRef(0);
  const ROTATION_THRESHOLD = 50; // pixels to drag to trigger one key change

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    lastPos.current = clientX;
    accumulatedDelta.current = 0;
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - lastPos.current;
    lastPos.current = clientX;
    accumulatedDelta.current += deltaX;

    if (accumulatedDelta.current > ROTATION_THRESHOLD) {
      onRotateRight();
      accumulatedDelta.current = 0;
    } else if (accumulatedDelta.current < -ROTATION_THRESHOLD) {
      onRotateLeft();
      accumulatedDelta.current = 0;
    }
  };
  
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  };

  const onMouseDown = (e: React.MouseEvent) => { e.preventDefault(); handleDragStart(e.clientX); };
  const onMouseMove = (e: React.MouseEvent) => { handleDragMove(e.clientX); };
  const onTouchStart = (e: React.TouchEvent) => { handleDragStart(e.touches[0].clientX); };
  const onTouchMove = (e: React.TouchEvent) => { handleDragMove(e.touches[0].clientX); };

  return (
    <div 
      className="relative aspect-square w-[320px] xs:w-[384px] sm:w-[512px] md:w-[640px] lg:w-[704px]"
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={handleDragEnd}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Layer 1: Background Segments */}
        {pieces.map(p => (
          <CircleSegment
            key={p.key}
            angle={p.angle}
            innerRadius={p.innerRadius}
            outerRadius={p.outerRadius}
            bgColor={
              p.quality === ChordQuality.MODE
                ? p.position % 2 === 0 ? '#4b5563' : '#374151'
                : p.quality === ChordQuality.INTERVAL
                ? '#e5e7eb'
                : p.isDiatonic ? '#ffffff' : '#f3f4f6'
            }
            isClickable={p.isClickable}
            onClick={p.onClick}
            isDiatonic={p.isDiatonic}
            isTonic={p.isTonic}
          />
        ))}

        {/* Layer 2: Content (Re-architected with Absolute Positioning) */}
        {pieces.map(p => {
          const angleRad = (p.angle * Math.PI) / 180;
          let radius = getVisualCenterRadius(p.innerRadius, p.outerRadius);

          if (p.quality === ChordQuality.MODE) {
            radius -= 2;
          } else if (p.quality !== ChordQuality.INTERVAL) {
            radius -= 1.5;
          }

          const x = 50 + radius * Math.sin(angleRad);
          const y = 50 - radius * Math.cos(angleRad);
          
          const isChordRing = [ChordQuality.MAJOR, ChordQuality.MINOR, ChordQuality.DIMINISHED].includes(p.quality);
          const transform = `translate(-50%, -50%) rotate(${p.angle}deg)`;

          return (
             <div
              key={`content-wrapper-${p.key}`}
              className="absolute pointer-events-none transition-opacity duration-300"
              style={{
                top: `${y}%`,
                left: `${x}%`,
                transform: transform,
              }}
            >
              {isChordRing ? (
                <div className="flex flex-col items-center justify-center gap-0.5 sm:gap-1">
                  <div className="font-mono font-bold text-gray-700 text-[10px] xs:text-xs sm:text-sm md:text-base">
                    {p.numeral}
                  </div>
                  <CircleContent
                    chord={CHORD_NOTES_MAP[p.chordName] || { name: p.chordName, notes: [] }}
                    quality={p.quality}
                    position={p.position}
                  />
                </div>
              ) : (
                <CircleContent
                  chord={CHORD_NOTES_MAP[p.chordName] || { name: p.chordName, notes: [] }}
                  quality={p.quality}
                  position={p.position}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CircleOfFifths;
