'use strict'

import * as utils from './utils'

export const Status = utils.Enum({
  'STOPPED': 0,
  'CLICKING': 1
})

export default class Metronome {
  constructor (bpm, ontick) {
    this._bpm = bpm
    this._status = Status['STOPPED']
    this._audio = new Audio('/audio/tick.wav')
    this._audio.autoplay = false
    this._interval = -1
    this._ontick = ontick
  }

  start () {
    if (Status['CLICKING'] === this._status) return
    this._interval = 60 / this._bpm * 1000
    this._clock = setInterval(this._click, this._interval)
    this._status = Status['CLICKING']
    return this
  }

  stop () {
    this._status = Status['STOPPED']
    clearInterval(this._clock)
    return this
  }

  _click () {
    this._audio.play()
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
}
