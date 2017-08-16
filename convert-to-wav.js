//Convert audio blob to wav format.

var ffmpeg = require('fluent-ffmpeg')
var fs = require('fs')

module.exports = function convertToWav(pathToFile) {
  var fileName = ('audio' + Date.now() + '.wav')

  return new Promise((resolve, reject) => {
    fs.access('./transcribe', fs.constants.W_OK, (err) => {
      if (err) {
        fs.mkdirSync('./transcribe')
      }
      ffmpeg(pathToFile)
        .toFormat('wav')
        .on('error', (error) => {
          console.log('ffmeg failed to save', error)
          reject()
        })
        .on('end', () => {
          resolve(fileName)
          console.log('Finished!')
        })
      .save('./transcribe/' + fileName)
    })
  })
}
