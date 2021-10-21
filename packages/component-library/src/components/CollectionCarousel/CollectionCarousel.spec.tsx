import * as React from 'react';
import mount from '../../../cypress/mount';
import CollectionCarousel, { CollectionCarouselProps } from './CollectionCarousel';
import defaultContent, { smallCarouselMock } from './CollectionCarousel.mock';

let mockedContent: CollectionCarouselProps = { theme: {}, sidekickLookup: '', variant: '' };

const runTestByVariant = (variantContent: CollectionCarouselProps, expectedLength: Function) => {
  beforeEach(() => {
    mockedContent = { ...variantContent };
  });

  context('renders correctly', () => {
    it('renders a collection carousel', () => {
      mount(<CollectionCarousel {...mockedContent} />);
      cy.get('[data-testid=CollectionCarousel]').should('exist');
      cy.get('[data-testid=Card]').should('have.length', expectedLength(mockedContent.items.length));
      cy.percySnapshot();
    });

    it('renders correct content', () => {
      mount(<CollectionCarousel {...mockedContent} />);
      mockedContent.items.forEach((item) => {
        cy.get('[data-testid=Card]').contains(item.title).should('exist');
      });
      cy.percySnapshot();
    });
  });

  context('functions correctly', () => {
    // TODO: Figure out why these DOM elements are not visible
    // it('renders correct content', () => {
    //   mount(<CollectionCarousel {...mockedContent} />);
    //   cy.get('.swiper-pagination-bullet.swiper-pagination-bullet-active').as('activeBullet');
    //   cy.percySnapshot();

    //   cy.get('.swiper-button-next').wait(10).then(button => {
    //     button.trigger('click');
    //     cy.get('@activeBullet').should('not.have.class', 'swiper-pagination-bullet-active');
    //     cy.percySnapshot();
    //   });

    //   cy.get('.swiper-button-prev').wait(10).then(button => button.trigger('click'));
    //   cy.get('@activeBullet').should('have.class', 'swiper-pagination-bullet-active');
    //   cy.percySnapshot();

    //   cy.get('.swiper-button-next').click();
    //   cy.get('@bullet').should('not.have.class', 'swiper-pagination-bullet-active');
    //   cy.percySnapshot();

    //   cy.get('.swiper-button-prev').click();
    //   cy.get('@bullet').should('have.class', 'swiper-pagination-bullet-active');
    //   cy.percySnapshot();
    // });
  });
}

describe('CollectionCarousel', () => {
  describe('CollectionCarousel carousel-large variant', () => {
    runTestByVariant(defaultContent(), (length) => length + 2);
  });

  describe('CollectionCarousel carousel-small variant', () => {
    runTestByVariant(smallCarouselMock(), (length) => length * 3);
  });
});