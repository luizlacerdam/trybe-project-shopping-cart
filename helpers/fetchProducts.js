const fetchProducts = async (produto) => {
  // if (!produto) {
  //   return new Error('You must provide an url');
  // }
  const url = () => `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
  return fetch(url())
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => `Aconteceu esse error: ${error}`);
};
// fetchProducts().then((data) => {
//   console.log(data);
// });

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
