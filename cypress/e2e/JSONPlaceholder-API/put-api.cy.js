

describe('JSONPlaceholder API - Teste de Atualização de posts', () => {
  it( 'Atualização de um post', () => {
    cy.request('PUT', 'https://jsonplaceholder.typicode.com/posts/1', {
        id:1,
        title: 'Título atualizado',
        body: 'Corpo do post atualizado',
        userId: 1
    }).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id', 1)
      expect(response.body).to.have.property('title', 'Título atualizado')
      expect(response.body).to.have.property('body', 'Corpo do post atualizado')
      expect(response.body).to.have.property('userId', 1)
    })
  })
})