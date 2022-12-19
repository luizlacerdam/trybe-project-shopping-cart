const arr = [];
const saveCartItems = ({ id, title, price }) => {

  const obj = {
    id,
    title,
    price,
  };

  arr.push(obj);
  localStorage.setItem('cartItems', JSON.stringify(arr));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
