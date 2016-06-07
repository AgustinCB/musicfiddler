'use strict'

import * as utils from './utils'
import * as music from './musicdata'

export const Status = utils.Enum({
  'STOPPED': 0,
  'CLICKING': 1
})

export default class Metronome {
  constructor (bpm, note_context, ontick) {
    this._bpm = bpm
    if (this._bpm < 0) {
      throw new Error('You can\'t use negative bpms')
    }
    this._status = Status['STOPPED']
    this._interval = -1
    this._ontick = ontick

    this.note_context = note_context
    this.note_node = this.note_context.createOscillator()
    this.gain_node = this.note_context.createGain()

    this.note_node.frequency.value = music.getNoteFrequency('E')
    this.gain_node.gain.value = 0
    this.note_node.connect(this.gain_node)
    this.gain_node.connect(this.note_context.destination)
    this.note_node.start()
  }

  start () {
    if (!(Status['CLICKING'] !== this._status && this._bpm && this._bpm > 0)) {
      return this
    }
    this._interval = 60 / this._bpm * 1000
    this._clock = setInterval(this._click.bind(this), this._interval)
    this._status = Status['CLICKING']
    return this
  }

  stop () {
    this._status = Status['STOPPED']
    clearInterval(this._clock)
    return this
  }

  _click () {
    this.gain_node.gain.value = 3

    setTimeout(() => { this.gain_node.gain.value = 0 }, 100)

    if (this._ontick) this._ontick()
  }

  isRunning () {
    return Status['CLICKING'] === this._status
  }

  get bpm () {
    return this._bpm
  }

  set bpm (bpm) {
    this._bpm = bpm
    if (this._status === Status['CLICKING']) {
      this.stop()
      this.start()
    }
  }

  close () {
    this.note_node.stop()
    return this
  }
}
