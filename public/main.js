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
    var $listProducts = document.querySelector('#list-products')
    $listProducts.appendChild($product)
  }).catch(error => {
    console.log('Request Failed')
  })
}

function renderProduct(product) {
  var $product = document.createElement('tr')
  var $upc = document.createElement('td')
  var $name = document.createElement('td')
  var $inventory = document.createElement('td')
  var $price = document.createElement('td')

  $upc.textContent = product.upc
  $name.textContent = product.name
  $inventory.textContent = product.inventory
  $price.textContent = '$' + product.price

  $product.appendChild($upc)
  $product.appendChild($name)
  $product.appendChild($inventory)
  $product.appendChild($price)

  return $product
}
