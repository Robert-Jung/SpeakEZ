var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')
var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var ffmpeg = require('fluent-ffmpeg')
var convertToWav = require('./convert-to-wav')

var app = express()
app.use(express.static('public'))
app.use(bodyParser.json())

//upload audio blob and convert to audio wav
var upload = multer({ dest:'tmp/' })

app.post('/tmp', upload.single('file'), (req,res) => {
  console.log(req.file)
  convertToWav(req.file.path)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(() => {
      res.sendStatus(500)
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
