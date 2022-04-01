import * as React from 'react';
import { lorem } from 'faker';
import mount from '../../../cypress/mount';
import MailchimpForm from './MailchimpForm';
import { MailchimpFormProps } from './MailchimpForm.types';
import mockContent from './MailchimpForm.mock';
import getFirstOfArray from '../../utils/getFirstOfArray';

const testValue = 'testing';
const testEmail = () => `${Date.now().toString()}@${lorem.word()}.com`;
let mockedContent: MailchimpFormProps = { theme: {}, sidekickLookup: {} };

beforeEach(() => {
  mockedContent = { ...mockContent() };
  cy.intercept('GET', '/');
});

const testOptionalField = (fieldName: 'FNAME' | 'LNAME') => {
  it(`form will submit when ${fieldName === 'FNAME' ? 'first' : 'last'} name is filled out`, () => {
    mount(<MailchimpForm {...mockedContent} />);
    // Show that success message is not visible yet
    cy.get('[data-testid=MailchimpForm-successMessage]').should('not.be.visible');

    // Type in optional field
    cy.get(`input[name=${fieldName}]`).type(testValue);
    cy.get(`input[name=${fieldName}]`).should('have.value', testValue);

    // Type in required field
    cy.get('input[name=EMAIL]').type(testEmail());

    // submit form
    cy.get('[type=submit]').click();

    // show that success message is now visible
    cy.get('[data-testid=MailchimpForm-successMessage]').should('be.visible');

    if (fieldName === 'FNAME') cy.percySnapshot();
  });

  it(`form will submit when ${fieldName === 'FNAME' ? 'first' : 'last'} name is not filled out`, () => {
    mount(<MailchimpForm {...mockedContent} />);
    // Show that success message is not visible yet
    cy.get('[data-testid=MailchimpForm-successMessage]').should('not.be.visible');

    // Show nothing in optional field
    cy.get(`input[name=${fieldName}]`).should('have.value', '');

    // Type in required field
    cy.get('input[name=EMAIL]').type(testEmail());

    // submit form
    cy.get('[type=submit]').click();

    // show that success message is now visible
    cy.get('[data-testid=MailchimpForm-successMessage]').should('be.visible');
  });
};

describe('MailchimpForm', () => {
  context('renders correctly', () => {
    it('renders a mailchimp form', () => {
      mount(<MailchimpForm {...mockedContent} />);
      cy.get('[data-testid=MailchimpForm]').should('exist');
      cy.get('[data-testid=MailchimpForm-title]').should('exist');
      cy.get('[data-testid=MailchimpForm-subtitle]').should('exist');
      cy.get('[data-testid=MailchimpForm-body]').should('exist');
      cy.get('form[id^=form_]').should('exist');
      cy.percySnapshot();
    });

    describe('MailchimpForm sections', () => {
      context('title', () => {
        it('renders a mailchimp form with correct title', () => {
          mount(<MailchimpForm {...mockedContent} />);
          cy.get('[data-testid=MailchimpForm]').should('exist');
          cy.get('[data-testid=MailchimpForm-title]').should('exist').and('have.text', mockedContent.title);
          cy.get('form[id^=form_]').should('exist');
        });

        it('renders a mailchimp form without title provided', () => {
          mount(<MailchimpForm {...mockedContent} title={undefined} />);
          cy.get('[data-testid=MailchimpForm]').should('exist');
          cy.get('[data-testid=MailchimpForm-title]').should('not.exist');
          cy.get('form[id^=form_]').should('exist');
          cy.percySnapshot();
        });
      });

      context('subtitle', () => {
        it('renders a mailchimp form with correct subtitle', () => {
          mount(<MailchimpForm {...mockedContent} />);
          cy.get('[data-testid=MailchimpForm]').should('exist');
          cy.get('[data-testid=MailchimpForm-subtitle]').should('exist').and('have.text', mockedContent.subtitle);
          cy.get('form[id^=form_]').should('exist');
        });

        it('renders a mailchimp form without subtitle provided', () => {
          mount(<MailchimpForm {...mockedContent} subtitle={undefined} />);
          cy.get('[data-testid=MailchimpForm]').should('exist');
          cy.get('[data-testid=MailchimpForm-subtitle]').should('not.exist');
          cy.get('form[id^=form_]').should('exist');
          cy.percySnapshot();
        });
      });

      context('body', () => {
        it('renders a mailchimp form with correct body', () => {
          mount(<MailchimpForm {...mockedContent} />);
          cy.get('[data-testid=MailchimpForm]').should('exist');
          cy.get('[data-testid=MailchimpForm-body]')
            .should('exist')
            .and('have.text', mockedContent.body.json.content[0].content[0].value);
          cy.get('form[id^=form_]').should('exist');
        });

        it('renders a mailchimp form without body provided', () => {
          mount(<MailchimpForm {...mockedContent} body={undefined} />);
          cy.get('[data-testid=MailchimpForm]').should('exist');
          cy.get('[data-testid=MailchimpForm-body]').should('not.exist');
          cy.get('form[id^=form_]').should('exist');
          cy.percySnapshot();
        });

        context('image', () => {
          it('renders a mailchimp form with correct image', () => {
            mount(<MailchimpForm {...mockedContent} />);
            cy.get('[data-testid=MailchimpForm]').should('exist');
            cy.get('[data-testid=Media]').should('exist');
            cy.get('form[id^=form_]').should('exist');
          });

          it('renders a mailchimp form without image provided', () => {
            mount(<MailchimpForm {...mockedContent} image={undefined} />);
            cy.get('[data-testid=MailchimpForm]').should('exist');
            cy.get('[data-testid=Media]').should('not.exist');
            cy.get('form[id^=form_]').should('exist');
            cy.percySnapshot();
          });
        });

        context('success message', () => {
          it('renders a mailchimp form with correct success message when provided', () => {
            mount(<MailchimpForm {...mockedContent} />);
            cy.get('[data-testid=MailchimpForm]').should('exist');
            cy.get('[data-testid=MailchimpForm-successMessage]')
              .should('exist')
              .and('have.text', mockedContent.successMessage.json.content[0].content[0].value);
            cy.get('form[id^=form_]').should('exist');
          });

          it('renders a mailchimp form without a success message provided', () => {
            mount(<MailchimpForm {...mockedContent} successMessage={undefined} />);
            cy.get('[data-testid=MailchimpForm]').should('exist');
            cy.get('[data-testid=MailchimpForm-successMessage]').should('not.exist');
            cy.get('form[id^=form_]').should('exist');
            cy.percySnapshot();
          });
        });
      });
    });

    describe('MailchimpForm form', () => {
      it('renders a mailchimp form with correct fields', () => {
        mount(<MailchimpForm {...mockedContent} />);
        cy.get('[data-testid=MailchimpForm]').should('exist');
        cy.get('form[id^=form_]').should('exist');
        cy.get('input[name=FNAME]').should('exist');
        cy.get('input[name=LNAME]').should('exist');
        cy.get('input[name=EMAIL]').should('exist');
        cy.get('[type=submit]').should('exist');
      });

      it('renders a mailchimp form without action controls', () => {
        mount(<MailchimpForm {...mockedContent} actions={undefined} />);
        cy.get('[data-testid=MailchimpForm]').should('exist');
        cy.get('form[id^=form_]').should('exist');
        cy.get('[type=submit]').should('not.exist');
        cy.percySnapshot();
      });
    });
  });

  context('functions correctly', () => {
    describe('Text fields', () => {
      context('optional fields', () => {
        describe('First Name', () => {
          testOptionalField('FNAME');
        });

        describe('Last Name', () => {
          testOptionalField('LNAME');
        });
      });

      context('required fields', () => {
        describe('Email', () => {
          it('submits form when an email in correct format is provided', () => {
            mount(<MailchimpForm {...mockedContent} />);
            // Show that success message is not visible yet
            cy.get('[data-testid=MailchimpForm-successMessage]').should('not.be.visible');

            // Type in required field
            cy.get('input[name=EMAIL]').type(testEmail());

            // submit form
            cy.get('[type=submit]').click();

            // show that success message is now visible
            cy.get('[data-testid=MailchimpForm-successMessage]').should('be.visible');
          });

          it('does not submit form when email provided is not in correct format', () => {
            mount(<MailchimpForm {...mockedContent} />);
            // Show that success message is not visible yet
            cy.get('[data-testid=MailchimpForm-successMessage]').should('not.be.visible');

            // Type in required field
            cy.get('input[name=EMAIL]').type(testValue);

            // submit form
            cy.get('[type=submit]').click();

            // show that success message is now visible
            cy.get('[data-testid=MailchimpForm-successMessage]').should('not.be.visible');
          });

          it('does not submit form when email is not provided', () => {
            mount(<MailchimpForm {...mockedContent} />);
            // Show that success message is not visible yet
            cy.get('[data-testid=MailchimpForm-successMessage]').should('not.be.visible');

            // submit form
            cy.get('[type=submit]').click();

            // show that success message is now visible
            cy.get('[data-testid=MailchimpForm-successMessage]').should('not.be.visible');
          });
        });
      });
    });
  });
});
