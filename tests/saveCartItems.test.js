const { expect } = require('@jest/globals');
const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem'); //localstorage temporario (simulado)

describe('3 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', () => {
    saveCartItems('MLB2187832413');
    expect(localStorage.setItem).toBeCalled();
  });
  it('Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro a chave "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems.', () => {
    const valor = 'MLB2187832413';
    saveCartItems(valor);
    expect(saveCartItems()).toBeCalledWith(localStorage.setItem('cartItems', valor));
  });
  it('Teste se sem parametros retorna error', () => {
    expect.assertions(1);
    expect(saveCartItems()).toBe(new Error('Faltou o argumento'));
  });
});
