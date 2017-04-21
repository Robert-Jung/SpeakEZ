preloader(false)

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
      preloader(true)
      uploadFile(blob)
      preloader(false)
    }
  }

  document.getElementById('record').addEventListener('click', () => {
    preloader(true)
    recorder.start()
  })
  document.getElementById('stopRecord').addEventListener('click', () => {
    preloader(false)
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
  }).catch(error => {
    console.log('Request Failed')
  })
}

function renderAll(product, transcription) {
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
    var collection = renderAll(responseObject.data, responseObject.transcription)
    var $product = collection[0]
    var $transcription = collection[1]
    document.querySelector('#list-products').appendChild($product)
    document.querySelector('#transcribed-text').appendChild($transcription)
    preloader(false)
  }
  else if (responseObject.command === 'enter code') {
    var input = document.querySelector('#upc')
    input.value = responseObject.data
    input.focus()
    preloader(false)
  }
  else if (responseObject.command === 'enter name') {
    var input = document.querySelector('#name')
    input.value = responseObject.data
    input.focus()
    preloader(false)
  }
  else if (responseObject.command === 'enter inventory') {
    var input = document.querySelector('#inventory')
    input.value = responseObject.data
    input.focus()
    preloader(false)
  }
  else if (responseObject.command === 'confirm') {
    var confirm = document.querySelector('#confirm')
    confirm.click()
  }
  else if (responseObject.command === 'error') {
    alert('Please input correct keyword')
  }
}

function uploadForm() {
  var data = {
    upc: document.querySelector('#upc').value,
    name: document.querySelector('#name').value,
    inventory: document.querySelector('#inventory').value
  }

  fetch('/newinventory', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.json()
  }).then( data => {
    for (var i = 0; i < data.length; i++) {
      var $product = renderProduct(data[i])
      document.querySelector('#list-products').appendChild($product)

    }
  }).catch(error => {
    console.log('Request Failed')
  })
}

function renderProduct(product) {
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

  return $product
}

function preloader(loading) {
  var bar = document.querySelector('#preloader')

  if (loading) {
    bar.classList.add('progress')
  } else {
    bar.classList.remove('progress')
  }
}

document.querySelector('#confirm').addEventListener('click', e => {
  e.preventDefault()
  uploadForm()
  preloader(false)
})
