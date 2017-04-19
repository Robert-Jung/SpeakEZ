module.exports = function findProduct(productUPC, arr) {
  for (var i = 0; i < arr.length; i++) {
    return new Promise ((resolve, reject) => {
      if (!productUPC === arr[i].upc) {
        reject()
      }
      else {
        resolve(arr[i])
      }
    })
  }
}
