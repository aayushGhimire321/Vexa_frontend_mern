// /tests/Navigation.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '../src/components/Navigation'; // Adjust path as needed

describe('Navigation Component', () => {
  test('should render navigation items', () => {
    render(<Navigation />);
    
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test('should handle logout button click', () => {
    render(<Navigation />);
    
    fireEvent.click(screen.getByText(/Logout/i));
    
    expect(localStorage.getItem('token')).toBeNull();
  });
});
