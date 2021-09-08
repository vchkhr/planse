import { render, screen } from '@testing-library/react';
import App from './App';

test('You are not logged in', () => {
  render(<App />);
  const linkElement = screen.getByText(/You are not logged in/i);
  expect(linkElement).toBeInTheDocument();
})
