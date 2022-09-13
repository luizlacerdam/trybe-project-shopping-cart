const fetchProducts = async () => {
  const url = (query) => `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  return fetch(url('computador'))
  .then((response) => response.json())
  .then((data) => data.results.filter((element, index) => index < 10))
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
