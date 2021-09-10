import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
// import preloadAll from 'jest-next-dynamic';
import Collection from './Collection';
import mockContent from './Collection.mock';

// beforeAll(async () => {
//   await preloadAll();
// });

const renderComponent = () => render(<Collection id={''} sidekickLookup={undefined} {...mockContent} />);

describe('<Collection />', () => {
  test('Collection renders correctly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Collection')).toBeDefined();
  });

  test('Collection renders itemsWithVariant without itemsWidth properly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Collection-itemsWithVariant-without-itemsWidth')).toBeDefined();
  });

  // test('Collection renders itemsWithVariant with itemsWidth properly', () => {
  //   const { getByTestId } = renderComponent();
  //   expect(getByTestId('Collection-itemsWithVariant-with-itemsWidth')).toBeDefined();
  // });
});
