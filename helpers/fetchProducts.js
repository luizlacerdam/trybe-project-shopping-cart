const fetchProducts = async (produto) => {
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
