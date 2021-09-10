import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
// import preloadAll from 'jest-next-dynamic';
import Card from './Card';
import mockContent from './Card.mock';

// beforeAll(async () => {
//   await preloadAll();
// });

const renderComponent = () => render(<Card {...mockContent} />);

describe('<Card />', () => {
  test('Card renders correctly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Card')).toBeDefined();
  });

  test('Card renders title properly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Card-title')).toHaveTextContent(mockContent.title);
  });

  test('Card renders subtitle properly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Card-subtitle')).toHaveTextContent(mockContent.subtitle);
  });

  test('Card renders media properly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Card-media')).toHaveAttribute('src', mockContent.media?.file.url);
    expect(getByTestId('Card-media')).toHaveAttribute('alt', mockContent.media?.title);
  });
});
