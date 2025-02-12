// /tests/ProfileSettings.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileSettings from '../src/components/ProfileSettings'; // Adjust path as needed

describe('ProfileSettings Component', () => {
  test('should render profile settings form', () => {
    render(<ProfileSettings />);
    
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByText(/Save Changes/i)).toBeInTheDocument();
  });

  test('should handle profile update', () => {
    render(<ProfileSettings />);
    
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'newusername' } });
    fireEvent.click(screen.getByText(/Save Changes/i));
    
    expect(screen.getByText(/Profile updated successfully/i)).toBeInTheDocument();
  });
});
