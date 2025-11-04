export enum ChordQuality {
  MAJOR = 'Major',
  MINOR = 'Minor',
  DIMINISHED = 'Diminished',
  MODE = 'Mode',
  INTERVAL = 'Interval',
}

export interface CirclePosition {
  major: string;
  minor: string;
  diminished: string;
  sharps: number;
  flats: number;
}

export interface DiatonicChord {
  numeral: string;
  name: string;
  quality: ChordQuality;
}

export interface Chord {
  name: string;
  notes: string[];
}