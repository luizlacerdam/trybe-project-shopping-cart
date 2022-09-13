require('../mocks/fetchSimulator');
const { expect } = require('@jest/globals');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('Teste se é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });
  it('Testa se fetch foi chamada', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toBeCalled();
  });
  it('Testa o endpoint ', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toBeCalledWith(url);
  });
  it('Testa o retorno da busca', async () => {
    // expect.assertions(1);
    // expect(await fetchProducts('computador')).toEqual(computadorSearch);
    fetchProducts('computador').then((data) => {
      expect.assertions(1);
      expect(data).toEqual(computadorSearch)});
  });
  it('Testa sem argumento deve retornar um error', async () => {
    expect.assertions(0);
    fetchProducts().catch((error) => expect(error).toBe(new Error('You must provide an url')));
    
    // try {
    //   await fetchProducts();
    // } catch (error) {
    //   expect(error).toBe(new Error('You must provide an url'));
    // }
    
  });
});
