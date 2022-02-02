require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  test('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  })
  test('Testa se ao executar a função fetchProducts com o argumento "computador", a função fetch é chamada', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
  })
  test('Testa se ao executar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    const url = "https://api.mercadolibre.com/sites/MLB/search?q=computador"
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(url)
  })
  test('Testa se o retorno função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto "computadorSearch"', async () => {
    const obj = await fetchProducts('computador')
    expect(obj).toEqual(computadorSearch)
  })
  test('Testa se a função fetchProducts sem argumento retorna a mensagem de erro "You must provide an url"', async () => {
    const obj = await fetchProducts()
    expect(obj).toEqual(new Error('You must provide an url'))
  })
});
