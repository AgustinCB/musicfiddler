'use strict'

import * as utils from './utils'
import * as music from './musicdata'

export const Status = utils.Enum({
  'STOPPED': 0,
  'RUNNING': 1
})

export default class Tuner {
  constructor (note, note_context) {
    this.note_context = note_context
    this.note_node = this.note_context.createOscillator()
    this.gain_node = this.note_context.createGain()

    this._volume = 2

    if (music.notes.indexOf(note) === -1) note = 'C'
    this._current_note = note
    this.note_node.frequency.value = music.getNoteFrequency(this._current_note)
    this.gain_node.gain.value = 0
    this.note_node.connect(this.gain_node)
    this.gain_node.connect(this.note_context.destination)
    this.note_node.start()
  }

  start () {
    this.gain_node.gain.value = this._volume
    return this
  }

  stop () {
    this.gain_node.gain.value = 0
    return this
  }

  isRunning () {
    return this._status === Status['RUNNING']
  }

  get note () {
    return this._current_note
  }

  set note (note) {
    if (music.notes.indexOf(note) === -1) return
    this._current_note = note
    this.note_node.frequency.value = music.getNoteFrequency(this._current_note)
  }

  get volume () {
    return this._volume
  }

  set volume (volume) {
    this._volume = volume
    if (this._status === Status['RUNNING']) {
      this.gain_node.gain.value = this._volume
    }
  }

  close () {
    this.note_node.stop()
    return this
  }
}
