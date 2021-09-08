import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
// import preloadAll from 'jest-next-dynamic';
import Button from './Button';
import mockContent from './Button.mock';

// beforeAll(async () => {
//   await preloadAll();
// });

const { text } = mockContent;

const renderComponent = () =>
  render(<Button text={text} />);

describe('<Button />', () => {
  test('Button renders correctly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Button')).toBeDefined();
  });

  test('Button to have text content', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Button')).toHaveTextContent(text);
  });
});
