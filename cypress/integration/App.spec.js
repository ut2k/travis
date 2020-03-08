describe('Test App', () => {

    it('launches', () => {
        cy.visit('/');
    });

    // Checking the content of the button on the homepage
    it('launches', () => {
        cy.visit('/');
        cy.get('[data-cy=button]').should('contain', 'GENERATE WORKOUT');
    });


    // Clicking on the sign in button takes user to the profile page
    it('launches', () => {
        cy.visit('/workouts');
        cy.get('[data-cy=SignIn]').click();
        cy.url().should('include', '/profile')
    });
});