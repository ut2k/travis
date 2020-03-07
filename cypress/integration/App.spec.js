describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    it ('launches', () => {
        cy.visit ('/');
        cy.get('[data-cy=button]').should('contain', 'GENERATE WORKOUT');
      });

  });