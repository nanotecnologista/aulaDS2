describe('JSONPlaceholder API - Teste de atualização parcial de comentários', () => {
  it('Atualização parcial de um comentário', () => {
    cy.request('GET', '/comments/1').then(({ body: comentarioOriginal }) => {
      const alteracoes = { body: 'Corpo alterado com PATCH' }
      expect(comentarioOriginal.body).to.not.eq(alteracoes.body)

      cy.request('PATCH', '/comments/1', alteracoes).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.deep.eq({ ...comentarioOriginal, ...alteracoes })
      })
    })
  })
})
