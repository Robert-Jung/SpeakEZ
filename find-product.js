//Keyword = search: Loop through productList, match product's UPC, and return product data.

module.exports = function findProduct(productData, productList) {
  if (productData.command === 'search') {
    for (var i = 0; i < productList.length; i++) {
      if (productData.data === productList[i].upc) {
        productData.data = productList[i]
        return productData
      }
    }
  }
  else {
    return productData
  }
}
