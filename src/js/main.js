'use strict'

import AppView from './components/AppView'

function start () {
  navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia)

  let note_context

  navigator.getUserMedia({ 'audio': true }, (stream) => {
    note_context = new AudioContext()

    ReactDOM.render(
      <AppView note_context={note_context} stream={stream} />,
      document.getElementById('main')
    )
  }, (error) => {
    throw error
  })
}

window.addEventListener('load', start)
