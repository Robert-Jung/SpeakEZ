var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')
var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var ffmpeg = require('fluent-ffmpeg')
var autoReap = require('multer-autoreap')

var app = express()
app.use(express.static('public'))
app.use(bodyParser.json())

//upload audio blob
var upload = multer({ storage: storage })

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp/')
  },
  filename: function (req, file, cb) {
      cb(null,  file.originalname );
  }
});

app.post('/tmp', upload.single('file'), (req,res) => {
  console.log(req.file)
  res.sendStatus(200)
})

//convert audio
var audio = '/tmp/audio'

ffmpeg(audio)
.toFormat('wav')
.on('error', () => {
  console.log('An error has occured ')
})
.on('end', () => {
  console.log('Finished!')
})
.save('./transcribe/audio.wav')

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
