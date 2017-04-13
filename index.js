var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')
var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')

var app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

var upload = multer({ destin: 'audio/'})

app.post('/audio', upload.single('file'), (req,res) => {
  console.log(req.file)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
