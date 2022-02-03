const getSavedCartItems = () => {
  const savedCartList = localStorage.getItem('cartItems');
  return savedCartList;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
