import * as React from 'react';
import mount from '../../../cypress/mount';
import CollectionCarousel, { CollectionCarouselProps } from './CollectionCarousel';
import defaultContent, { smallCarouselMock } from './CollectionCarousel.mock';

let mockedContent: CollectionCarouselProps = { theme: {}, sidekickLookup: '', variant: '' };

const runTestByVariant = (variantContent) => {
  beforeEach(() => {
    mockedContent = { ...variantContent };
  });

  context('renders correctly', () => {
    it('renders a collection carousel', () => {
      mount(<CollectionCarousel {...mockedContent} />);
      cy.get('[data-testid=CollectionCarousel]').should('exist');
      cy.get('[data-testid=Card').should('have.length', mockedContent.items.length + 2);
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
    // TODO: Write following functional tests
    // it('renders correct content', () => {
    //   mount(<CollectionCarousel {...mockedContent} />);
    //   cy.get('./swiper-pagination-bullet').each((element, index) => {
    //     if () {

    //     }
    //   });
    // });
  });
}

describe('CollectionCarousel', () => {
  describe('CollectionCarousel carousel-large variant', () => {
    runTestByVariant(defaultContent());
  });

  describe('CollectionCarousel carousel-small variant', () => {
    runTestByVariant(smallCarouselMock());
  });
});