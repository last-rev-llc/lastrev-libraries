import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
// import preloadAll from 'jest-next-dynamic';
import CollectionAccordion from './CollectionAccordion';
import mockContent from './CollectionAccordion.mock';

// beforeAll(async () => {
//   await preloadAll();
// });

const renderComponent = () => render(<CollectionAccordion sidekickLookup={''} {...mockContent} />);

describe('<CollectionAccordion />', () => {
  test('CollectionAccordion renders correctly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('CollectionAccordion')).toBeDefined();
  });
});
