import * as React from 'react';
import { upperFirst } from 'lodash';
import mount from '../../../cypress/mount';
import Button, { ButtonProps } from './Button';
import mockContent from './Button.mock';

let mockedContent: ButtonProps = {};

beforeEach(() => {
  mockedContent = { ...mockContent() };
});

describe('Button', () => {
  context('renders correctly', () => {
    it('renders a button', () => {
      mount(<Button {...mockedContent} />);
      cy.get('[data-testid=Button]').should('exist');
      cy.percySnapshot();
    });

    it('renders a button with correct text', () => {
      mount(<Button {...mockedContent} />);
      cy.get('[data-testid=Button]').should('have.text', mockedContent.text);
      cy.percySnapshot();
    });

    it('renders a button with correct className', () => {
      mount(<Button {...mockedContent} />);
      cy.get('[data-testid=Button]').should('have.class', mockedContent.className);
      cy.percySnapshot();
    });

    it('renders correct variant', () => {
      mount(<Button {...mockedContent} />);
      cy.get('[data-testid=Button]').should('have.class', `MuiButton-${mockedContent.variant}`);
      cy.get('[data-testid=Button]').should('have.class', `MuiButton-${mockedContent.variant}${upperFirst(mockedContent.color)}`);
      cy.get('[data-testid=Button]').should('have.class', `MuiButton-${mockedContent.variant}Size${upperFirst(mockedContent.size)}`);
      cy.percySnapshot();
    });

    it('renders correct size', () => {
      mount(<Button {...mockedContent} />);
      cy.get('[data-testid=Button]').should('have.class', `MuiButton-size${upperFirst(mockedContent.size)}`);
      cy.get('[data-testid=Button]').should('have.class', `MuiButton-${mockedContent.variant}Size${upperFirst(mockedContent.size)}`);
      cy.percySnapshot();
    });

    it('renders correct color', () => {
      mount(<Button {...mockedContent} />);
      cy.get('[data-testid=Button]').should('have.class', `MuiButton-${mockedContent.variant}${upperFirst(mockedContent.color)}`);
      cy.percySnapshot();
    });

    context('renders elevation correctly', () => {
      it('shows elevation when disableElevation is false', () => {
        mockedContent.disableElevation = false;
        mount(<Button {...mockedContent} />);
        cy.get('[data-testid=Button]').should('not.have.class', 'MuiButton-disableElevation');
        cy.percySnapshot();
      });
  
      it('shows elevation when disableElevation is true', () => {
        mockedContent.disableElevation = true;
        mount(<Button {...mockedContent} />);
        cy.get('[data-testid=Button]').should('have.class', 'MuiButton-disableElevation');
        cy.percySnapshot();
      });
    });

    context('renders width correctly', () => {
      it('renders fit-to-text button when fullWidth is false', () => {
        mockedContent.fullWidth = false;
        mount(<Button {...mockedContent} />);
        cy.get('[data-testid=Button]').should('not.have.class', 'MuiButton-fullWidth');
        cy.percySnapshot();
      });
  
      it('renders button at full width when fullWidth is true', () => {
        mockedContent.fullWidth = true;
        mount(<Button {...mockedContent} />);
        cy.get('[data-testid=Button]').should('have.class', 'MuiButton-fullWidth');
        cy.percySnapshot();
      });
    });

    context('renders tabindex correctly', () => {
      it('renders button with tabindex equal to 0 if tabIndex is not provided', () => {
        mount(<Button {...mockedContent} />);
        cy.get('[data-testid=Button]').should('have.attr', 'tabindex', 0);
        cy.percySnapshot();
      });
  
      it('renders button with tabindex equal to tabIndex provided', () => {
        mockedContent.tabIndex = 2;
        mount(<Button {...mockedContent} />);
        cy.get('[data-testid=Button]').should('have.attr', 'tabindex', 2);
        cy.percySnapshot();
      });
    });
  });

  context('functions correctly', () => {
    context('disabled functions correctly', () => {
      it('button is not disabled if disabled is false', () => {
        mockedContent.disabled = false;
        mount(<Button {...mockedContent} />);
        cy.get('[data-testid=Button]').should('not.have.attr', 'disabled');
        cy.get('[data-testid=Button]').should('not.have.class', 'Mui-disabled');
        cy.percySnapshot();
      });
  
      it('button is disabled if disabled is true', () => {
        mockedContent.disabled = true;
        mount(<Button {...mockedContent} />);
        cy.get('[data-testid=Button]').should('have.attr', 'disabled');
        cy.get('[data-testid=Button]').should('have.class', 'Mui-disabled');
        cy.percySnapshot();
      });
    });

    // TODO: Need to figure out why component doesn't mount after testing href click
    // context('if href is added', () => {
    //   it('navigates to external and internal urls', () => {
    //     mockedContent.href = '/';
    //     mount(<Button {...mockedContent} />);
    //     cy.get('[data-testid=Button]').click();
    //     cy.url().should('eq', `${Cypress.config().baseUrl}${mockedContent.href}`);
    //     cy.percySnapshot();
    //   });

    //   it('opens external url if http:// is placed in front of href', () => {
    //     mockedContent.href = 'http://www.example.com';
    //     mount(<Button {...mockedContent} />);
    //     cy.get('[data-testid=Button]').click();
    //     cy.url().should('eq', `${mockedContent.href}/`);
    //     cy.percySnapshot();
    //   });
    // });
  });
});