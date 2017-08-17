const Ffmpeg = require('ffmpeg')
const getEmoVu = require('./emovu')

module.exports = function convertVideo(file, res) {
  const process = new Ffmpeg('public/uploads/' + file)
  return process
    .then((video) => {
      video
        .setVideoFormat('mp4')
        .save('public/uploads/' + file + '.mp4', (error) => {
          if (!error) {
            getEmoVu(file, res)
          }
        })
    })
}
