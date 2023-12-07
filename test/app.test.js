describe('[APP] Esta es la prueba general', () => {

  test('Esto deberia retornar 8', () => {
    let a = 4;
    let b = 4;
    let total = a + b;
    expect(total).toEqual(8);
  });

});