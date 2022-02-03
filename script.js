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
  const data = await fetchProducts('computador');
  const list = document.querySelector('.items');
  data.results.forEach(({ id, title, thumbnail }) => {
    const addList = createProductItemElement({ sku: id, name: title, image: thumbnail });
    list.appendChild(addList);
  });
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
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
  const cartList = document.querySelector('.cart__items');
  const { id, title, price } = data;
  const addList = createCartItemElement({ sku: id, name: title, salePrice: price });
  cartList.appendChild(addList);
}

function buttonSetup() {
  const buttonsArray = document.getElementsByClassName('item__add');
  Array.from(buttonsArray).forEach((element) => {  
    element.addEventListener('click', addCartList);
  });
}

window.onload = async () => {
  await addProductList();
  buttonSetup();
};
