// /tests/Signup.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from '../src/components/Auth/Signup'; // Adjust path as needed
import axios from 'axios';

jest.mock('axios');

describe('Signup Component', () => {
  test('should render the signup form', () => {
    render(<Signup />);
    
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });

  test('should handle successful signup', async () => {
    axios.post.mockResolvedValue({ data: { message: 'User created successfully' } });

    render(<Signup />);
    
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password' } });
    
    fireEvent.click(screen.getByText(/Sign Up/i));
    
    await waitFor(() => expect(screen.getByText(/User created successfully/i)).toBeInTheDocument());
  });

  test('should show error on signup failure', async () => {
    axios.post.mockRejectedValue(new Error('Signup failed'));

    render(<Signup />);
    
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'wrongpass' } });
    
    fireEvent.click(screen.getByText(/Sign Up/i));
    
    await waitFor(() => expect(screen.getByText(/Signup failed/i)).toBeInTheDocument());
  });
});
