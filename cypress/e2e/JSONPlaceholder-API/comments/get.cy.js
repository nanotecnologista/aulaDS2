// get de comments

describe('JSONPlaceholder API - Teste dos Gets de comments', () => {
  it('Listagem de todos os comments', () => {
    cy.request('GET', '/comments')
      .then((response) => {
        cy.task('log', "response: " + JSON.stringify(response.status));
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
        expect(response.body).to.have.length(500)

        // valida a estrutura e os tipos dos campos de cada comment
        response.body.forEach((comment) => {
          expect(comment).to.have.all.keys('postId', 'id', 'name', 'email', 'body')
          expect(comment.postId).to.be.a('number')
          expect(comment.id).to.be.a('number')
          expect(comment.name).to.be.a('string')
          expect(comment.email).to.be.a('string')
          expect(comment.body).to.be.a('string')
        })
      })
  })

  it('Listagem de um comment específico', () => {
    cy.request('GET', '/comments/1')
      .then((response) => {
        cy.task('log', "response: " + JSON.stringify(response.body));
        expect(response.status).to.eq(200)

        // estrutura do corpo
        expect(response.body).to.have.all.keys('postId', 'id', 'name', 'email', 'body')
        expect(response.body).to.have.property('postId', 1)
        expect(response.body).to.have.property('id', 1)
        expect(response.body).to.have.property('name', 'id labore ex et quam laborum')
        expect(response.body).to.have.property('email', 'Eliseo@gardner.biz')
        expect(response.body).to.have.property('body')

        // tipos dos campos
        expect(response.body.postId).to.be.a('number')
        expect(response.body.id).to.be.a('number')
        expect(response.body.name).to.be.a('string')
        expect(response.body.email).to.be.a('string')
        expect(response.body.body).to.be.a('string')
      })
  })

  it('Lista id de comment que não existe', () => {
    cy.request({
      method: 'GET',
      url: '/comments/501',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })
})
