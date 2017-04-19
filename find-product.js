module.exports = function findProduct(productUPC, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (productUPC === arr[i].upc) {
      return arr[i]
    }
  }
}
