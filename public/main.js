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
