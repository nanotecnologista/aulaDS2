// delete de posts

describe('JSONPlaceholder API - Teste de deleção de posts', () => {
    it('Deleção de um post', () => {
        cy.request({
            method: 'DELETE',
            url: '/posts/100'
        })
            .then((response) => {
                cy.log("response:", JSON.stringify(response.status))
                cy.task('log', "response: " + JSON.stringify(response.status));
                expect(response.status).to.eq(200)
                expect(response.body).to.be.empty
            })
    })

    it('Deleção de um post que não existe', () => {
        cy.request({
            method: 'DELETE',
            url: '/posts/101'
        })
            .then((response) => {
                cy.log("response:", JSON.stringify(response.status))
                cy.task('log', "response: " + JSON.stringify(response.status));
                expect(response.status).to.eq(200)
                expect(response.body).to.be.empty
            })
    })
})