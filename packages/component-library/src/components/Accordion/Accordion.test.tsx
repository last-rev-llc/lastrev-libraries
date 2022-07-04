import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
// import preloadAll from 'jest-next-dynamic';
import Accordion from './Accordion';
import mockContent from './Accordion.mock';

// beforeAll(async () => {
//   await preloadAll();
// });

const renderComponent = () => render(<Accordion {...mockContent} />);

describe('<Accordion />', () => {
  test('Accordion renders correctly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Accordion')).toBeDefined();
  });

  test('Accordion renders title properly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Accordion-title')).toHaveTextContent(mockContent.title);
  });
});
