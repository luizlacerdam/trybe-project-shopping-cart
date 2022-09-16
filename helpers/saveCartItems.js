const saveCartItems = (cartItem) => {
  if (!cartItem) {
    return new Error('Faltou o argumento');
  }
  if (!localStorage.cartItems) {
    return localStorage.setItem('cartItems', `${cartItem}`);
  }
  if (localStorage.cartItems) {
    return localStorage.setItem('cartItems', `${cartItem} ${localStorage.getItem('cartItems')}`);
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
