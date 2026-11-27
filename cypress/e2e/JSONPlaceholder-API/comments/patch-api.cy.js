
describe('JSONPlaceholder API - Teste dos PATCHs de Comments', () => {

  it('Atualização parcial de um comentário', () => {

    cy.request({
      method: 'PATCH',
      url: '/comments/1',
      body: {
        body: 'Conteúdo parcialmente atualizado'
      }
    }).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id', 1)
      expect(response.body).to.have.property('body', 'Conteúdo parcialmente atualizado')
      expect(response.body).to.have.property('email')

    })

  })

})
