import * as React from 'react';
import mount from '../../../cypress/mount';
import MailchimpForm, { MailchimpFormProps } from './MailchimpForm';
import mockContent from './MailchimpForm.mock';

let mockedContent: MailchimpFormProps = { theme: {}, sidekickLookup: {} };

beforeEach(() => {
  mockedContent = { ...mockContent() };
});

describe('MailchimpForm', () => {
  context('renders correctly', () => {
    it('renders a mailchimp form', () => {
      mount(<MailchimpForm {...mockedContent} />);
      cy.get('[data-testid=MailchimpForm]').should('exist');
      cy.get('[data-testid=MailchimpForm-title]').should('exist');
      cy.get('[data-testid=MailchimpForm-subtitle]').should('exist');
      cy.get('[data-testid=MailchimpForm-body]').should('exist');
      cy.get('[data-testid=MailchimpForm-successMessage]').should('exist');
      cy.percySnapshot();
    });
  });
});
