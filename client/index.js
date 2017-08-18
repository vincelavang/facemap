import React from 'react'
import ReactDOM from 'react-dom'
import VideoPlaylist from './video-playlist'
import VideoDisplay from './video'
import VideoRecord from './record'

const $app = document.querySelector('#app')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {url: ''}
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(url) {
    this.setState({url: url})
  }
  hideVideo() {
    this.setState({url: ''})
  }
  render() {
    return (
      <div>
        <VideoRecord handleStop={this.hideVideo.bind(this)} />
        <VideoPlaylist handleClick={this.handleClick} />
        <VideoDisplay url={this.state.url} />
      </div>
    )
  }

}

ReactDOM.render(<App />, $app)
