const Ffmpeg = require('ffmpeg')

module.exports = function convertVideo(file) {
  const process = new Ffmpeg('public/uploads/' + file)
  return process
    .then((video) => {
      video
        .setVideoFormat('mp4')
        .save('public/uploads/' + file + '.mp4', (error) => {
          if (!error) {
            console.log(file)
          }
        })
    })
}
