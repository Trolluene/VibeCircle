import { Chord } from '../types';

/**
 * A senior engineer's note:
 * This module centralizes the music theory logic for the application.
 * By generating chord data programmatically, we eliminate the need for large,
 * hardcoded data structures, which were brittle and prone to error. This approach
 * is more scalable, maintainable, and directly applies music theory rules.
 */

// --- Core Music Theory Data ---

// Canonical note names, used for generating chord spellings.
const SHARP_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const FLAT_NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// A comprehensive map to convert any note name (including enharmonics) to its chromatic index (0-11).
const NOTE_INDEX_MAP = new Map<string, number>([
    ['B#', 0], ['C', 0], ['Dbb', 0],
    ['C#', 1], ['Db', 1],
    ['D', 2], ['C##', 2], ['Ebb', 2],
    ['D#', 3], ['Eb', 3],
    ['E', 4], ['Fb', 4], ['D##', 4],
    ['F', 5], ['E#', 5], ['Gbb', 5],
    ['F#', 6], ['Gb', 6],
    ['G', 7], ['F##', 7], ['Abb', 7],
    ['G#', 8], ['Ab', 8],
    ['A', 9], ['G##', 9], ['Bbb', 9],
    ['A#', 10], ['Bb', 10], ['Cbb', 10],
    ['B', 11], ['Cb', 11], ['A##', 11]
]);

// Chord intervals defined by their distance in semitones from the root.
const INTERVALS = {
  MAJOR_THIRD: 4,
  MINOR_THIRD: 3,
  PERFECT_FIFTH: 7,
  DIMINISHED_FIFTH: 6,
  MAJOR_SEVENTH: 11,
  MINOR_SEVENTH: 10,
};

// --- Utility Functions ---

/**
 * Retrieves the note name for a given chromatic index, with spelling
 * determined by the key context (sharps vs. flats).
 * @param index The chromatic index (0-11).
 * @param useSharps - If true, returns sharp notation (e.g., C#); otherwise, returns flat notation (e.g., Db).
 * @returns The note name as a string.
 */
const getNoteFromIndex = (index: number, useSharps: boolean): string => {
  return useSharps ? SHARP_NOTES[index] : FLAT_NOTES[index];
};

/**
 * A robust utility to parse the root note from a chord name string.
 * Handles single-letter, sharp, and flat root notes.
 * e.g., "F#m" -> "F#", "Bb" -> "Bb", "C" -> "C"
 * @param chordName The name of the chord.
 * @returns The root note of the chord.
 */
export const getRootNote = (chordName: string): string => {
  if (chordName.length > 1 && (chordName[1] === '#' || chordName[1] === 'b')) {
    return chordName.substring(0, 2);
  }
  return chordName.substring(0, 1);
};


/**
 * Calculates the notes of a 7th chord based on its name and the current musical key.
 * Handles major 7th, minor 7th, and half-diminished 7th (m7b5) chords.
 * The key context is crucial for correctly spelling notes (e.g., Bb vs A#).
 * @param chordName The full name of the chord (e.g., "Am", "C", "B°").
 * @param keySignatureContext The major key currently selected (e.g., "C", "Eb", "F#").
 * @returns A Chord object with the name and an array of its four notes.
 */
export const getChordNotes = (chordName: string, keySignatureContext: string): Chord => {
    const rootNote = getRootNote(chordName);
    const rootIndex = NOTE_INDEX_MAP.get(rootNote);

    // If the chord name isn't recognized (e.g., it's a mode or interval label),
    // return a default structure to prevent errors.
    if (rootIndex === undefined) {
        return { name: chordName, notes: [] };
    }

    let intervals: number[];

    // Determine the chord quality and select the corresponding intervals.
    if (chordName.includes('m')) { // Minor
        intervals = [0, INTERVALS.MINOR_THIRD, INTERVALS.PERFECT_FIFTH, INTERVALS.MINOR_SEVENTH];
    } else if (chordName.includes('°')) { // Diminished (treated as half-diminished m7b5 for this app)
        intervals = [0, INTERVALS.MINOR_THIRD, INTERVALS.DIMINISHED_FIFTH, INTERVALS.MINOR_SEVENTH];
    } else { // Major
        intervals = [0, INTERVALS.MAJOR_THIRD, INTERVALS.PERFECT_FIFTH, INTERVALS.MAJOR_SEVENTH];
    }
    
    // Determine whether to use sharps or flats based on the key signature.
    // Flat keys are F, Bb, Eb, Ab, Db, Gb. All others (including C) use sharps.
    const flatKeySignatures = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb'];
    const useSharps = !flatKeySignatures.includes(keySignatureContext);

    // Calculate each note in the chord.
    const notes = intervals.map(interval => {
        const noteIndex = (rootIndex + interval) % 12;
        return getNoteFromIndex(noteIndex, useSharps);
    });

    return { name: chordName, notes };
};
