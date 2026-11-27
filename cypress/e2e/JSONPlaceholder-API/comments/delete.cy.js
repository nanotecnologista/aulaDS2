describe('JSONPlaceholder API - Teste de deleção de comentários', () => {
  it('Deleção de um comentário', () => {
    cy.request('DELETE', '/comments/1').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.deep.eq({})
    })
  })
})
