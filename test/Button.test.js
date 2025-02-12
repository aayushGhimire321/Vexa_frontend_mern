// /tests/Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../src/components/Button'; // Adjust path as needed

describe('Button Component', () => {
  test('should render the button with text', () => {
    render(<Button text="Click Me" />);
    
    expect(screen.getByText(/Click Me/i)).toBeInTheDocument();
  });

  test('should handle button click', () => {
    const handleClick = jest.fn();
    
    render(<Button text="Click Me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByText(/Click Me/i));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
