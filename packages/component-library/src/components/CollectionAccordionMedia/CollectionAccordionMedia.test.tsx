import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
// import preloadAll from 'jest-next-dynamic';
import CollectionAccordionMedia from './CollectionAccordionMedia';
import mockContent from './CollectionAccordionMedia.mock';

// beforeAll(async () => {
//   await preloadAll();
// });

const renderComponent = () => render(<CollectionAccordionMedia {...mockContent()} />);

describe('<CollectionAccordionMedia />', () => {
  test('CollectionAccordionMedia renders correctly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('CollectionAccordionMedia')).toBeDefined();
  });
});
