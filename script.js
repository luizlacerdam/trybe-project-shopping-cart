// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,

// const item = require("./mocks/item");

// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};
/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};
/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__id', id));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};
/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
function addLoading() {
  const items = document.getElementsByClassName('items')[0];
  const element = document.createElement('p');
  element.classList.add('loading');
  element.innerText = 'carregando...';
  items.appendChild(element);
}

function removeLoading() {
  const element = document.getElementsByClassName('loading')[0];
  element.remove();
}

function addTotal() {
  let sum = 0;
  const elementTotal = document.getElementsByClassName('total-price')[0];
  getSavedCartItems().forEach((element) => {
    sum += element.price;
  });
  elementTotal.innerText = sum;
}

function removeItemFromCart(element) {
  const li = element.parentNode;
  li.remove();
}

function removeItemFromLocalStorage(event) {
  // const arr = text.split(' ');
  const elementId = event.target.parentNode.children[1].innerText;
  const newArr = getSavedCartItems().filter((item) => item.id !== elementId);
  localStorage.cartItems = JSON.stringify(newArr);
  addTotal();
}

function countItems() {
  const cartItems = getSavedCartItems();
  const cartNumber = document.getElementById('cart_number');
  if (!cartItems) {
    cartNumber.innerText = '0';
  } else {
    cartNumber.innerText = cartItems.length;
  }
}

function cartItemClickListener(event) {
  // remove storage
  removeItemFromLocalStorage(event);

  // remove html
  removeItemFromCart(event.target);
  // recount cart
  countItems();
}

const createCartItemElement = ({ id, title, price, thumbnail }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.appendChild(createProductImageElement(thumbnail));
  li.appendChild(createCustomElement('span', 'cart__id', id));
  li.appendChild(createCustomElement('span', 'cart__title', title));
  li.appendChild(createCustomElement('span', 'cart__price', `R$${price}`));
  li.addEventListener('click', cartItemClickListener);
  return li;
};

async function addCartOnClick(event) {
  const ol = document.getElementsByClassName('cart__items')[0];
  // pode ser feito assim tambem :)
  // fetchItem(event.target.parentNode.firstChild.innerText)
  // .then((data) => ol.appendChild(createCartItemElement(data)));

  const data = await fetchItem(event.target.parentNode.firstChild.innerText);
  const li = createCartItemElement(data);
  ol.appendChild(li);
  saveCartItems(data);
  addTotal();
  countItems();
}

function createCartFromLocalStorage() {
  const ol = document.getElementsByClassName('cart__items')[0];
  // deselegante T-T
  // getSavedCartItems().forEach((item) => fetchItem(item)
  // .then((data) => ol.appendChild(createCartItemElement(data))));
  // elegante
  getSavedCartItems().forEach((item) => {
    const element = createCartItemElement(item);
    ol.appendChild(element);
    addTotal();
  });
}

function addEventButoes() {
  const itemAdd = document.querySelectorAll('.item__add');
  itemAdd.forEach((item) => item.addEventListener('click', addCartOnClick)); 
}

async function criarItens() {
  addLoading();
  const section = document.getElementsByClassName('items')[0];
  const produtos = await fetchProducts('computador');
  produtos.results.forEach((produto) => {
    const criarElemento = createProductItemElement(produto);
    section.appendChild(criarElemento);
  });
  removeLoading();
  // funcionando
  // fetchProducts('computador').then((data) => {
  //   data.forEach((produto) => {
  //     const criarElemento = createProductItemElement(produto);
  //     section.appendChild(criarElemento);
  //   });
  // });
}

function emptyCart() {
  const botaoEsvaziar = document.getElementsByClassName('empty-cart')[0];
  const cartItem = document.getElementsByClassName('cart__item');
  botaoEsvaziar.addEventListener('click', () => {
    while (cartItem.length > 0) {
      cartItem[0].remove();
    }
    localStorage.clear();
    const elementTotal = document.getElementsByClassName('total-price')[0];
    elementTotal.innerText = '0,00';
    countItems();
  });
}

function cartIconHandle() {
  const carTitle = document.getElementById('cartTitle');
  const cartIcon = document.getElementById('cartIcon');
  const cartSection = document.getElementById('cartSection');
  cartIcon.addEventListener('click', () => {
    if (carTitle.style.display === 'none') {
      carTitle.style.display = 'flex';
      cartSection.style.display = 'flex';
    } else {
      carTitle.style.display = 'none';
      cartSection.style.display = 'none';
    }
  });
}

cartIconHandle();
emptyCart();

window.onload = async () => {
  await criarItens();
  if (localStorage.cartItems) {
    createCartFromLocalStorage();
  }
  addEventButoes();
  countItems();
};