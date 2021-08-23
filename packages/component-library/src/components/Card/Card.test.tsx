import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import preloadAll from 'jest-next-dynamic';
import Card from './Card';
import mockContent from './Card.mock';

beforeAll(async () => {
  await preloadAll();
});

const { variant, title, subtitle, body, actions } = mockContent;

const renderComponent = () =>
  render(<Card
    variant={variant}
    title={title}
    subtitle={subtitle}
    body={body}
    actions={actions}
  />);

describe('<Card />', () => {
  test('Card renders correctly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Card')).toBeDefined();
  });

  test('Card renders title properly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Card-title')).toHaveTextContent(title);
  });

  test('Card renders subtitle properly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Card-subtitle')).toHaveTextContent(subtitle);
  });
});
