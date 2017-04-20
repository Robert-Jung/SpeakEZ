module.exports = function searchString(transcription) {
  var transcriptionArray = (transcription.split(' '))
  var isSearch = transcriptionArray.includes('search')
  var enterUPC = transcriptionArray.includes('code', 'enter')
  var enterName = transcriptionArray.includes('name', 'enter')
  var enterInventory = transcriptionArray.includes('inventory', 'enter')
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
    productObj.command = 'enter code'
    productObj.data = convertToValue(transcriptionArray)
    return productObj
  }
  else if (enterName) {
    productObj.command = 'enter name'
    productObj.data = removeAddName(transcriptionArray)
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
    console.log('error')
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

function removeAddName(arr) {
  var add = transcriptionArray.indexOf('add')
  var name = transcriptionArray.indexOf('name')

  for (var i = 0; i < transcriptionArray.length; i++) {
    if (transcriptionArray[i] === 'add') {
      if (add > -1) {
        transcriptionArray.splice(add, 1)
      }
    }
    if (transcriptionArray[i] === 'name') {
      if (add > -1) {
        transcriptionArray.splice(name, 1)
      }
    }
  }
}
