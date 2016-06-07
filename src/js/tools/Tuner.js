'use strict'

import * as music from './musicdata'

// Based on http://jonathan.bergknoff.com/journal/making-a-guitar-tuner-html5
export default class Tuner {
  constructor (audio_context, stream, onNoteUpdate) {
    this.audio_context = audio_context
    this.microphone = this.audio_context.createMediaStreamSource(stream)
    this.script_processor = this.audio_context.createScriptProcessor(1024, 1, 1)
    window.source = this.microphone // Workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=934512

    this.script_processor.connect(this.audio_context.destination)
    this.microphone.connect(this.script_processor)

    this.test_frequencies = []
    for (let i = 0; i < 30; i++) {
      let note_frequency = music.C2 * Math.pow(2, i / 12)
      let note_name = music.notes[i % 12]
      let note = { 'frequency': note_frequency, 'name': note_name }
      let just_above = { 'frequency': note_frequency * Math.pow(2, 1 / 48), 'name': note_name + ' (a bit sharp)' }
      let just_below = { 'frequency': note_frequency * Math.pow(2, -1 / 48), 'name': note_name + ' (a bit flat)' }
      this.test_frequencies = this.test_frequencies.concat([ just_below, note, just_above ])
    }

    this.buffer = []
    this.sample_length_milliseconds = 100
    this.recording = true

    this._currentNote = 'None'
    this._onNoteUpdate = onNoteUpdate

    this.script_processor.onaudioprocess = this.captureAudio.bind(this)
  }

  captureAudio (event) {
    if (!this.recording) return

    this.buffer = this.buffer.concat(Array.prototype.slice.call(event.inputBuffer.getChannelData(0)))
    let sample_rate = this.audio_context.sampleRate
    if (this.buffer.length > this.sample_length_milliseconds * sample_rate / 1000) {
      this.recording = false

      let scale_factor = 2 * Math.PI / sample_rate

      this.interpretCorrelations(this.test_frequencies.map((f) => {
        let accumulator = [ 0, 0 ]
        for (var t = 0; t < this.buffer.length; t++) {
          accumulator[0] += this.buffer[t] * Math.cos(scale_factor * f.frequency * t)
          accumulator[1] += this.buffer[t] * Math.sin(scale_factor * f.frequency * t)
        }
        return accumulator
      }))

      this.buffer = []
      setTimeout(() => { this.recording = true }, 250)
    }
  }

  interpretCorrelations (frequency_amplitudes) {
    let magnitudes = frequency_amplitudes.map((z) => z[0] * z[0] + z[1] * z[1])
    let maximum_index = -1
    let maximum_magnitude = 0

    for (var i = 0; i < magnitudes.length; i++) {
      if (magnitudes[i] <= maximum_magnitude) continue

      maximum_index = i
      maximum_magnitude = magnitudes[i]
    }

    let average = magnitudes.reduce((a, b) => a + b, 0) / magnitudes.length
    let confidence = maximum_magnitude / average
    let confidence_threshold = 10
    if (confidence > confidence_threshold) {
      this._currentNote = this.test_frequencies[maximum_index].name
      this._onNoteUpdate(this.test_frequencies[maximum_index])
    }
  }

  get note () {
    return this._currentNote
  }
}
