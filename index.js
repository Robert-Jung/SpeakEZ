var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')
var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var ffmpeg = require('fluent-ffmpeg')
var audio = '/Users/home/watson/upload/6004f5b2bc5ab26d0fa7573d46b9bafb'

var app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

//upload audio
var upload = multer({ dest: 'upload/'})

app.post('/upload', upload.single('file'), (req,res) => {
  console.log(req.file)
  res.sendStatus(200)
})

//convert audio
ffmpeg(audio)
.toFormat('wav')
.on('error', () => {
  console.log('An error has occured ')
})
.on('end', () => {
  console.log('Finished!')
})
.save('./upload/audio.wav')

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
