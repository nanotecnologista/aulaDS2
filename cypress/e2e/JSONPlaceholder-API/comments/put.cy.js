describe('JSONPlaceholder API - Teste de atualização de comentários', () => {
  it('Atualização de um comentário', () => {
    const comentario = {
      postId: 2,
      id: 1,
      name: 'Comentário atualizado',
      email: 'atualizado@example.com',
      body: 'Corpo do comentário atualizado'
    }

    cy.request('PUT', '/comments/1', comentario).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.deep.eq(comentario)
    })
  })
})
