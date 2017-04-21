var ffmpeg = require('fluent-ffmpeg')

module.exports = function convertToWav(pathToFile) {
  console.log(pathToFile)
  var fileName = ('audio' + Date.now() + '.wav')

  return new Promise((resolve, reject) => {
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
}
