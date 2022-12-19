const getSavedCartItems = () => {
  const arr = localStorage.getItem('cartItems');
  return JSON.parse(arr);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
