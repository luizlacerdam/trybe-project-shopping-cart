const saveCartItems = (cartItem) => {
  if (!cartItem) {
    return Error('Faltou o argumento');
  }
  if (!localStorage.cartItem) {
    return localStorage.setItem('cartItem', `${cartItem} `);
  }
  if (localStorage.cartItem) {
    return localStorage.setItem('cartItem', `${cartItem} ${localStorage.getItem('cartItem')}`);
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
