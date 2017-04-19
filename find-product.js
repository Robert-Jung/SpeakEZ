module.exports = function findProduct(productUPC, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (productUPC.data === arr[i].upc) {
      productUPC.data = arr[i]
      return productUPC
    }
  }
}
