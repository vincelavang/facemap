import React from 'react'
import ReactDOM from 'react-dom'
import Webcam from 'react-webcam'
import VideoPlaylist from './video-playlist'

const $app = document.querySelector('#app')

class App extends React.Component {
  handleClick(url) {
    console.log(url)
  }
  render() {
    return (
      <div>
        <Webcam
          height='350'
          width='350'/>
        <VideoPlaylist handleClick={this.handleClick} />
      </div>
    )
  }

}

ReactDOM.render(<App/>, $app)
