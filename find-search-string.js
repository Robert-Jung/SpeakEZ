module.exports = function searchString(transcription) {
  var transcriptionArray = (transcription.split(' '))
  var isSearch = transcriptionArray.includes('search')
  var enterUPC = checkIncludes('enter', 'code', transcription)
  var enterName = checkIncludes('enter', 'name', transcription)
  var enterInventory = checkIncludes('enter', 'inventory', transcription)
  var isConfirm = transcriptionArray.includes('confirm')

  var productObj = {
    transcription: transcription,
    command: '',
    data: ''
  }

  if (isSearch) {
    productObj.command = 'search'
    productObj.data = convertToValue(transcriptionArray)
    return productObj
  }
  else if (enterUPC) {
    console.log(enterUPC)
    productObj.command = 'enter code'
    productObj.data = convertToValue(transcriptionArray)
    return productObj
  }
  else if (enterName) {
    productObj.command = 'enter name'
    convertToValue(transcriptionArray)
    productObj.data = transcriptionArray.slice(2)
    return productObj
  }
  else if (enterInventory) {
    productObj.command = 'enter inventory'
    productObj.data = convertToValue(transcriptionArray)
    return productObj
  }
  else if (isConfirm) {
    productObj.command = 'confirm'
    return productObj
  }
  else {
    productObj.command = 'error'
    return productObj
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
