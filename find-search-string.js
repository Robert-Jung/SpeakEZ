module.exports = function searchString(transcription) {
  var space = ' '
  var searchArray = (transcription.split(space))
  var isSearch = searchArray.includes('search')

  return new Promise((resolve, reject) => {
    var productUPC = convertToValue(searchArray)

    if (!isSearch) {
      reject(new Error('Please use keyword \"search\" followed by upc numbers'))
    }
    else {
      resolve(productUPC)
    }
  })
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
