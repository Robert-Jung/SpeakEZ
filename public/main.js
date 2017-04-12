function createAudioElement (blobURL) {
  var audio = document.createElement('audio')
  audio.setAttribute('src', blobURL)
  audio.setAttribute('controls', 'controls')

  return audio
}

navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    var chunks = [];
    var recorder = new MediaRecorder(stream)

    recorder.ondataavailable = e => {
      chunks.push(e.data)

      if (recorder.state == 'inactive') {
          const blob = new Blob(chunks, { type: 'audio/wav' })
          const blobURL = URL.createObjectURL(blob)
          const audioElement = createAudioElement(blobURL)
          document.querySelector('#audioPlayback').appendChild(audioElement)
      }
    }

    document.getElementById('record').addEventListener('click', () => {
      recorder.start()
    })
    document.getElementById('stopRecord').addEventListener('click', () => {
      recorder.stop()
    })

  }).catch(console.error)
