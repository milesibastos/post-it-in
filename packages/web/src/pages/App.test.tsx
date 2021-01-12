import React from 'react';
import { render } from '@testing-library/react';
import App from './index';

test('renders home', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/post-it-in/i);
  expect(headerElement).toBeInTheDocument();
});
