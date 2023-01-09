const getSavedCartItems2 = () => {
  const arr = localStorage.getItem('cartItems');
  return JSON.parse(arr);
};

const saveCartItems = ({ id, title, price, thumbnail }) => {
   const arr = getSavedCartItems2() || [];
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
