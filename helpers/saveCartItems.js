const saveCartItems = ({ id, title, price, thumbnail }) => {
   // eslint-disable-next-line no-undef
   const arr = getSavedCartItems() || [];
  const obj = {
    id,
    title,
    price,
    thumbnail,
  };
  arr.push(obj);
  localStorage.setItem('cartItems', JSON.stringify(arr));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
