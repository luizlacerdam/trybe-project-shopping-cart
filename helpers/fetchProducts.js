const fetchProducts = async () => {
  const url = (query) => `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  fetch(url('computador'))
  .then((response) => response.json())
  .then((data) => console.log(data.results))
  .catch((error) => console.log(`Aconteceu esse error: ${error}`));
};
fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
