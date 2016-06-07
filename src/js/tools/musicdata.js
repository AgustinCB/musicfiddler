'use strict'

export const C2 = 65.41
export const notes = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ]
export function getNoteFrequency (note) {
  var index = notes.indexOf(note)
  if (index === -1) return false

  return C2 * Math.pow(2, index / 12)
}
