// delete de comments

describe('JSONPlaceholder API - Teste de deleção de comments', () => {
    it('Deleção de um comment', () => {
        cy.request({
            method: 'DELETE',
            url: '/comments/1'
        })
            .then((response) => {
                cy.log("response:", JSON.stringify(response.status))
                cy.task('log', "response: " + JSON.stringify(response.status));
                expect(response.status).to.eq(200)
                expect(response.body).to.be.empty
            })
    })

    it('Deleção de um comment que não existe', () => {
        cy.request({
            method: 'DELETE',
            url: '/comments/501'
        })
            .then((response) => {
                cy.log("response:", JSON.stringify(response.status))
                cy.task('log', "response: " + JSON.stringify(response.status));
                expect(response.status).to.eq(200)
                expect(response.body).to.be.empty
            })
    })
})
