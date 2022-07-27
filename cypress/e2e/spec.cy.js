import 'cypress-wait-until';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function generateRandomCode() {
  let result = ""
  let charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result
}
function getRandNum() {
  return Math.floor(Math.random() * 100) + 1
}

describe('Card handling', () => {
  beforeEach(() => {
    cy.waitUntil(function () {
      cy.visit('http://127.0.0.1:8080/')
      return cy.get('#popup__create').should('exist')
    })
  })

  it('create new card', () => {
    const name = generateRandomCode()
    const url = `https://picsum.photos/500/300?random=${getRandNum()}`
    cy.get('.profile__button').click()
    cy.get('input[name="place-name"]')
      .type(name)
      .should('have.value', name)
      .get('input[name="place-content"]')
      .type(url)
      .should('have.value', url)
    cy.get('#newPlace').click()
    console.log('Card created', name, url);
  });

  it('Like card', () => {
    cy.waitUntil(function () {
      return cy.get('#popup__create').should('not.have.class', 'popup_opened')

    })
    cy.get('.place__button')
    .first()
    .click()
    cy.waitUntil(function () {
      return cy.get('.place__button')
        .first()
        .should('have.class', 'place__button_like')
    })
  });

  it('Dislike card', () => {
    cy.get('.place__button')
      .first()
      .click()
    cy.waitUntil(function () {
      return cy.get('.place__button')
        .first()
        .should('not.have.class', 'place__button_like')
    })
  });

  it('Delete card', () => {
    cy.get('.place__delete')
      .first()
      .click()
    cy.waitUntil(function () {
      return cy.get('#button_delete-card')
        .click()
    })
  });
})
