require('../mocks/fetchSimulator');
const { expect } = require('@jest/globals');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
// console.log(computadorSearch);
describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('Teste se é uma função', () => {
    expect.assertions(1)
    expect(typeof fetchProducts).toBe('function');
  });
  it('Testa se fetch foi chamada', async () => {
    expect.assertions(1)
    await fetchProducts('computador')
    expect(fetch).toBeCalled();
  });
  it('Testa o endpoint ', async () => {
    expect.assertions(1)
    await fetchProducts('computador')
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toBeCalledWith(url);
  });
});
