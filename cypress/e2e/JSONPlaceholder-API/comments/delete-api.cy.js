
describe('JSONPlaceholder API - Teste dos DELETEs de Comments', () => {

  it('Exclusão de um comentário existente', () => {

    cy.request({
      method: 'DELETE',
      url: '/comments/1'
    }).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body).to.be.empty

    })

  })

})
