import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import preloadAll from 'jest-next-dynamic';
import Button from './Button';
import mockContent from './Button.mock';

beforeAll(async () => {
  await preloadAll();
});

const { variant, size, color, text, className } = mockContent;

const renderComponent = () => render(
  <Button
    variant={variant}
    size={size}
    color={color}
    text={text}
    className={className}
  />
);

describe('<Button />', () => {
  test('Button renders correctly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Button')).toBeDefined();
  });

  test('Button to have class', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Button')).toHaveClass(className);
  });

  test('Button to have text content', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Button-text')).toHaveTextContent(text);
  });
});
