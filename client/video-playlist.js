import React from 'react'

export default class VideoPlaylist extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-4 pull-right">
            <div id="nike-layer">
              <h2>Video 1</h2>
            </div>
            <div id="nike" className="embed-responsive embed-responsive-16by9">
              <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/dOZxIpy6Gm4?showinfo=0" frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4 pull-right">
            <div id="puppy-layer">
              <h2>Video 2</h2>
            </div>
            <div id="puppy" className="embed-responsive embed-responsive-16by9">
              <iframe className="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/dlNO2trC-mk?showinfo=0" frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4 pull-right">
            <div id="funny-layer">
              <h2>Video 3</h2>
            </div>
            <div id="funny" className="embed-responsive embed-responsive-16by9">
              <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/zv750BWrUhY?showinfo=0" frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
