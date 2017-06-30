//Match keyword from transcription to return command.

module.exports = function searchString(transcription) {
  var transcriptionArray = (transcription.split(' '))
  var isSearch = transcriptionArray.includes('search')
  var enterUPC = checkIncludes('enter', 'code', transcription)
  var enterName = checkIncludes('enter', 'name', transcription)
  var enterInventory = checkIncludes('enter', 'inventory', transcription)
  var isConfirm = transcriptionArray.includes('confirm')

  var productData = {
    transcription: transcription,
    command: '',
    data: ''
  }

  if (isSearch) {
    productData.command = 'search'
    productData.data = convertToValue(transcriptionArray)
    return productData
  }
  else if (enterUPC) {
    productData.command = 'enter code'
    productData.data = convertToValue(transcriptionArray)
    return productData
  }
  else if (enterName) {
    productData.command = 'enter name'
    convertToValue(transcriptionArray)
    productData.data = transcriptionArray.slice(2)
    return productData
  }
  else if (enterInventory) {
    productData.command = 'enter inventory'
    productData.data = convertToValue(transcriptionArray)
    return productData
  }
  else if (isConfirm) {
    productData.command = 'confirm'
    return productData
  }
  else {
    productData.command = 'error'
    return productData
  }
}

function convertToValue(arr) {
  var newNumber = []

  for(var i = 0; i < arr.length; i++) {
    newNumber.push(lookUpNum(arr[i]))
  }
  return newNumber.join('')
}

function lookUpNum(numString) {
  var numbers = [
    { name: 'one', value: 1},
    { name: 'two', value: 2},
    { name: 'to', value: 2},
    { name: 'three', value: 3},
    { name: 'four', value: 4},
    { name: 'five', value: 5},
    { name: 'six', value: 6},
    { name: 'seven', value: 7},
    { name: 'eight', value: 8},
    { name: 'nine', value: 9},
    { name: 'zero', value: 0}
  ]

  for (var i = 0; i < numbers.length; i++) {
    if(numString === numbers[i].name) {
      return numbers[i].value
    }
  }
}

function checkIncludes(string1, string2, arr) {
  for (var i =0; i < arr.length; i++){
    if(arr.includes(string1)){
       if(arr.includes(string2)){
         return true
       }
      else {
        return false
      }
    }
  }
}
