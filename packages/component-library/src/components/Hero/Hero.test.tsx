import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
// import preloadAll from 'jest-next-dynamic';
import Hero from './Hero';
import mockContent from './Hero.mock';

// beforeAll(async () => {
//   await preloadAll();
// });

const renderComponent = () => render(<Hero id={''} __typename={''} {...mockContent} />);

describe('<Hero />', () => {
  test('Hero renders correctly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Hero')).toBeDefined();
  });

  test('Hero renders overlineText properly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Hero-overlineText')).toHaveTextContent(mockContent.overlineText);
  });

  test('Hero renders title properly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Hero-title')).toHaveTextContent(mockContent.title);
  });

  test('Hero renders subtitle properly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Hero-subtitle')).toHaveTextContent(mockContent.subtitle);
  });

  test('Hero renders image properly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Hero-image')).toHaveAttribute('src', mockContent.image.file.url);
    expect(getByTestId('Hero-image')).toHaveAttribute('alt', mockContent.image.title);
  });

  test('Hero renders background properly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Hero-background')).toHaveAttribute('src', mockContent.background?.file.url);
    expect(getByTestId('Hero-background')).toHaveAttribute('alt', mockContent.background?.title);
  });
});
