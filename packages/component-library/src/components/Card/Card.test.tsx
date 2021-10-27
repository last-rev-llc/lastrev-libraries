import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
// import preloadAll from 'jest-next-dynamic';
import Card, { CardProps } from './Card';
import mockContent from './Card.mock';

// beforeAll(async () => {
//   await preloadAll();
// });
let mockedContent: CardProps = { __typename: 'Card', sidekickLookup: {} };

beforeEach(() => {
  mockedContent = mockContent();
});

const renderComponent = (content: CardProps) => render(<Card {...content} />);

describe('<Card />', () => {
  test('Card renders correctly', () => {
    const { getByTestId } = renderComponent(mockedContent);
    expect(getByTestId('Card')).toBeDefined();
  });

  test('Card renders title properly', () => {
    const { getByTestId } = renderComponent(mockedContent);
    expect(getByTestId('Card-title')).toHaveTextContent(mockedContent.title);
  });

  test('Card renders subtitle properly', () => {
    const { getByTestId } = renderComponent(mockedContent);
    expect(getByTestId('Card-subtitle')).toHaveTextContent(mockedContent.subtitle);
  });

  test('Card renders media properly', () => {
    const { getByTestId } = renderComponent(mockedContent);
    const media = Array.isArray(mockedContent.media) ? mockedContent[0] : mockedContent.media;
    expect(getByTestId('Card-media')).toHaveAttribute('src', media?.file.url);
    expect(getByTestId('Card-media')).toHaveAttribute('alt', media?.title);
  });
});
