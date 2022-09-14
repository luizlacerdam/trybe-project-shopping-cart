// const { data } = require('cypress/types/jquery');

const fetchItem = async (itemId) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${itemId}`;
  return fetch(url)
  .then((response) => response.json())
  .then((dados) => dados)
  .catch((error) => `Aconteceu esse error: ${error}`);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
