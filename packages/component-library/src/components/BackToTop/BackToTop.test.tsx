import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import preloadAll from 'jest-next-dynamic';
import BackToTop from './BackToTop';
import mockContent from './BackToTop.mock';

beforeAll(async () => {
  await preloadAll();
});

const renderComponent = (mockBackToTop) => {
  return render(<BackToTop {...mockBackToTop} />);
};

describe('<BackToTop />', () => {
  test('BackToTop renders correctly', () => {
    const mockBackToTop = mockContent();
    const { getByTestId } = renderComponent(mockBackToTop);
    expect(getByTestId('BackToTop')).toBeDefined();
  });
});
