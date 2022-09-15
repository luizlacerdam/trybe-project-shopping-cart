const saveCartItems = (cartItem) => {
  if (localStorage.length === 0) {
    return localStorage.setItem('cartItem', `${cartItem} `);
  }
  return localStorage.setItem('cartItem', `${cartItem} ${localStorage.getItem('cartItem')}`);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
