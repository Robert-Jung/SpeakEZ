module.exports = function convertToWav(pathToFile) {
  return new Promise((resolve, reject) => {
    ffmpeg(pathToFile)
      .toFormat('wav')
      .on('error', () => {
        reject()
      })
      .on('end', () => {
        resolve()
        console.log('Finished!')
      })
      .save('./transcribe/audio' + Date.now() + '.wav')
  })
}
