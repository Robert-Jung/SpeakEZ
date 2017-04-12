var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')
var fs = require('fs')
var express = require('express')
var app = express()

app.use(express.static('public'))

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

// var speech_to_text = new SpeechToTextV1({
//   username: "913fcb97-7161-40a4-be85-539b7cd4037c",
//   password: "B2n3Q23KKYeV",
//   headers: {
//     'X-Watson-Learning-Opt-Out': 'true'
//   }
// })
//
// var params = {
//   audio: fs.createReadStream(__dirname + '/audio/joey.wav'),
//   content_type: 'audio/wav'
// }
//
// speech_to_text.recognize(params, (err,res) => {
//   if (err) {
//     console.log(err)
//   }
//   else {
//     console.log(JSON.stringify(res, null, 2))
//   }
// })
//
// fs.createReadStream(__dirname + '/audio/joey.wav')
//   .pipe(speech_to_text.createRecognizeStream({content_type: 'audio/wav'}))
//   .pipe(fs.createWriteStream(__dirname + '/transcription.txt'))
