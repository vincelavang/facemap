import React from 'react'
import MediaCapturer from 'react-multimedia-capture'
import { Pie, Bar } from 'react-chartjs-2'

export default class VideoRecord extends React.Component {
  constructor() {
    super()
    this.state = {
      granted: false,
      rejectedReason: '',
      recording: false,
      paused: false
    }
    this.$video = null

    this.handleGranted = this.handleGranted.bind(this)
    this.handleDenied = this.handleDenied.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.setStreamToVideo = this.setStreamToVideo.bind(this)
    this.releaseStreamFromVideo = this.releaseStreamFromVideo.bind(this)
    this.downloadVideo = this.downloadVideo.bind(this)
  }
  handleGranted() {
    this.setState({ granted: true })
    console.log('Permission Granted!')
  }
  handleDenied(err) {
    this.setState({ rejectedReason: err.name })
    console.log('Permission Denied!', err)
  }
  handleStart(stream) {
    this.setState({
      recording: true
    })

    this.setStreamToVideo(stream)
    console.log('Recording Started.')
  }
  handleStop(blob) {
    this.setState({
      recording: false
    })

    this.props.handleStop()

    const data = new FormData()
    data.append('upl', blob)
    fetch('/uploads', { method: 'POST', body: data })
      .then(response => {
        response.json()
          .then(jsonData => {
            console.log(jsonData)

            let EmotionData = Object.keys(jsonData.VideoFrameResults[0].FaceAnalysisResults[0].EmotionResult)
            let MetricData = Object.keys(jsonData.VideoFrameResults[0].FaceAnalysisResults[0].MetricResult)
            let emoLabels = []
            let emoData = []
            let metLabels = []
            let metData = []
            for (var key in EmotionData) {
              if (EmotionData[key] !== 'Computed') {
                emoLabels.push(EmotionData[key])
                emoData.push(jsonData.VideoFrameResults[0].FaceAnalysisResults[0].EmotionResult[EmotionData[key]])
              }
            }

            for (key in MetricData) {
              if (MetricData[key] !== 'Computed') {
                metLabels.push(MetricData[key])
                metData.push(jsonData.VideoFrameResults[0].FaceAnalysisResults[0].MetricResult[MetricData[key]])
              }
            }

            let emotionData = {
              labels: emoLabels,
              datasets: [{
                data: emoData,
                backgroundColor: [
                  '#FF6384',
                  '#4BC0C0',
                  '#FFCE56',
                  '#E7E9ED',
                  '#36A2EB',
                  'orange',
                  'purple'
                ]
              }]
            }
            let metricData = {
              labels: metLabels,
              datasets: [{
                label: 'Metrics',
                backgroundColor: 'rgba(255,99,132,0.4)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                data: metData
              }
              ]
            }
            this.setState({emotionData: emotionData, metricData: metricData})
          })
      })

    this.releaseStreamFromVideo()
  }

  handleError(err) {
    console.log(err)
  }
  setStreamToVideo(stream) {

    if (window.URL) {
      this.$video.src = window.URL.createObjectURL(stream)
    }
    else {
      this.$video.src = stream
    }
  }
  releaseStreamFromVideo() {
    this.$video.src = ''
  }
  downloadVideo(blob) {
    let url = URL.createObjectURL(blob)
    let a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.target = '_blank'
    document.body.appendChild(a)

    a.click()
  }
  render() {
    return (
      <div id='camera'>
        <MediaCapturer
          constraints={{ audio: true, video: true }}
          timeSlice={10}
          onGranted={this.handleGranted}
          onDenied={this.handleDenied}
          onStart={this.handleStart}
          onStop={this.handleStop}
          onError={this.handleError}
          render={({ start, stop }) =>
            <div>
              <button onClick={start}>Start</button>
              <button onClick={stop}>Stop</button>
              <span><h3>Video Recorder</h3></span>
              <video id='video' ref={($video) => {
                this.$video = $video
              }} autoPlay></video>
            </div>} />
        <Pie data={this.state.emotionData} width={300} height={300} />
        { this.state.metricData === undefined ? '' : <Bar data={this.state.metricData} width={500} height={500} />
        }
      </div>
    )
  }
}
