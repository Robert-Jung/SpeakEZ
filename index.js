var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var convertToWav = require('./convert-to-wav')
var deleteAudioBlob = require('./delete-audioBlob')
var deleteWav = require('./delete-wav')
var searchString = require('./find-search-string')
var findProduct = require('./find-product')
var callWatson = require('./call-watson')

var products = [
  {
    upc: '1234',
    name: 'hot wheels',
    inventory: 12,
  },
  {
    upc: '5784',
    name: 'doll',
    inventory: 23,
  },
  {
    upc: '0012',
    name: 'catan',
    inventory: 50,
  }
]

var app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var upload = multer({ dest:'tmp/' })

app.post('/command', upload.single('file'), (req, res) => {
  console.log(req.file)
  convertToWav(req.file.path)
    .then( fileName => {
      deleteAudioBlob(req.file.path)
      return callWatson('./transcribe/' + fileName)
    }).then( result => {
      deleteWav(result.audioFile)
      return searchString(result.transcription)
    }).then( productData => {
      return findProduct(productData, products)
    }).then( product => {
      console.log(product)
      res.json(product)
    }).catch( (error) => {
      res.send(error)
  })
})

app.post('/newinventory', (req, res) => {
    var newInventory = req.body
    products.push(newInventory)
    res.status(201).json(products)
})

var port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Listening on port 3000')
})
