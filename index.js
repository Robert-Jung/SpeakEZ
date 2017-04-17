var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var convertToWav = require('./convert-to-wav')
var deleteWav = require('./delete-wav')
var callWatson = require('./call-watson')

var app = express()
app.use(express.static('public'))
app.use(bodyParser.json())

var upload = multer({ dest:'tmp/' })

app.post('/tmp', upload.single('file'), (req,res) => {
  console.log(req.file)
  convertToWav(req.file.path)
    .then((fileName) => {
      deleteWav(req.file.path)
      return callWatson('./transcribe/' + fileName)
    })
    .then((transcription) => {
      res.json(transcription)
    })
    .catch( () => {
      res.sendStatus(500)
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
