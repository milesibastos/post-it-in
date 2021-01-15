import React from 'react';
import { render } from '@testing-library/react';
import App from './index';

test('renders home', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Sign In with LinkedIn/i);
  expect(headerElement).toBeInTheDocument();
});
