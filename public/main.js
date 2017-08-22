preloader(false)

let createModal = (modalContent) => {
  let modal = document.createElement("div"),
      modalStyle = document.createElement("style"),
      modalCSS = '.js-modal{ position: absolute; top: 8%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, .1); max-width: 650px; border-radius: 5px; } .js-modal-inner{ position: relative; padding: 10px; } .js-modal-close{ position: absolute; top: -10px; right: -10px; background-color: black; color: #eee; border-width: 0; font-size: 10px; height: 24px; width: 24px; border-radius: 100%; text-align: center; }',
      modalClose = '<button class="js-modal-close" id="js_modal_close">X</button>',
      theBody = document.getElementsByTagName('body')[0],
      theHead = document.getElementsByTagName('head')[0];

  modal.setAttribute("class", "js-modal");
  modal.innerHTML = '<div class="js-modal-inner">' + modalContent + modalClose + '</div>';
  theBody.appendChild(modal);

  modalClose = document.querySelector("#js_modal_close");

  if(modalStyle.styleSheet){
      modalStyle.styleSheet.cssText = modalCSS;
  } else {
      modalStyle.appendChild(document.createTextNode(modalCSS));
  }
  theHead.appendChild(modalStyle);

  if(modalClose) {
    modalClose.addEventListener('click', () => {
      modal.remove();
      modalStyle.remove();
    });
  }
}

window.addEventListener('load', function() {
  createModal('Try it out! Please press start and say "search one two three four", then press stop. Other commands: enter code, enter name, enter inventory, confirm.(e.g. "Enter name chair")');
});

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
  preloader(true)

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
  var collection = renderAll(responseObject.data, responseObject.transcription)
  var $product = collection[0]
  var $transcription = collection[1]
  var $error = document.createElement('span')
  $error.textContent = `Sorry I couldn\'t understand you, please try again.`

  if (responseObject.command === 'search') {
    document.querySelector('#transcribed-text').textContent = ''
    document.querySelector('#list-products').appendChild($product)
    document.querySelector('#transcribed-text').appendChild($transcription)
    preloader(false)
  }
  else if (responseObject.command === 'enter code') {
    document.querySelector('#transcribed-text').textContent = ''
    document.querySelector('#transcribed-text').appendChild($transcription)
    var input = document.querySelector('#upc')
    input.value = responseObject.data
    input.focus()
    preloader(false)
  }
  else if (responseObject.command === 'enter name') {
    document.querySelector('#transcribed-text').textContent = ''
    document.querySelector('#transcribed-text').appendChild($transcription)
    var input = document.querySelector('#name')
    input.value = responseObject.data
    input.focus()
    preloader(false)
  }
  else if (responseObject.command === 'enter inventory') {
    document.querySelector('#transcribed-text').textContent = ''
    document.querySelector('#transcribed-text').appendChild($transcription)
    var input = document.querySelector('#inventory')
    input.value = responseObject.data
    input.focus()
    preloader(false)
  }
  else if (responseObject.command === 'confirm') {
    document.querySelector('#transcribed-text').textContent = ''
    document.querySelector('#transcribed-text').appendChild($transcription)
    var confirm = document.querySelector('#confirm')
    confirm.click()
  }
  else if (responseObject.command === 'error') {
    document.querySelector('#transcribed-text').textContent = ''
    document.querySelector('#transcribed-text').appendChild($error)
    alert('Please input correct keyword')
    preloader(false)
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
