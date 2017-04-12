function createAudioElement () {
  var source = document.createElement('source')
}

navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    var chunks = [];
    var recorder = new MediaRecorder(stream)

    recorder.ondataavailable = e => {
      chunks.push(e.data)

      if (recorder.state == 'inactive') {
          const blob = new Blob(chunks, { type: 'audio/wav' })
          createAudioElement(URL.createObjectURL(blob))
      }
    }

    document.getElementById('record').addEventListener('click', () => {
      recorder.start()
    })
    document.getElementById('stopRecord').addEventListener('click', () => {
      recorder.stop()
    })

  }).catch(console.error)


// if (navigator.getUserMedia) {
//   console.log('getUserMedia supported.')
//   var constraints = { audio: true }
// }
// else {
//   console.log('getUserMedia not supported')
// }
//
// var mediaRecorder = new MediaRecorder(stream)
//
// record.onclick = () => {
//   mediaRecorder.start()
//   console.log(mediaRecorder.state)
//   console.log('recording started')
// }
//
// var chunks = []
//
// mediaRecorder.ondataavailable = (audioData) => {
//   chunks.push(audioData.data)
// }
//
// stop.onclick = () => {
//   mediaRecord.stop()
//   console.log(mediaRecorder.state)
//   console.log('stopped recording')
// }

// function createAudioElement(blobURL) {
//   var source = document.createElement('source')
//   source.src = blobURL
//   source.type = 'audio/wav'
// }
//
