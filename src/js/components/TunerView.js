'use strict'

import Tuner from '../tools/Tuner'

export default class TunerView extends React.Component {
  constructor (props) {
    super(props)
    if (props.route) props = props.route

    this.handleNoteChange = this.handleNoteChange.bind(this)
    this._tuner = new Tuner(props.note_context, props.stream, this.handleNoteChange)
    this.state = { note: this._tuner.note, frequency: 0 }
  }

  handleNoteChange (dominant_frequency) {
    this.setState({ note: dominant_frequency.name, frequency: dominant_frequency.frequency })
  }

  render () {
    return (
      <div className='tuner-container'>
        <div className='tuner-note'>
          {this.state.note}
        </div>
        <div className='tuner-frequency'>
          {this.state.frequency}
        </div>
      </div>
    )
  }
}
