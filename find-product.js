module.exports = function findProduct(productObj, arr) {
  if (productObj.command === 'search') {
    for (var i = 0; i < arr.length; i++) {
      if (productObj.data === arr[i].upc) {
        productObj.data = arr[i]
        return productObj
      }
    }
  }
  else {
    return productObj
  }
}
