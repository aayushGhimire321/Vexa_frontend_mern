// /tests/Dashboard.test.js
import { render, screen } from '@testing-library/react';
import Dashboard from '../src/components/Dashboard'; // Adjust path as needed

describe('Dashboard Component', () => {
  test('should render dashboard with user data', () => {
    render(<Dashboard />);
    
    expect(screen.getByText(/Welcome back!/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});
