var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var convertToWav = require('./convert-to-wav')
var deleteWav = require('./delete-wav')
var callWatson = require('./call-watson')

var products = [
  {
    upc: '1234567890123',
    name: 'hot wheels',
    inventory: 12,
    price: 13.99
  },
  {
    upc: '7089574398512',
    name: 'doll',
    inventory: 23,
    price: 1.99
  },
  {
    upc: '834534845701',
    name: 'catan',
    inventory: 50,
    price: 48.71
  }
]

var app = express()
app.use(express.static('public'))
app.use(bodyParser.json())

var upload = multer({ dest:'tmp/' })

app.post('/command', upload.single('file'), (req, res) => {
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

app.post('/product', (req, res) => {
  var product = req.body
    products.push(product)
})

app.get('/product', (req, res) => {
  res.json(products)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
