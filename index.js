var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')
var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var convertToWav = require('./convert-to-wav')
var deleteWav = require('./delete-wav')

var app = express()
app.use(express.static('public'))
app.use(bodyParser.json())

var upload = multer({ dest:'tmp/' })

app.post('/tmp', upload.single('file'), (req,res) => {
  console.log(req.file)
  convertToWav(req.file.path)
    .then( () => {
      deleteWav(req.file.path)
      res.sendStatus(200)
    })
    .catch( () => {
      res.sendStatus(500)
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
