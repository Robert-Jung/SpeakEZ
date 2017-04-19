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
  }).then( json => {
    return renderProduct(json)
  }).then( $product => {
    var $main = document.querySelector('#main')
    $main.appendChild($product)
  }).catch(error => {
    console.log('Request Failed')
  })
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
