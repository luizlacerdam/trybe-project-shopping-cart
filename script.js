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
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
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
 
function arrayLocalStorage() {
  const arr = localStorage.getItem('cartItems');
  return JSON.parse(arr);
}

function addTotal() {
  let sum = 0;
  const elementTotal = document.getElementsByClassName('total-price')[0];
  arrayLocalStorage().forEach((element) => {
    sum += element.price;
  });
  elementTotal.innerText = sum;
}

function removeItemFromCart(element) {
  element.remove();
}

function removeItemFromLocalStorage(event) {
  const text = event.target.innerText;
  const arr = text.split(' ');
  const indexRemover = arrayLocalStorage().findIndex((item) => item.id === arr[1]);
  const arrayLocalStorageCopy = arrayLocalStorage(); 
  arrayLocalStorageCopy.splice(indexRemover, 1);
  const novosItems = JSON.stringify(arrayLocalStorageCopy);
  localStorage.cartItems = novosItems;
  addTotal();
}

function cartItemClickListener(event) {
  // remove storage
  removeItemFromLocalStorage(event);
  
  // remove html
  removeItemFromCart(event.target);
}

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
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
}

function createCartFromLocalStorage() {
  const ol = document.getElementsByClassName('cart__items')[0];
  // deselegante T-T
  // arrayLocalStorage().forEach((item) => fetchItem(item)
  // .then((data) => ol.appendChild(createCartItemElement(data))));

  // elegante
  arrayLocalStorage().forEach((item) => {
    const element = createCartItemElement(item);
    ol.appendChild(element);
    addTotal();
  });
  
  // for (let i = 0; i < arrayLocalStorage().length; i += 1) {
  //   const data = fetchItem(arrayLocalStorage()[i]);
  //   ol.appendChild(createCartItemElement(data));
  // }
}

function addEventButoes() {
  const itemAdd = document.querySelectorAll('.item__add');
  itemAdd.forEach((item) => item.addEventListener('click', addCartOnClick)); // por que quando utiliza (event) => addCartOnClick(event)
                                                                            // não precisa mais de async em addCartOnClick???
}

async function criarItens() {
  const section = document.getElementsByClassName('items')[0];
  const produtos = await fetchProducts('computador');
  produtos.results.forEach((produto) => {
    const criarElemento = createProductItemElement(produto);
    section.appendChild(criarElemento);
  });
  
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
  });
}
emptyCart();
criarItens();

window.onload = async () => { 
  addEventButoes();
  if (localStorage.cartItems) {
    createCartFromLocalStorage();
  }
};