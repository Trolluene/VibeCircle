import React, { useMemo, useRef, useEffect } from 'react';
import { POSITIONAL_DATA, MODES, RELATIVE_POSITION_NUMERALS, INTERVAL_NAMES } from '../constants';
import { getChordNotes } from '../utils/musicTheory';
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
    const DIATONIC_POSITIONS = [0, 1, 11]; 
    const selectedKeyName = POSITIONAL_DATA[selectedKeyIndex].major;

    return rings.flatMap(ring => 
      Array.from({ length: 12 }, (_, i) => {
        const isChordRing = [ChordQuality.MAJOR, ChordQuality.MINOR, ChordQuality.DIMINISHED].includes(ring.quality);
        const dataIndex = isChordRing ? (i + selectedKeyIndex) % 12 : i;
        const posData = POSITIONAL_DATA[dataIndex];
        
        let chordName: string;
        switch (ring.quality) {
          case ChordQuality.MAJOR: chordName = posData.major; break;
          case ChordQuality.MINOR: chordName = posData.minor; break;
          case ChordQuality.DIMINISHED: chordName = posData.diminished; break;
          case ChordQuality.MODE: chordName = MODES.find(m => m.position === i)?.name || ''; break;
          case ChordQuality.INTERVAL: chordName = INTERVAL_NAMES[i]; break;
          default: chordName = '';
        }

        const isDiatonicMajor = ring.quality === ChordQuality.MAJOR && DIATONIC_POSITIONS.includes(i);
        const isDiatonicMinor = ring.quality === ChordQuality.MINOR && DIATONIC_POSITIONS.includes(i);
        const isDiatonicDiminished = ring.quality === ChordQuality.DIMINISHED && i === 0;
        const isDiatonic = isDiatonicMajor || isDiatonicMinor || isDiatonicDiminished;
        
        const isTonic = ring.quality === ChordQuality.MAJOR && i === 0;
        
        const numerals = RELATIVE_POSITION_NUMERALS[i];
        let numeral: string;
         switch (ring.quality) {
            case ChordQuality.MAJOR: numeral = numerals.major; break;
            case ChordQuality.MINOR: numeral = numerals.minor; break;
            case ChordQuality.DIMINISHED: numeral = numerals.diminished; break;
            default: numeral = '';
        }

        const chord = getChordNotes(chordName, selectedKeyName);

        return {
          key: `${ring.quality}-${i}`,
          angle: i * 30,
          innerRadius: ring.innerRadius,
          outerRadius: ring.outerRadius,
          quality: ring.quality,
          chord,
          numeral,
          isDiatonic,
          isTonic,
          isClickable: ring.quality === ChordQuality.MAJOR,
          onClick: ring.quality === ChordQuality.MAJOR ? () => onKeySelect(dataIndex) : () => {},
          position: i,
        };
      })
    ).filter(p => p.chord.name);
  }, [selectedKeyIndex, onKeySelect]);

  const getVisualCenterRadius = (inner: number, outer: number): number => {
    return (inner + outer) / 2;
  };

  // --- Drag-to-Rotate Logic ---
  const circleRef = useRef<HTMLDivElement>(null);
  
  // Use refs to hold the latest callbacks, avoiding stale closures in event listeners
  const onRotateLeftRef = useRef(onRotateLeft);
  const onRotateRightRef = useRef(onRotateRight);
  useEffect(() => {
    onRotateLeftRef.current = onRotateLeft;
    onRotateRightRef.current = onRotateRight;
  }, [onRotateLeft, onRotateRight]);

  useEffect(() => {
    const circleElement = circleRef.current;
    if (!circleElement) return;

    const isDragging = { current: false };
    const dragState = {
      startAngle: 0,
      accumulatedAngle: 0,
      center: { x: 0, y: 0 },
    };

    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      
      const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
      const { center } = dragState;
      const currentAngle = Math.atan2(clientY - center.y, clientX - center.x);
      
      let deltaAngle = currentAngle - dragState.startAngle;
      if (deltaAngle > Math.PI) deltaAngle -= 2 * Math.PI;
      else if (deltaAngle < -Math.PI) deltaAngle += 2 * Math.PI;
      
      dragState.accumulatedAngle += deltaAngle;
      dragState.startAngle = currentAngle;

      const ROTATION_TRIGGER_ANGLE = Math.PI / 6; // 30 degrees

      while (dragState.accumulatedAngle >= ROTATION_TRIGGER_ANGLE) {
        onRotateLeftRef.current(); // Positive angle change = counter-clockwise
        dragState.accumulatedAngle -= ROTATION_TRIGGER_ANGLE;
      }
      while (dragState.accumulatedAngle <= -ROTATION_TRIGGER_ANGLE) {
        onRotateRightRef.current(); // Negative angle change = clockwise
        dragState.accumulatedAngle += ROTATION_TRIGGER_ANGLE;
      }
    };

    const handleDragEnd = () => {
      if (!isDragging.current) return;
      isDragging.current = false;

      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
      circleElement.style.cursor = 'grab';

      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);
    };
    
    const handleDragStart = (e: MouseEvent | TouchEvent) => {
      if (e.type === 'touchstart') e.preventDefault();
      
      isDragging.current = true;
      const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
      
      const rect = circleElement.getBoundingClientRect();
      dragState.center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      dragState.startAngle = Math.atan2(clientY - dragState.center.y, clientX - dragState.center.x);
      dragState.accumulatedAngle = 0;

      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      circleElement.style.cursor = 'grabbing';
      
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleDragMove, { passive: false });
      document.addEventListener('touchend', handleDragEnd);
    };
    
    circleElement.addEventListener('mousedown', handleDragStart);
    circleElement.addEventListener('touchstart', handleDragStart, { passive: false });
    
    return () => {
      circleElement.removeEventListener('mousedown', handleDragStart);
      circleElement.removeEventListener('touchstart', handleDragStart);
      handleDragEnd();
    };
  }, []);

  return (
    <div 
      ref={circleRef}
      className="relative aspect-square w-[320px] xs:w-[384px] sm:w-[512px] md:w-[640px] lg:w-[704px] cursor-grab"
      style={{ touchAction: 'none' }}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        {pieces.map(piece => (
          <CircleSegment
            key={piece.key}
            angle={piece.angle}
            innerRadius={piece.innerRadius}
            outerRadius={piece.outerRadius}
            bgColor={
              piece.quality === ChordQuality.MODE
                ? piece.position % 2 === 0 ? '#4b5563' : '#374151'
                : piece.quality === ChordQuality.INTERVAL
                ? '#e5e7eb'
                : piece.isDiatonic ? '#ffffff' : '#f3f4f6'
            }
            isClickable={piece.isClickable}
            onClick={piece.onClick}
            isDiatonic={piece.isDiatonic}
            isTonic={piece.isTonic}
          />
        ))}

        {pieces.map(piece => {
          const angleRad = (piece.angle * Math.PI) / 180;
          let radius = getVisualCenterRadius(piece.innerRadius, piece.outerRadius);

          if (piece.quality === ChordQuality.MODE) radius -= 2;
          else if (piece.quality !== ChordQuality.INTERVAL) radius -= 1.5;

          const x = 50 + radius * Math.sin(angleRad);
          const y = 50 - radius * Math.cos(angleRad);
          
          const isChordRing = [ChordQuality.MAJOR, ChordQuality.MINOR, ChordQuality.DIMINISHED].includes(piece.quality);
          const transform = `translate(-50%, -50%) rotate(${piece.angle}deg)`;

          return (
             <div
              key={`content-wrapper-${piece.key}`}
              className="absolute pointer-events-none"
              style={{ top: `${y}%`, left: `${x}%`, transform }}
            >
              {isChordRing ? (
                <div className="flex flex-col items-center justify-center gap-0.5 sm:gap-1">
                  <div className="font-mono font-bold text-gray-700 text-[10px] xs:text-xs sm:text-sm md:text-base">
                    {piece.numeral}
                  </div>
                  <CircleContent
                    chord={piece.chord}
                    quality={piece.quality}
                    position={piece.position}
                  />
                </div>
              ) : (
                <CircleContent
                  chord={piece.chord}
                  quality={piece.quality}
                  position={piece.position}
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