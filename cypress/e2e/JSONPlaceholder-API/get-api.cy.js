
describe('JSONPlaceholder API - Teste dos Gets de posts', () => {
  it( 'Listagem de todos os posts', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.length(100)
    })
  })

  it( 'Listagem de um post específico', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
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
      url: 'https://jsonplaceholder.typicode.com/posts/101',
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })

  it('Simulação de erro 500 com mock', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts/1', {
      statusCode: 500,
      body: {
        error: 'Erro interno do servidor'
      }
    })

    cy.request({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.eq(500)
      expect(response.body).to.have.property('error', 'Erro interno do servidor')
    })
  })
})
 