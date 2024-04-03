import * as React from 'react';
import mountWithRouter from '../../../cypress/mountWithRouter';
import CollectionCarousel from './CollectionCarousel';
import { CollectionCarouselProps } from './CollectionCarousel.types';
import defaultContent, { smallCarouselMock } from './CollectionCarousel.mock';

let mockedContent: CollectionCarouselProps = { theme: {}, sidekickLookup: '', variant: '' };

const runTestByVariant = (variantContent: CollectionCarouselProps, expectedLength: Function) => {
  beforeEach(() => {
    mockedContent = { ...variantContent };
  });

  context('renders correctly', () => {
    it('renders a collection carousel', () => {
      mountWithRouter(<CollectionCarousel {...mockedContent} />);
      cy.get('[data-testid=CollectionCarousel]').should('exist');
      cy.get('[data-testid=Card]').should('have.length', expectedLength(mockedContent.items?.length));
      cy.percySnapshot();
    });

    it('renders correct content', () => {
      mountWithRouter(<CollectionCarousel {...mockedContent} />);
      mockedContent.items?.forEach((item) => {
        cy.get('[data-testid=Card]')
          .contains(item?.title as string | number | RegExp)
          .should('exist');
      });
      cy.percySnapshot();
    });
  });

  // context('functions correctly', () => {
  //   it('previous and next buttons work correctly', () => {
  //     mountWithRouter(<CollectionCarousel {...mockedContent} />);
  //     cy.get('.swiper-pagination-bullet.swiper-pagination-bullet-active').as('activeBullet');

  //     cy.get('.swiper-button-next').then((button) => {
  //       button.trigger('click');
  //       cy.get('@activeBullet').should('not.have.class', 'swiper-pagination-bullet-active');
  //     });

  //     cy.get('.swiper-button-prev')
  //       .wait(1000)
  //       .then((button) => {
  //         button.trigger('click');
  //         cy.get('@activeBullet').should('have.class', 'swiper-pagination-bullet-active');
  //         cy.percySnapshot();
  //       });
  //   });
  // });
};

describe('CollectionCarousel', () => {
  describe('CollectionCarousel carousel-large variant', () => {
    runTestByVariant(defaultContent(), (length) => length + 2);
  });

  describe('CollectionCarousel carousel-small variant', () => {
    runTestByVariant(smallCarouselMock(), (length) => length + 2);
  });
});
