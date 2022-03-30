import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
// import preloadAll from 'jest-next-dynamic';
import Hero from './Hero';
import { HeroProps } from './Hero.types';
import mockContent from './Hero.mock';
import getFirstOfArray from '../../utils/getFirstOfArray';
import define from '../../utils/define';

// beforeAll(async () => {
//   await preloadAll();
// });

let mockedContent: HeroProps = { id: 'test-hero', __typename: 'Hero', theme: [] };

beforeEach(() => {
  mockedContent = mockContent();
});

const renderComponent = (content: HeroProps) => render(<Hero {...content} />);

describe('<Hero />', () => {
  test('Hero renders correctly', () => {
    const { getByTestId } = renderComponent(mockedContent);
    expect(getByTestId('Hero')).toBeDefined();
  });

  test('Hero renders overline properly', () => {
    const { getByTestId } = renderComponent(mockedContent);
    expect(getByTestId('Hero-overline')).toHaveTextContent(define(mockedContent.overline));
  });

  test('Hero renders title properly', () => {
    const { getByTestId } = renderComponent(mockedContent);
    expect(getByTestId('Hero-title')).toHaveTextContent(define(mockedContent.title));
  });

  test('Hero renders subtitle properly', () => {
    const { getByTestId } = renderComponent(mockedContent);
    expect(getByTestId('Hero-subtitle')).toHaveTextContent(define(mockedContent.subtitle));
  });

  test('Hero renders image properly', () => {
    const { getByTestId } = renderComponent(mockedContent);
    expect(getByTestId('Hero-image')).toHaveAttribute('src', define(getFirstOfArray(mockedContent.image)).file?.url);
    expect(getByTestId('Hero-image')).toHaveAttribute('alt', define(getFirstOfArray(mockedContent.image)).title);
  });

  test('Hero renders background properly', () => {
    const { getByTestId } = renderComponent(mockedContent);
    expect(getByTestId('Hero-background')).toHaveAttribute('src', mockedContent.background?.file?.url);
    expect(getByTestId('Hero-background')).toHaveAttribute('alt', mockedContent.background?.title);
  });
});
