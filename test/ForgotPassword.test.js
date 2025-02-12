// /tests/ForgotPassword.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPassword from '../src/components/Auth/ForgotPassword'; // Adjust path as needed
import axios from 'axios';

jest.mock('axios');

describe('ForgotPassword Component', () => {
  test('should render the forgot password form', () => {
    render(<ForgotPassword />);
    
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  test('should handle password reset request', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Password reset email sent' } });

    render(<ForgotPassword />);
    
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/Submit/i));
    
    await waitFor(() => expect(screen.getByText(/Password reset email sent/i)).toBeInTheDocument());
  });

  test('should show error for failed password reset', async () => {
    axios.post.mockRejectedValue(new Error('Failed to send reset email'));

    render(<ForgotPassword />);
    
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.click(screen.getByText(/Submit/i));
    
    await waitFor(() => expect(screen.getByText(/Failed to send reset email/i)).toBeInTheDocument());
  });
});
