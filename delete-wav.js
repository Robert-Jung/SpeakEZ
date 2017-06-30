//Delete temporary wav file.

module.exports = function deleteWav(pathToFile) {
  var fs = require('fs')
  fs.unlinkSync(pathToFile, (err) => {
    if (err) {
      return console.error(err)
    }
    console.log('File Deleted!!')
  })
}
