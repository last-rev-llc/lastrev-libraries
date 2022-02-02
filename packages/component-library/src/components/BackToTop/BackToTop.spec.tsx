import * as React from 'react';
import mount from '../../../cypress/mount';
import BackToTop, { BackToTopProps } from './BackToTop';
import mockContent from './BackToTop.mock';

let mockedContent: BackToTopProps = {};

beforeEach(() => {
  mockedContent = mockContent();
});

describe('BackToTop', () => {
  context('renders correctly', () => {
    it('renders a back-to-top button', () => {
      mount(<BackToTop {...mockContent()} />);
      cy.get('[data-testid=BackToTop]').should('exist');
      cy.percySnapshot();
    });

    context('renders different color and size', () => {
      it('renders a back-to-top button with MuiFab-colorInherit class when FabProps.color is inherit', () => {
        mockedContent.FabProps.color = 'inherit';
        mockedContent.FabProps.size = 'medium';
        mount(<BackToTop {...mockedContent} />);
        cy.get('[data-testid=BackToTop]').should('have.class', 'MuiFab-colorInherit');
        cy.get('[data-testid=BackToTop]').should('have.class', 'MuiFab-sizeMedium');
        cy.percySnapshot();
      });
    });
  });

  context('functions correctly', () => {
    it('does not scroll to top of page when disabled and clicked', () => {
      mount(
        <div style={{ height: 2000 }}>
          <BackToTop {...mockedContent} />
        </div>
      );
      cy.get('[data-testid=BackToTop]').should('not.be.visible');
      cy.scrollTo('bottom');
      cy.window().then(($window) => {
        expect($window.scrollY).to.not.be.eq(0);
      });
      cy.get('[data-testid=BackToTop]').should('be.visible');
      cy.get('[data-testid=BackToTop]').click();
      cy.window().then(($window) => {
        expect($window.scrollY).to.be.eq(0);
      });
      cy.percySnapshot();
    });
  });
});