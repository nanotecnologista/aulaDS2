describe('JSONPlaceholder API - Teste de deleção de comments', () => {
    it('Deleção de um comment', () => {
        cy.request({
            method: 'DELETE',
            url: '/comments/100'
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
            url: '/comments/101'
        })
            .then((response) => {
                cy.log("response:", JSON.stringify(response.status))
                cy.task('log', "response: " + JSON.stringify(response.status));
                expect(response.status).to.eq(200)
                expect(response.body).to.be.empty
            })
    })
})