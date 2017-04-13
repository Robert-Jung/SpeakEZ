var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')
var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(express.static('public'))

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
