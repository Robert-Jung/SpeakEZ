//Delete audio blob.

module.exports = function deleteAudioBlob(pathToFile) {
  var fs = require('fs')
  fs.unlink(pathToFile, (err) => {
    if (err) {
      return console.error(err)
    }
    console.log('Audio Blob Deleted!')
  })
}
