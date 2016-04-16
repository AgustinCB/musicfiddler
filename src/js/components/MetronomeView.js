'use strict'

import Metronome from '../tools/Metronome'

export default class MetronomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = { metronome: new Metronome(props.bpm) }
    this.handleStart = this.handleStart.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleBpmChange = this.handleBpmChange.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.metronome.isRunning() !== this.state.metronome.isRunning()
  }

  handleStart () {
    this.setState({ metronome: this.state.metronome.start() })
  }

  handleStop () {
    this.setState({ metronome: this.state.metronome.stop() })
  }

  handleBpmChange (event) {
    this.setState({ metronome: this.state.metronome.setBpm(event.target.value) })
  }

  render () {
    return (
      <div className='metronome-container'>
        <div className='metronome-status'>
          {this.state.metronome.isRunning() ? 'Running' : 'Stopped'}
        </div>
        <div className='metronome-controls'>
          <input placeholder='BPM' onChange={this.handleBpmChange} />
          <button onClick={this.handleStart}>Start</button>
          <button onClick={this.handleStop}>Stop</button>
        </div>
      </div>
    )
  }
}
