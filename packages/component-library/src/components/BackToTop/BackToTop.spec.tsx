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
    it('renders a back-to-top button (bttb)', () => {
      mount(<BackToTop {...mockContent()} />);
      cy.get('[data-testid=BackToTop]').should('exist');
      cy.percySnapshot();
    });

    context('renders correct functionality', () => {
      it('renders a disabled bttb when FabProps.disabled is true', () => {
        mount(<BackToTop {...mockContent()} />);
        cy.get('[data-testid=BackToTop]').should('be.disabled');
        cy.percySnapshot();
      });

      it('renders a bttb that is not disabled when FabProps.disabled is false', () => {
        mockedContent.FabProps.disabled = false;
        mount(<BackToTop {...mockedContent} />);
        cy.get('[data-testid=BackToTop]').should('not.be.disabled');
        cy.percySnapshot();
      });
    });

    context('renders correct color', () => {
      it('renders a bttb with MuiFab-primary class when FabProps.color is primary', () => {
        mount(<BackToTop {...mockContent()} />);
        cy.get('[data-testid=BackToTop]').should('have.class', 'MuiFab-primary');
        cy.percySnapshot();
      });
    
      it('renders a bttb with MuiFab-colorInherit class when FabProps.color is inherit', () => {
        mockedContent.FabProps.color = 'inherit';
        mount(<BackToTop {...mockedContent} />);
        cy.get('[data-testid=BackToTop]').should('have.class', 'MuiFab-colorInherit');
        cy.percySnapshot();
      });
    
      it('renders a bttb with MuiFab-secondary class when FabProps.color is secondary', () => {
        mockedContent.FabProps.color = 'secondary';
        mount(<BackToTop {...mockedContent} />);
        cy.get('[data-testid=BackToTop]').should('have.class', 'MuiFab-secondary');
        cy.percySnapshot();
      });
    
      it('renders a bttb with MuiFab-default class when FabProps.color is default', () => {
        mockedContent.FabProps.color = 'default';
        mount(<BackToTop {...mockedContent} />);
        cy.get('[data-testid=BackToTop]')
          .should('not.have.class', 'MuiFab-primary')
          .and('not.have.class', 'MuiFab-colorInherit')
          .and('not.have.class', 'MuiFab-secondary');
        cy.percySnapshot();
      });
    });

    context('renders correct size', () => {
      it('renders a bttb with MuiFab-sizeLarge class when FabProps.color is large', () => {
        mount(<BackToTop {...mockContent()} />);
        cy.get('[data-testid=BackToTop]').should('have.class', 'MuiFab-sizeLarge');
        cy.percySnapshot();
      });
    
      it('renders a bttb with MuiFab-sizeMedium class when FabProps.color is medium', () => {
        mockedContent.FabProps.size = 'medium';
        mount(<BackToTop {...mockedContent} />);
        cy.get('[data-testid=BackToTop]').should('have.class', 'MuiFab-sizeMedium');
        cy.percySnapshot();
      });
    
      it('renders a bttb with MuiFab-sizeSmall class when FabProps.color is small', () => {
        mockedContent.FabProps.size = 'small';
        mount(<BackToTop {...mockedContent} />);
        cy.get('[data-testid=BackToTop]').should('have.class', 'MuiFab-sizeSmall');
        cy.percySnapshot();
      });
    });
  });

  // TODO: Need to figure out how to make window scrollable
  // context('functions correctly', () => {
  //   it('does not scroll to top of page when disabled and clicked', () => {
  //     mount(<BackToTop {...mockedContent} />);
  //     cy.viewport(200, 10);
  //     cy.get('[data-testid=BackToTop]');
  //     cy.scrollTo('bottom').window().its('scrollY').should('not.equal', 0);
  //     cy.percySnapshot();

  //     cy.get('[data-testid=BackToTop]').click();
  //     cy.window().its('scrollY').should('equal', 0);
  //     cy.percySnapshot();
  //   });
  // });
});
