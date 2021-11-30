import * as React from 'react';
import mount from '../../../cypress/mount';
import Carousel, { CarouselProps } from './Carousel';
import { CardProps } from '../Card';
import mockContent from './Carousel.mock';

let mockedContent: CarouselProps = { __typename: 'Carousel', title: 'test', theme: {} };

const checkCarouselButton = (array: Array<CardProps>, primaryButton: string, secondaryButton: string) => {
  array.forEach((item, index) => {
    cy.get('[data-testid=Card]').contains(item.title).should('be.visible');

    if (index !== mockedContent.items.length - 1) {
      cy.get('button').contains(primaryButton).click();
      cy.get('button').contains(secondaryButton).should('be.enabled');
    } else {
      cy.get('button').contains(primaryButton).should('be.disabled');
    }
  });
};

beforeEach(() => {
  mockedContent = { ...mockContent() };
});

describe('Carousel', () => {
  context('renders correctly', () => {
    it('renders a carousel', () => {
      mount(<Carousel {...mockedContent} />);
      cy.get('[data-testid=Carousel]').should('exist');
      cy.get('[data-testid=Carousel-title]').should('exist');
      cy.get('[data-testid=Carousel-body]').should('exist');
      cy.get('[data-testid=Carousel-items]').should('exist');
      cy.percySnapshot();
    });

    it('renders a carousel with no body', () => {
      mount(<Carousel {...mockedContent} body={undefined} />);
      cy.get('[data-testid=Carousel]').should('exist');
      cy.get('[data-testid=Carousel-title]').should('exist');
      cy.get('[data-testid=Carousel-body]').should('not.exist');
      cy.get('[data-testid=Carousel-items]').should('exist');
      cy.percySnapshot();
    });

    it('renders a carousel with no items', () => {
      mount(<Carousel {...mockedContent} items={undefined} />);
      cy.get('[data-testid=Carousel]').should('exist');
      cy.get('[data-testid=Carousel-title]').should('exist');
      cy.get('[data-testid=Carousel-body]').should('exist');
      cy.get('[data-testid=Carousel-items]').should('exist');
      cy.get('[data-testid=Carousel-items]').should('be.empty');
      cy.percySnapshot();
    });

    it('renders a carousel with no body and no items', () => {
      mount(<Carousel {...mockedContent} items={undefined} body={undefined} />);
      cy.get('[data-testid=Carousel]').should('exist');
      cy.get('[data-testid=Carousel-title]').should('exist');
      cy.get('[data-testid=Carousel-body]').should('not.exist');
      cy.get('[data-testid=Carousel-items]').should('exist');
      cy.get('[data-testid=Carousel-items]').should('be.empty');
      cy.percySnapshot();
    });

    it('renders correct content', () => {
      mount(<Carousel {...mockedContent} />);
      cy.get('[data-testid=Carousel-title]').should('have.text', mockedContent.title);
      cy.get('[data-testid=Carousel-body]')
        .contains(mockedContent.body.json.content[0].content[0].value)
        .should('exist');
      mockedContent.items.forEach((item) => {
        cy.get('[data-testid=Card]').contains(item.title).should('exist');
      });
    });
  });

  context('functions correctly', () => {
    it('Next and Back buttons work correctly', () => {
      mount(<Carousel {...mockedContent} />);
      cy.get('button').contains('Back').should('be.disabled');
      cy.get('button').contains('Next').should('be.enabled');

      checkCarouselButton(mockedContent.items, 'Next', 'Back');

      checkCarouselButton([...mockedContent.items].reverse(), 'Back', 'Next');
    });
  });
});
