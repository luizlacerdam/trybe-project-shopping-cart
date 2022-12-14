const { expect } = require('@jest/globals');
const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem'); //localstorage temporario (simulado)

describe('3 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', () => {
    saveCartItems('cartItem');
    expect(localStorage.setItem).toBeCalled();
  });
  it('Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro a chave "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems.', () => {
    const obj = [{id: 'MLB654564', title: 'Titulo', price: '150,00'}];
    saveCartItems(obj);
    expect(localStorage.setItem).toBeCalledWith('cartItems', '[{},{}]');
  });
});
