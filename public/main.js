navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
  var chunks = [];
  var recorder = new MediaRecorder(stream)
  var audioElement = document.querySelector('#audioPlayback')
  let blobURL

  recorder.ondataavailable = e => {
    chunks.push(e.data)

    if (recorder.state === 'inactive') {
      if (blobURL) {
        URL.revokeObjectURL(blobURL)
      }
      const blob = new Blob(chunks, { type: 'audio/wav' })
      blobURL = URL.createObjectURL(blob)
      audioElement.setAttribute('src', blobURL)
      uploadFile(blob)
    }
  }

  document.getElementById('record').addEventListener('click', () => {
    recorder.start()
  })
  document.getElementById('stopRecord').addEventListener('click', () => {
    recorder.stop()
  })

}).catch(console.error)

function uploadFile(blob) {
  let formData = new FormData()
  formData.append('file', blob, 'audio.wav')

  fetch('/command', {
    method: 'POST',
    body: formData
  }).then(response => {
    return response.json()
  }).then(json => {
    var transcriptionBox = document.getElementById('transcribed-text')
    transcriptionBox.innerHTML = json
  }).catch(error => {
    console.log('Request Failed')
  })
}

function searchString(transcription) {
  var space = ' '
  var searchArray = (transcription.split(space))
  var isSearch = searchArray.includes('search')

  if (!isSearch) {
    console.log('Please use keyword \"search\" followed by upc numbers')
  }
  else {
    findValue(searchArray)
  }
}

function findValue(arr) {
 var newNumber = []
 var numbers = [
  { name: 'one', value: 1},
  { name: 'two', value: 2},
  { name: 'three', value: 3},
  { name: 'four', value: 4},
  { name: 'five', value: 5},
  { name: 'six', value: 6},
  { name: 'seven', value: 7},
  { name: 'eight', value: 8},
  { name: 'nine', value: 9},
  { name: 'zero', value: 0}
  ]

  for (var i = 0; i < numbers.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      if (arr[j] === numbers[i].name) {
        newNumber.push(numbers[i].value)
      }
    }
  } return newNumber.join('')
}

function fetchProduct() {
  var fetchPromise = fetch('/product')
  var productPromise = fetchPromise.then(res => {
    return res.json()
  })
  return productPromise
}

function renderProduct(product) {
  var $product = document.createElement('row')
  var $upc = document.createElement('div')
  var $name = document.createElement('div')
  var $inventory = document.createElement('div')
  var $price = document.createElement('div')

  $upc.textContent = product.upc
  $name.textContent = product.name
  $inventory.textContent = product.inventory
  $price.textContent = '$' + product.price

  $upc.setAttribute('class','col-md-2')
  $name.setAttribute('class', 'col-md-4')
  $inventory.setAttribute('class','col-md-2')
  $inventory.setAttribute('class','col-md-2')

  $product.appendChild($upc)
  $product.appendChild($name)
  $product.appendChild($inventory)
  $product.appendChild($price)

  return $product
}

var $main = document.querySelector('#main')

fetchProduct()
  .then(products => {
    return products.map(renderProduct)
  }).then($products => {
    $products.forEach($product => {
      $main.appendChild($product)
    })
  })
