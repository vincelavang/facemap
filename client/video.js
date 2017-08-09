import React from 'react'

export default class Video extends React.Component {
  render() {
    return (
      <div>
        <div id='video-size'>
          <div className='embed-responsive embed-responsive-16by9'>
            <iframe className='embed-responsive-item' src={this.props.url} frameBorder='0' allowFullScreen></iframe>
          </div>
        </div>
      </div>
    )
  }
}
