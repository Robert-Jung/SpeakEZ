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
  var audioFile = convertToWav(req.file.path)
    .then( () => {
      deleteWav(req.file.path)
      res.sendStatus(200)
    })
    .catch( () => {
      res.sendStatus(500)
  })
})

callWatson('/Users/home/watson/transcribe/audio1492206836348.wav')

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
