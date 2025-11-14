import React from 'react';

interface CircleSegmentProps {
  angle: number;
  innerRadius: number;
  outerRadius: number;
  background: string;
  isClickable: boolean;
  onClick: () => void;
  borderColor: string;
  isTonic: boolean;
}

const CircleSegment: React.FC<CircleSegmentProps> = ({
  angle,
  innerRadius,
  outerRadius,
  background,
  isClickable,
  onClick,
  borderColor,
  isTonic,
}) => {
  const segmentAngleRad = (30 * Math.PI) / 180;
  const halfAngle = segmentAngleRad / 2;

  const p1x = 50 + outerRadius * Math.sin(-halfAngle);
  const p1y = 50 - outerRadius * Math.cos(-halfAngle);
  const p2x = 50 + outerRadius * Math.sin(halfAngle);
  const p2y = 50 - outerRadius * Math.cos(halfAngle);
  const p3x = 50 + innerRadius * Math.sin(halfAngle);
  const p3y = 50 - innerRadius * Math.cos(halfAngle);
  const p4x = 50 + innerRadius * Math.sin(-halfAngle);
  const p4y = 50 - innerRadius * Math.cos(-halfAngle);

  const clipPath = `polygon(${p1x}% ${p1y}%, ${p2x}% ${p2y}%, ${p3x}% ${p3y}%, ${p4x}% ${p4y}%)`;

  const borderStyle: React.CSSProperties = {};
  if (borderColor) {
    borderStyle.border = `${isTonic ? '2px' : '1px'} solid ${borderColor}`;
  }


  return (
    <div
      className="absolute top-0 left-0 w-full h-full"
      style={{ transform: `rotate(${angle}deg)`}}
      onClick={isClickable ? onClick : undefined}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full transition-colors duration-300 ${isClickable ? 'cursor-pointer' : ''}`}
        style={{ clipPath }}
      >
        <div className="w-full h-full" style={{background: background, ...borderStyle}} />
      </div>
    </div>
  );
};

export default CircleSegment;