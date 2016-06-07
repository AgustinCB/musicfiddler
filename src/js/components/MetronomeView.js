'use strict'

import Metronome from '../tools/Metronome'

export default class MetronomeView extends React.Component {
  constructor (props) {
    super(props)
    if (props.route) props = props.route
    console.log(props)
    this._metronome = new Metronome(props.bpm, props.note_context)
    this.state = { running: this._metronome.isRunning() }
    this.handleStart = this.handleStart.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleBpmChange = this.handleBpmChange.bind(this)
  }

  handleStart () {
    this.setState({ running: this._metronome.start().isRunning() })
  }

  handleStop () {
    this.setState({ running: this._metronome.stop().isRunning() })
  }

  handleBpmChange (event) {
    this._metronome.bpm = parseInt(event.target.value)
  }

  render () {
    return (
      <div className='metronome-container'>
        <div className='metronome-bpms'>
          {this._metronome.bpm}
        </div>
        <div className='metronome-bpm-selector'>
          <div className='metronome-bpm-selector-control btn btn-theme'>
          </div>
        </div>
        <div className='metronome-controls'>
        </div>
        <div className='metronome-status hidden'>
          {this._metronome.isRunning() ? 'Running' : 'Stopped'}
        </div>
        <div className='metronome-controls hidden'>
          <input placeholder='BPM' onChange={this.handleBpmChange} />
          <button className='btn btn-theme' onClick={this.handleStart}>Start</button>
          <button className='btn btn-theme' onClick={this.handleStop}>Stop</button>
        </div>
      </div>
    )
  }
}

MetronomeView.propTypes = { bpm: React.PropTypes.number }
MetronomeView.defaultTypes = { bpm: 0 }
