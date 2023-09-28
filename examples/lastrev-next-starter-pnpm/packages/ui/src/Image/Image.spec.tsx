import * as React from 'react';
import { mount } from '@cypress/react18';
import Image from './Image';
import { imageBaseMock } from './Image.mock';
import type { ImageProps } from './Image.types';

let mockedContent: ImageProps = imageBaseMock;

beforeEach(() => {
  mockedContent = { ...imageBaseMock() };
});

// TODO: Fix alt text types issue
describe('Image', () => {
  context('renders correctly', () => {
    it('renders an image', () => {
      mount(<Image {...mockedContent} />);
      cy.get(`[data-testid=${mockedContent.testId}]`).should('exist').and('have.attr', 'src', mockedContent.src);
      cy.percySnapshot();
    });

    it('renders an image with correct class name given', () => {
      mount(<Image {...mockedContent} />);
      cy.get(`[data-testid=${mockedContent.testId}]`).should('have.class', mockedContent.className);
    });

    it('renders an image without a class name given', () => {
      mount(<Image {...mockedContent} className={undefined} />);
      cy.get(`[data-testid=${mockedContent.testId}]`).should('exist');
    });

    it('renders an image with correct itemprop given', () => {
      const itemProp = 'item-prop';
      mount(<Image {...mockedContent} itemProp={itemProp} />);
      cy.get(`[data-testid=${mockedContent.testId}]`).should('have.attr', 'itemprop', itemProp);
    });

    it('renders an image with lazy loading when priority is false', () => {
      mount(<Image {...mockedContent} priority={false} />);
      cy.get(`[data-testid=${mockedContent.testId}]`).should('have.attr', 'loading', 'lazy');
    });

    it('renders an image without lazy loading when priority is true', () => {
      mount(<Image {...mockedContent} priority />);
      cy.get(`[data-testid=${mockedContent.testId}]`).should('have.attr', 'loading', 'eager');
    });
  });
});
