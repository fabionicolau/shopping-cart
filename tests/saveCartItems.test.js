const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
test('Testa se ao executar a função saveCartItems com o argumento "<ol><li>Item</li></ol>", o método localStorage.setItem é chamado', () => {
  saveCartItems("<ol><li>Item</li></ol>")
  expect(localStorage.setItem).toHaveBeenCalled()
})

test('Testa se ao secutar a função saveCartItems com o argumento "<ol><li>Item</li></ol>", o método localStorage.setItem é chamado com dois parâmetros, sendo o primeito cartItems e o segundo o valor passado como argumento para saveCartItems', () => {
  saveCartItems("<ol><li>Item</li></ol>")
  expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', "<ol><li>Item</li></ol>")
})
});
