import * as React from 'react';
import mount from '../../../cypress/mount';
import Button from './Button';
import mockContent from './Button.mock';

describe('Button with external href', () => {
  it('opens external url if http:// is placed in front of href', () => {
    const mockedContent = mockContent();
    mockedContent.href = 'http://www.example.com';
    mount(<Button {...mockedContent} />);
    cy.get('[data-testid=Button]').click();
    cy.url().should('eq', `${mockedContent.href}/`);
    cy.percySnapshot();
  });
});