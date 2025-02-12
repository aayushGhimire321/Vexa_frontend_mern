// /tests/App.test.js
import { render, screen } from '@testing-library/react';
import App from '../src/App'; // Adjust path as needed

describe('App Component', () => {
  test('should render the app', () => {
    render(<App />);
    
    expect(screen.getByText(/Welcome to Vexa/i)).toBeInTheDocument();
  });
});
