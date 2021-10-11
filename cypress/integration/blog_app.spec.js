describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Cypress Testing',
      username: 'root',
      password: 'admin',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('root');
      cy.get('#password').type('admin');
      cy.get('#login-button').click();

      cy.contains('logged in as Cypress Testing');
    });

    it('fails with wrong credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('root');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'invalid password or username')
        .and('have.css', 'color', 'rgb(216, 0, 12)');

      cy.get('html').should(
        'not.contain',
        'logged in as Cypress Testing'
      );
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'admin' });
    });

    it('A blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('a blog created by cypress');
      cy.get('#author').type('author by cypress');
      cy.get('#url').type('cypress.com');
      cy.get('#create-button').click();

      cy.contains('a blog created by cypress author by cypress');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'a blog created by cypress',
          author: 'author by cypress',
          url: 'cypress.com',
        });
      });

      it('it can be liked', function () {
        cy.contains('a blog created by cypress')
          .find('button')
          .click();

        cy.get('#like-button').click();
        cy.contains('Likes: 1');
      });

      it('it can be removed', function () {
        cy.contains('a blog created by cypress')
          .find('button')
          .click();

        cy.get('#remove-button').click();
        cy.get('html').should(
          'not.contain',
          'a blog created by cypress'
        );
      });
    });

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'authorA',
          url: 'urlA.com',
          likes: 10,
        });
        cy.createBlog({
          title: 'second blog',
          author: 'authorB',
          url: 'urlB.com',
          likes: 50,
        });
        cy.createBlog({
          title: 'third blog',
          author: 'authorC',
          url: 'urlC.com',
          likes: 100,
        });
      });

      it('they are ordered by number of likes', function () {
        cy.get('#blog-list > div')
          .should('have.length', 3)
          .and(($div) => {
            expect($div.get(0).textContent, 'first div').match(
              /third blog/
            );
            expect($div.get(1).textContent, 'second div').match(
              /second blog/
            );
            expect($div.get(2).textContent, 'third div').match(
              /first blog/
            );
          });
      });
    });
  });
});
