// delete de posts

describe('JSONPlaceholder API - Teste de deleção de posts', () => {
    it('Deleção de um post', () => {
        cy.request({
            method: 'DELETE',
            url: '/posts/1'
        })
            .then((response) => {
                cy.log("response:", JSON.stringify(response.status))
                cy.task('log', "response: " + JSON.stringify(response.status));
                expect(response.status).to.eq(200)
                expect(response.body).to.be.empty
            })
    })
})