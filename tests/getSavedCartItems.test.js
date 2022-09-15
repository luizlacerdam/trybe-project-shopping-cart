const { expect } = require('@jest/globals');
const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
 it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
  getSavedCartItems('PC');
  expect(localStorage.setItem).toBeCalled();
 });
 it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro.', () => {
  getSavedCartItems('cartItems');
  expect(getSavedCartItems('cartItems')).toBeCalledWith(localStorage.setItem('cartItems', valor));
});
});
