// patch de comments

describe('JSONPlaceholder API - Teste de Atualização parcial de comments', () => {
  it('Atualização parcial de um comment (apenas o name)', () => {
    // 1. Busca o comment original para comparar depois
    cy.request('GET', '/comments/1').then((original) => {

      // 2. Envia apenas o campo que deve ser alterado
      cy.request('PATCH', '/comments/1', {
        name: 'Nome alterado via PATCH'
      }).then((response) => {
        cy.task('log', "response: " + JSON.stringify(response.body));
        expect(response.status).to.eq(200)

        // campo enviado foi alterado
        expect(response.body).to.have.property('name', 'Nome alterado via PATCH')

        // demais campos continuam iguais ao original
        expect(response.body).to.have.property('postId', original.body.postId)
        expect(response.body).to.have.property('id', original.body.id)
        expect(response.body).to.have.property('email', original.body.email)
        expect(response.body).to.have.property('body', original.body.body)
      })
    })
  })
})
