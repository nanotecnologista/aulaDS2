// put de comments

describe('JSONPlaceholder API - Teste de Atualização de comments', () => {
  it('Atualização de um comment', () => {
    const commentAtualizado = {
      postId: 1,
      id: 1,
      name: 'Nome do comment atualizado',
      email: 'email.atualizado@teste.com',
      body: 'Corpo do comment atualizado'
    }

    cy.request('PUT', '/comments/1', commentAtualizado)
      .then((response) => {
        cy.task('log', "response: " + JSON.stringify(response.body));
        expect(response.status).to.eq(200)

        // o corpo retornado deve refletir os dados enviados
        expect(response.body).to.have.property('postId', 1)
        expect(response.body).to.have.property('id', 1)
        expect(response.body).to.have.property('name', 'Nome do comment atualizado')
        expect(response.body).to.have.property('email', 'email.atualizado@teste.com')
        expect(response.body).to.have.property('body', 'Corpo do comment atualizado')
        expect(response.body).to.deep.equal(commentAtualizado)
      })
  })
})
