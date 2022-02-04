const cartOrderedList = document.querySelector('.cart__items');
const listItems = document.querySelector('.items');
const totalPrice = document.querySelector('.total-price');
const cartList = document.getElementsByClassName('cart__item');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

async function addProductList() {
  const text = createCustomElement('span', 'loading', 'carregando...');
  listItems.appendChild(text);
  const data = await fetchProducts('computador');
  data.results.forEach(({ id, title, thumbnail }) => {
    const addList = createProductItemElement({ sku: id, name: title, image: thumbnail });
    listItems.appendChild(addList);
  });
  text.remove();
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function getSum() {
  let sum = 0;
  Array.from(cartList).forEach((element) => {
    let string = element.innerText;
    string = string.split('$');
    const prices = parseFloat(string[1]);
    sum += prices;
  });
  totalPrice.innerText = sum;
}

function cartItemClickListener(event) {
  event.target.remove();
  getSum();
  saveCartItems(cartOrderedList.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addCartList(event) {
  const productId = getSkuFromProductItem(event.target.parentElement);
  const data = await fetchItem(productId);
  const { id, title, price } = data;
  const addList = createCartItemElement({ sku: id, name: title, salePrice: price });
  cartOrderedList.appendChild(addList);
  getSum();
  saveCartItems(cartOrderedList.innerHTML);
}

function buttonSetup() {
  const buttonsArray = document.getElementsByClassName('item__add');
  Array.from(buttonsArray).forEach((element) => {
    element.addEventListener('click', addCartList);
  });
}

function clearCart() {
  while (cartOrderedList.lastElementChild) {
    cartOrderedList.removeChild(cartOrderedList.lastElementChild);
    getSum();
    saveCartItems(cartOrderedList.innerHTML);
  }
}
const button = document.querySelector('.empty-cart');
button.addEventListener('click', clearCart);

function generateLocalStorage() {
  cartOrderedList.innerHTML = getSavedCartItems();
  Array.from(cartList).forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
    getSum();
  });
  return cartOrderedList.innerHTML;
}

window.onload = async () => {
  await addProductList();
  buttonSetup();
  generateLocalStorage();
};
