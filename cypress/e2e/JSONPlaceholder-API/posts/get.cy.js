
describe('JSONPlaceholder API - Teste dos Gets de posts', () => {
  it('Listagem de todos os posts', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length(100)
      })
  })

  it.only('Listagem de um post específico', () => {
    cy.request('GET', '/posts/1')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id', 1)
        expect(response.body).to.have.property('title')
        expect(response.body).to.have.property('title',
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
        )
        expect(response.body).to.have.property('body')
      })
  })

  it('Lista id que não existe', () => {
    cy.request({
      method: 'GET',
      url: '/posts/101',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })

  it.only('Simulação de erro 500 com mock via browser fetch', () => {
    // 1. Configura a interceptação e cria um alias
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts/1', {
      statusCode: 500,
      body: {
        error: 'Erro interno do servidor'
      }
    }).as('getPostErro')

    // 2. Dispara a requisição a partir do próprio navegador
    cy.window().then((win) => {
      win.fetch('https://jsonplaceholder.typicode.com/posts/1')
    })

    // 3. Aguarda a requisição interceptada e valida a resposta mockada
    cy.wait('@getPostErro').then((interception) => {
      cy.log("interception:", JSON.stringify(interception.response))
      cy.task('log', "interception: " + JSON.stringify(interception))
      expect(interception.response.statusCode).to.eq(500)
      expect(interception.response.body).to.have.property('error', 'Erro interno do servidor')
    })
  })
})
