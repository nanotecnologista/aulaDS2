
describe('JSONPlaceholder API - Teste dos GETs de Comments', () => {

  it('Listagem de todos os comentários', () => {
    cy.request('GET', '/comments')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length(500)
      })
  })

  it('Listagem de um comentário específico', () => {
    cy.request('GET', '/comments/1')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id', 1)
        expect(response.body).to.have.property('postId')
        expect(response.body).to.have.property('name')
        expect(response.body).to.have.property('email')
        expect(response.body).to.have.property('body')
      })
  })

  it('Lista ID que não existe', () => {
    cy.request({
      method: 'GET',
      url: '/comments/501',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })

  it('Simulação de erro 500 com mock via browser fetch', () => {

    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/comments/1', {
      statusCode: 500,
      body: {
        error: 'Erro interno do servidor'
      }
    }).as('getCommentErro')

    cy.window().then((win) => {
      win.fetch('https://jsonplaceholder.typicode.com/comments/1')
    })

    cy.wait('@getCommentErro').then((interception) => {
      cy.log("interception:", JSON.stringify(interception.response))
      cy.task('log', "interception: " + JSON.stringify(interception))

      expect(interception.response.statusCode).to.eq(500)
      expect(interception.response.body).to.have.property('error', 'Erro interno do servidor')
    })
  })

})
