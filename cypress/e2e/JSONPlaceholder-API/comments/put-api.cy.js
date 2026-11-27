
describe('JSONPlaceholder API - Teste dos PUTs de Comments', () => {

  it('Atualização de um comentário existente', () => {

    cy.request({
      method: 'PUT',
      url: '/comments/1',
      body: {
        postId: 1,
        id: 1,
        name: 'Nome atualizado',
        email: 'teste@email.com',
        body: 'Conteúdo atualizado do comentário'
      }
    }).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id', 1)
      expect(response.body).to.have.property('name', 'Nome atualizado')
      expect(response.body).to.have.property('email', 'teste@email.com')
      expect(response.body).to.have.property('body', 'Conteúdo atualizado do comentário')

    })

  })

})
