import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
// import preloadAll from 'jest-next-dynamic';
import Media from './Media';
import { mediaMock } from './Media.mock';

// beforeAll(async () => {
//   await preloadAll();
// });

const { file, title } = mediaMock;

const renderComponent = () =>
  render(<Media
    file={file}
    title={title}
  />);

describe('<Media />', () => {
  test('Media renders correctly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Media')).toBeDefined();
  });

  test('Media renders src properly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Media')).toHaveAttribute('src', file?.url);
  });

  test('Media renders alt properly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Media')).toHaveAttribute('alt', title);
  });
});
