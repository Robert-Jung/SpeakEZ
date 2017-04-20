navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
  var recorder = new MediaRecorder(stream)
  var audioElement = document.querySelector('#audioPlayback')
  let blobURL

  recorder.ondataavailable = e => {
    var chunks = [e.data]

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
  }).then( json => {
    console.log(json)
    checkCommand(json)
  })
.catch(error => {
    console.log('Request Failed')
  })
}

function renderProduct(product, transcription) {
  var collection = []

  var $product = document.createElement('tr')
  var $upc = document.createElement('td')
  var $name = document.createElement('td')
  var $inventory = document.createElement('td')

  $upc.textContent = product.upc
  $name.textContent = product.name
  $inventory.textContent = product.inventory

  $product.appendChild($upc)
  $product.appendChild($name)
  $product.appendChild($inventory)

  var $transcription = document.createElement('span')
  $transcription.textContent = transcription

  collection.push($product)
  collection.push($transcription)

  return collection
}

function checkCommand(responseObject) {
  if (responseObject.command === 'search') {
    var collection = renderProduct(responseObject.data, responseObject.transcription)
    var $product = collection[0]
    var $transcription = collection[1]
    document.querySelector('#list-products').appendChild($product)
    document.querySelector('#transcribed-text').appendChild($transcription)
  }
  else if (responseObject.command === 'enter code') {
    var input = document.querySelector('#upc')
    input.value = responseObject.data
    input.focus()
  }
  else if (responseObject.command === 'enter name') {
    var input = document.querySelector('#name')
    input.value = responseObject.data
    input.focus()
  }
  else if (responseObject.command === 'enter inventory') {
    var input = document.querySelector('#inventory')
    input.value = responseObject.data
    input.focus()
  }
  else if (responseObject.command === 'confirm') {

  }
  else if (responseObject.command === 'error') {
    alert('Please input correct keyword')
  }
}
