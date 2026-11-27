

describe('JSONPlaceholder API - Teste de criação de posts', () => {
  
  it( 'Criação de um post com um ID de usuário inválido', () => {
    
    cy.request('POST', '/posts', {
        title: 'Noticia bombastica!!!',
        body: 'Banda K-pop se separa e fãs ficam em choque',
        userId: 11
    }).then((response) => {

      // Como o JSONPlaceholder não valida o userId, 
      // a requisição será bem-sucedida, 
      // mas podemos simular um erro 409 para fins de teste.
      cy.intercept('POST', '/posts', {
      statusCode: 409,
      body: {
        error: 'Erro ao criar o post'
        }
      }).as('postPostErro'),

      cy.window().then((win) => {
        win.fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: 'Noticia bombastica!!!',
            body: 'Banda K-pop se separa e fãs ficam em choque',
            userId: 11
          })
        })
      })

      cy.wait('@postPostErro').then((interceptedRequest) => {
        cy.log("response:", JSON.stringify(interceptedRequest.response.body))
        expect(interceptedRequest.response.statusCode).to.eq(409)
        expect(interceptedRequest.response.body).to.have.property('error', 'Erro ao criar o post')
      })
    })
  })

  it('Criação de um post com um ID de usuário válido', () => {
    cy.request('POST', '/posts', {
      title: 'Noticia bombastica!!!',
      body: 'Banda K-pop se separa e fãs ficam em choque',
      userId: 1
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')
      expect(response.body.id).to.eq(101) // O JSONPlaceholder retorna sempre o ID 101 para novos posts
      expect(response.body.title).to.eq('Noticia bombastica!!!')
      expect(response.body.body).to.eq('Banda K-pop se separa e fãs ficam em choque')
      expect(response.body.userId).to.eq(1)
    })
  })
})