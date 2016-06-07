'use strict'

import Drone from '../tools/Drone'
import * as music from '../tools/musicdata'

export default class DroneView extends React.Component {
  constructor (props) {
    super(props)
    if (props.route) props = props.route
    this._drone = new Drone(props.note, props.note_context)
    this.state = { running: this._drone.isRunning() }
    this.handleStart = this.handleStart.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleNoteChange = this.handleNoteChange.bind(this)
  }

  handleStart () {
    this.setState({ running: this._drone.start().isRunning() })
  }

  handleStop () {
    this.setState({ running: this._drone.stop().isRunning() })
  }

  handleNoteChange (event) {
    this._drone.note = event.target.value
  }

  render () {
    return (
      <div className='drone-container'>
        <div className='drone-status'>
          {this._drone.isRunning() ? 'Running' : 'Stopped'}
        </div>
        <div className='drone-controls'>
          <input placeholder='Note' onChange={this.handleNoteChange} />
          <button onClick={this.handleStart}>Start</button>
          <button onClick={this.handleStop}>Stop</button>
        </div>
      </div>
    )
  }
}

DroneView.propTypes = { note: React.PropTypes.oneOf(music.notes).isRequired }
DroneView.defaultTypes = { note: 'C' }
