module.exports = function deleteWav(pathToFile) {
  var fs = require('fs')
  fs.unlink(pathToFile, (err) => {
    if (err) {
      return console.error(err)
    }
    console.log('File Deleted!!')
  })
}
