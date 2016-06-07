'use strict'

import MetronomeView from './MetronomeView'
import DroneView from './DroneView'
import TunerView from './TunerView'
import * as data from '../tools/data'

const App = (props) => {
  return (
    <div>
      <div className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <ReactRouter.Link className='navbar-brand' to='/'>{data.appName}</ReactRouter.Link>
          </div>
          <div className="navbar-collapse collapse navbar-right">
            <ul className="nav navbar-nav">
              <li><ReactRouter.Link to='/'>Home</ReactRouter.Link></li>
              <li><ReactRouter.Link className='' to='/metronome'>Metronome</ReactRouter.Link></li>
              <li><ReactRouter.Link to='/tuner'>Tuner</ReactRouter.Link></li>
              <li><ReactRouter.Link to='/drone'>Drone</ReactRouter.Link></li>
            </ul>
          </div>
        </div>
      </div>
	    <div className="container tool-container">
			  <div className="row">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default class AppView extends React.Component {
  constructor (props) {
    super(props)
    
    this.note_context = props.note_context
    this.stream = props.stream
  }

  shouldComponentUpdate () {
    return false
  }
  
  render () {
    return (
      <ReactRouter.Router history={ReactRouter.browserHistory}>
        <ReactRouter.Route path="/" component={App}>
          <ReactRouter.Route path="metronome" component={MetronomeView} note_context={this.note_context} />
          <ReactRouter.Route path="drone" component={DroneView} note_context={this.note_context}/>
          <ReactRouter.Route path="tuner" component={TunerView} note_context={this.note_context} stream={this.stream}/>
        </ReactRouter.Route>
      </ReactRouter.Router>
    )
  }
}