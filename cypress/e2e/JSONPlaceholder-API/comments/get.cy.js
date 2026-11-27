function validarComentario(comentario) {
  expect(comentario).to.have.all.keys('postId', 'id', 'name', 'email', 'body')
  expect(comentario.postId).to.be.a('number')
  expect(comentario.id).to.be.a('number')
  expect(comentario.name).to.be.a('string')
  expect(comentario.email).to.be.a('string')
  expect(comentario.body).to.be.a('string')
}

describe('JSONPlaceholder API - Teste dos Gets de comentários', () => {
  it('Listagem de todos os comentários', () => {
    cy.request('GET', '/comments').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array').with.length(500)
      response.body.forEach(validarComentario)
    })
  })

  it('Listagem de um comentário específico', () => {
    cy.request('GET', '/comments/1').then((response) => {
      expect(response.status).to.eq(200)
      validarComentario(response.body)
      expect(response.body.id).to.eq(1)
    })
  })
})
