require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  test('Testa se a função fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  })
  test('Testa se ao chamar a função fetchItem com o argumento "MLB1615760527", o fetch é chamado', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled()
  })
  test('Testa se ao executar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    const url = "https://api.mercadolibre.com/items/MLB1615760527"
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith(url)
  })
  test('Testa se o retorno função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto "item"', async () => {
    const obj = await fetchItem('MLB1615760527')
    expect(obj).toEqual(item)
  })
  test('Testa se a função fetchItem sem argumento retorna a mensagem de erro "You must provide an url"', async () => {
    const obj = await fetchItem()
    expect(obj).toEqual(new Error('You must provide an url'))
  })
});
