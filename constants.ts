import { Chord, ChordQuality, CirclePosition, DiatonicChord } from './types';

export const MODES: { name: string; position: number }[] = [
    { name: 'Ionian', position: 0 }, { name: 'Lydian', position: 1 },
    { name: 'Mixolydian', position: 11 }, { name: 'Dorian', position: 10 },
    { name: 'Aeolian', position: 9 }, { name: 'Phrygian', position: 8 },
    { name: 'Locrian', position: 7 },
];

export const INTERVAL_NAMES: string[] = [
  'Tonic', 'Perfect\n5th', 'Major\n2nd', 'Major\n6th', 'Major\n3rd', 'Major\n7th',
  'Tritone', 'Minor\n2nd', 'Minor\n6th', 'Minor\n3rd', 'Minor\n7th', 'Perfect\n4th'
];

// New data structure for Roman numerals based on relative position on the circle.
// This ensures 100% accuracy with the reference image.
export const RELATIVE_POSITION_NUMERALS = [
  // 0: Tonic Position
  { major: 'I', minor: 'vi', diminished: 'vii°' },
  // 1: One step clockwise (Perfect 5th)
  { major: 'V', minor: 'iii', diminished: '#iv°' },
  // 2: Two steps clockwise (Major 2nd)
  { major: 'II', minor: 'vii', diminished: '#i°' },
  // 3: Three steps clockwise (Major 6th)
  { major: 'VI', minor: '#iv', diminished: '#v°' },
  // 4: Four steps clockwise (Major 3rd)
  { major: 'III', minor: '#i', diminished: '#ii°' },
  // 5: Five steps clockwise (Major 7th)
  { major: 'vii', minor: '#v', diminished: '#vi°' },
  // 6: Six steps clockwise (Tritone)
  { major: '#iv°', minor: 'biii', diminished: 'iii°' }, // Note: F# Major is technically #IV, but the chord itself is diminished in the key of C. Using the dim numeral from the image.
  // 7: Seven steps clockwise / Five steps counter-clockwise (Minor 2nd)
  { major: 'bII', minor: 'bvii', diminished: 'i°' },
  // 8: Eight steps clockwise / Four steps counter-clockwise (Minor 6th)
  { major: 'bVI', minor: 'iv', diminished: 'v°' },
  // 9: Nine steps clockwise / Three steps counter-clockwise (Minor 3rd)
  { major: 'bIII', minor: 'i', diminished: 'ii°' },
  // 10: Ten steps clockwise / Two steps counter-clockwise (Minor 7th)
  { major: 'bVII', minor: 'v', diminished: 'vi°' },
  // 11: Eleven steps clockwise / One step counter-clockwise (Perfect 4th)
  { major: 'IV', minor: 'ii', diminished: 'iii°' },
];


export const CHROMATIC_NOTE_MAP: { [note: string]: number } = {
  'B#': 0, 'C': 0,
  'C#': 1, 'Db': 1,
  'D': 2,
  'D#': 3, 'Eb': 3,
  'E': 4, 'Fb': 4,
  'F': 5, 'E#': 5,
  'F#': 6, 'Gb': 6,
  'G': 7,
  'G#': 8, 'Ab': 8,
  'A': 9,
  'A#': 10, 'Bb': 10,
  'B': 11, 'Cb': 11,
};


// This new unified structure is the single source of truth for positional data.
export const POSITIONAL_DATA: CirclePosition[] = [
  // major, minor, diminished, sharps, flats
  { major: 'C', minor: 'Am', diminished: 'B°', sharps: 0, flats: 0 },
  { major: 'G', minor: 'Em', diminished: 'F#°', sharps: 1, flats: 0 },
  { major: 'D', minor: 'Bm', diminished: 'C#°', sharps: 2, flats: 0 },
  { major: 'A', minor: 'F#m', diminished: 'G#°', sharps: 3, flats: 0 },
  { major: 'E', minor: 'C#m', diminished: 'D#°', sharps: 4, flats: 0 },
  { major: 'B', minor: 'G#m', diminished: 'A#°', sharps: 5, flats: 0 },
  { major: 'F#', minor: 'D#m', diminished: 'E#°', sharps: 6, flats: 0 },
  { major: 'Db', minor: 'Bbm', diminished: 'C°', sharps: 0, flats: 5 },
  { major: 'Ab', minor: 'Fm', diminished: 'G°', sharps: 0, flats: 4 },
  { major: 'Eb', minor: 'Cm', diminished: 'D°', sharps: 0, flats: 3 },
  { major: 'Bb', minor: 'Gm', diminished: 'A°', sharps: 0, flats: 2 },
  { major: 'F', minor: 'Dm', diminished: 'E°', sharps: 0, flats: 1 },
];

export const DIATONIC_CHORDS_FOR_KEY: { [key: string]: DiatonicChord[] } = {
  'C': [
    { numeral: 'I', name: 'C', quality: ChordQuality.MAJOR },
    { numeral: 'ii', name: 'Dm', quality: ChordQuality.MINOR },
    { numeral: 'iii', name: 'Em', quality: ChordQuality.MINOR },
    { numeral: 'IV', name: 'F', quality: ChordQuality.MAJOR },
    { numeral: 'V', name: 'G', quality: ChordQuality.MAJOR },
    { numeral: 'vi', name: 'Am', quality: ChordQuality.MINOR },
    { numeral: 'vii°', name: 'B°', quality: ChordQuality.DIMINISHED },
  ],
  'G': [
    { numeral: 'I', name: 'G', quality: ChordQuality.MAJOR },
    { numeral: 'ii', name: 'Am', quality: ChordQuality.MINOR },
    { numeral: 'iii', name: 'Bm', quality: ChordQuality.MINOR },
    { numeral: 'IV', name: 'C', quality: ChordQuality.MAJOR },
    { numeral: 'V', name: 'D', quality: ChordQuality.MAJOR },
    { numeral: 'vi', name: 'Em', quality: ChordQuality.MINOR },
    { numeral: 'vii°', name: 'F#°', quality: ChordQuality.DIMINISHED },
  ],
  'D': [
    { numeral: 'I', name: 'D', quality: ChordQuality.MAJOR },
    { numeral: 'ii', name: 'Em', quality: ChordQuality.MINOR },
    { numeral: 'iii', name: 'F#m', quality: ChordQuality.MINOR },
    { numeral: 'IV', name: 'G', quality: ChordQuality.MAJOR },
    { numeral: 'V', name: 'A', quality: ChordQuality.MAJOR },
    { numeral: 'vi', name: 'Bm', quality: ChordQuality.MINOR },
    { numeral: 'vii°', name: 'C#°', quality: ChordQuality.DIMINISHED },
  ],
  'A': [
    { numeral: 'I', name: 'A', quality: ChordQuality.MAJOR },
    { numeral: 'ii', name: 'Bm', quality: ChordQuality.MINOR },
    { numeral: 'iii', name: 'C#m', quality: ChordQuality.MINOR },
    { numeral: 'IV', name: 'D', quality: ChordQuality.MAJOR },
    { numeral: 'V', name: 'E', quality: ChordQuality.MAJOR },
    { numeral: 'vi', name: 'F#m', quality: ChordQuality.MINOR },
    { numeral: 'vii°', name: 'G#°', quality: ChordQuality.DIMINISHED },
  ],
  'E': [
    { numeral: 'I', name: 'E', quality: ChordQuality.MAJOR },
    { numeral: 'ii', name: 'F#m', quality: ChordQuality.MINOR },
    { numeral: 'iii', name: 'G#m', quality: ChordQuality.MINOR },
    { numeral: 'IV', name: 'A', quality: ChordQuality.MAJOR },
    { numeral: 'V', name: 'B', quality: ChordQuality.MAJOR },
    { numeral: 'vi', name: 'C#m', quality: ChordQuality.MINOR },
    { numeral: 'vii°', name: 'D#°', quality: ChordQuality.DIMINISHED },
  ],
  'B': [
    { numeral: 'I', name: 'B', quality: ChordQuality.MAJOR },
    { numeral: 'ii', name: 'C#m', quality: ChordQuality.MINOR },
    { numeral: 'iii', name: 'D#m', quality: ChordQuality.MINOR },
    { numeral: 'IV', name: 'E', quality: ChordQuality.MAJOR },
    { numeral: 'V', name: 'F#', quality: ChordQuality.MAJOR },
    { numeral: 'vi', name: 'G#m', quality: ChordQuality.MINOR },
    { numeral: 'vii°', name: 'A#°', quality: ChordQuality.DIMINISHED },
  ],
  'F#': [
    { numeral: 'I', name: 'F#', quality: ChordQuality.MAJOR },
    { numeral: 'ii', name: 'G#m', quality: ChordQuality.MINOR },
    { numeral: 'iii', name: 'A#m', quality: ChordQuality.MINOR },
    { numeral: 'IV', name: 'B', quality: ChordQuality.MAJOR },
    { numeral: 'V', name: 'C#', quality: ChordQuality.MAJOR },
    { numeral: 'vi', name: 'D#m', quality: ChordQuality.MINOR },
    { numeral: 'vii°', name: 'E#°', quality: ChordQuality.DIMINISHED },
  ],
   'Db': [
    { numeral: 'I', name: 'Db', quality: ChordQuality.MAJOR },
    { numeral: 'ii', name: 'Ebm', quality: ChordQuality.MINOR },
    { numeral: 'iii', name: 'Fm', quality: ChordQuality.MINOR },
    { numeral: 'IV', name: 'Gb', quality: ChordQuality.MAJOR },
    { numeral: 'V', name: 'Ab', quality: ChordQuality.MAJOR },
    { numeral: 'vi', name: 'Bbm', quality: ChordQuality.MINOR },
    { numeral: 'vii°', name: 'C°', quality: ChordQuality.DIMINISHED },
  ],
  'Ab': [
    { numeral: 'I', name: 'Ab', quality: ChordQuality.MAJOR },
    { numeral: 'ii', name: 'Bbm', quality: ChordQuality.MINOR },
    { numeral: 'iii', name: 'Cm', quality: ChordQuality.MINOR },
    { numeral: 'IV', name: 'Db', quality: ChordQuality.MAJOR },
    { numeral: 'V', name: 'Eb', quality: ChordQuality.MAJOR },
    { numeral: 'vi', name: 'Fm', quality: ChordQuality.MINOR },
    { numeral: 'vii°', name: 'G°', quality: ChordQuality.DIMINISHED },
  ],
  'Eb': [
    { numeral: 'I', name: 'Eb', quality: ChordQuality.MAJOR },
    { numeral: 'ii', name: 'Fm', quality: ChordQuality.MINOR },
    { numeral: 'iii', name: 'Gm', quality: ChordQuality.MINOR },
    { numeral: 'IV', name: 'Ab', quality: ChordQuality.MAJOR },
    { numeral: 'V', name: 'Bb', quality: ChordQuality.MAJOR },
    { numeral: 'vi', name: 'Cm', quality: ChordQuality.MINOR },
    { numeral: 'vii°', name: 'D°', quality: ChordQuality.DIMINISHED },
  ],
  'Bb': [
    { numeral: 'I', name: 'Bb', quality: ChordQuality.MAJOR },
    { numeral: 'ii', name: 'Cm', quality: ChordQuality.MINOR },
    { numeral: 'iii', name: 'Dm', quality: ChordQuality.MINOR },
    { numeral: 'IV', 'name': 'Eb', quality: ChordQuality.MAJOR },
    { numeral: 'V', name: 'F', quality: ChordQuality.MAJOR },
    { numeral: 'vi', 'name': 'Gm', quality: ChordQuality.MINOR },
    { numeral: 'vii°', name: 'A°', quality: ChordQuality.DIMINISHED },
  ],
  'F': [
    { numeral: 'I', name: 'F', quality: ChordQuality.MAJOR },
    { numeral: 'ii', name: 'Gm', quality: ChordQuality.MINOR },
    { numeral: 'iii', name: 'Am', quality: ChordQuality.MINOR },
    { numeral: 'IV', name: 'Bb', quality: ChordQuality.MAJOR },
    { numeral: 'V', name: 'C', quality: ChordQuality.MAJOR },
    { numeral: 'vi', name: 'Dm', quality: ChordQuality.MINOR },
    { numeral: 'vii°', name: 'E°', quality: ChordQuality.DIMINISHED },
  ],
};

// A new, flat map for easier lookup of chord note data.
export const CHORD_NOTES_MAP: { [name: string]: Chord } = {
    // Major 7ths
    'C': { name: 'C', notes: ['C', 'E', 'G', 'B'] },
    'G': { name: 'G', notes: ['G', 'B', 'D', 'F#'] },
    'D': { name: 'D', notes: ['D', 'F#', 'A', 'C#'] },
    'A': { name: 'A', notes: ['A', 'C#', 'E', 'G#'] },
    'E': { name: 'E', notes: ['E', 'G#', 'B', 'D#'] },
    'B': { name: 'B', notes: ['B', 'D#', 'F#', 'A#'] },
    'F#': { name: 'F#', notes: ['F#', 'A#', 'C#', 'E#'] },
    'Db': { name: 'Db', notes: ['Db', 'F', 'Ab', 'C'] },
    'Ab': { name: 'Ab', notes: ['Ab', 'C', 'Eb', 'G'] },
    'Eb': { name: 'Eb', notes: ['Eb', 'G', 'Bb', 'D'] },
    'Bb': { name: 'Bb', notes: ['Bb', 'D', 'F', 'A'] },
    'F': { name: 'F', notes: ['F', 'A', 'C', 'E'] },
    // Minor 7ths
    'Am': { name: 'Am', notes: ['A', 'C', 'E', 'G'] },
    'Em': { name: 'Em', notes: ['E', 'G', 'B', 'D'] },
    'Bm': { name: 'Bm', notes: ['B', 'D', 'F#', 'A'] },
    'F#m': { name: 'F#m', notes: ['F#', 'A', 'C#', 'E'] },
    'C#m': { name: 'C#m', notes: ['C#', 'E', 'G#', 'B'] },
    'G#m': { name: 'G#m', notes: ['G#', 'B', 'D#', 'F#'] },
    'D#m': { name: 'D#m', notes: ['D#', 'F#', 'A#', 'C#'] },
    'A#m': { name: 'A#m', notes: ['A#', 'C#', 'E#', 'G#'] },
    'Bbm': { name: 'Bbm', notes: ['Bb', 'Db', 'F', 'Ab'] },
    'Fm': { name: 'Fm', notes: ['F', 'Ab', 'C', 'Eb'] },
    'Cm': { name: 'Cm', notes: ['C', 'Eb', 'G', 'Bb'] },
    'Gm': { name: 'Gm', notes: ['G', 'Bb', 'D', 'F'] },
    'Dm': { name: 'Dm', notes: ['D', 'F', 'A', 'C'] },
    // Diminished (m7b5)
    'B°': { name: 'B°', notes: ['B', 'D', 'F', 'A'] },
    'F#°': { name: 'F#°', notes: ['F#', 'A', 'C', 'E'] }, // Corrected notes for F# half-diminished
    'C#°': { name: 'C#°', notes: ['C#', 'E', 'G', 'B'] }, // Corrected notes
    'G#°': { name: 'G#°', notes: ['G#', 'B', 'D', 'F#'] }, // Corrected notes
    'D#°': { name: 'D#°', notes: ['D#', 'F#', 'A', 'C#'] }, // Corrected notes
    'A#°': { name: 'A#°', notes: ['A#', 'C#', 'E', 'G#'] },
    'E#°': { name: 'E#°', notes: ['E#', 'G#', 'B', 'D#'] },
    'C°': { name: 'C°', notes: ['C', 'Eb', 'Gb', 'Bb'] },
    'G°': { name: 'G°', notes: ['G', 'Bb', 'Db', 'F'] },
    'D°': { name: 'D°', notes: ['D', 'F', 'Ab', 'C'] },
    'A°': { name: 'A°', notes: ['A', 'C', 'Eb', 'G'] },
    'E°': { name: 'E°', notes: ['E', 'G', 'Bb', 'D'] },
};


// Mapping note names to their position on the circle for coloring
const notePositionData: { [note: string]: number } = {
  'C': 0, 'B#': 0,
  'G': 1,
  'D': 2,
  'A': 3,
  'E': 4,
  'B': 5,
  'F#': 6, 'Gb': 6,
  'Db': 7, 'C#': 7,
  'Ab': 8, 'G#': 8,
  'Eb': 9, 'D#': 9,
  'Bb': 10, 'A#': 10,
  'F': 11, 'E#': 11,
};
export const NOTE_POSITION_MAP = new Map(Object.entries(notePositionData));

export const NOTE_COLORS = [
  '#ef4444', // C (0) - Red
  '#f97316', // G (1) - Orange
  '#f59e0b', // D (2) - Amber
  '#eab308', // A (3) - Yellow
  '#84cc16', // E (4) - Lime
  '#2dd4bf', // B (5) - Teal
  '#22d3ee', // F# (6) - Cyan
  '#38bdf8', // Db (7) - Light Blue
  '#3b82f6', // Ab (8) - Blue
  '#6366f1', // Eb (9) - Indigo
  '#8b5cf6', // Bb (10) - Violet
  '#a855f7', // F (11) - Purple
];