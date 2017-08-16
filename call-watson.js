//Send Watson API wav file to be transcribed.

var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')
var fs = require('fs')
require('dotenv').config()

module.exports = function callWatson(audioFile) {
  return new Promise((resolve, reject) => {
    var speech_to_text = new SpeechToTextV1({
      access_key_id: process.env.USERNAME_KEY,
      secret_access_key: process.env.PASSWORD_KEY,
      headers: {
        'X-Watson-Learning-Opt-Out': 'true'
      }
    })

    var params = {
      audio: fs.createReadStream(audioFile),
      content_type: 'audio/wav'
    }

    speech_to_text.recognize(params, (err,res) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(res.results[0].alternatives[0].transcript.trim())
      }
    })
  })
}
