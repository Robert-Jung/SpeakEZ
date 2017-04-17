var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')
var fs = require('fs')

module.exports = function callWatson(audioFile) {
  var speech_to_text = new SpeechToTextV1({
    username: "913fcb97-7161-40a4-be85-539b7cd4037c",
    password: "B2n3Q23KKYeV",
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
      console.log(err)
    }
    else {
      console.log(JSON.stringify(res, null, 2))
    }
  })

}
