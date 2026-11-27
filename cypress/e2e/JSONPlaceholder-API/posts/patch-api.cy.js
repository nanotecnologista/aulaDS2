describe('JSONPlaceholder API - Teste de Atualização de patchs', () => {
  it( 'Atualização de um comment utilizando patch', () => {
    cy.request('PATCH', 'https://jsonplaceholder.typicode.com/comments/1', {
        body: 'Corpo do post atualizado com patch',
    }).then((response) => {
      expect(response.body).to.have.property('body', 'Corpo do post atualizado com patch')
    })
  })
})