// /tests/Login.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../src/components/Auth/Login'; // Adjust the path as needed
import axios from 'axios';

jest.mock('axios');

describe('Login Component', () => {
  test('should render the login form', () => {
    render(<Login />);
    
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('should handle form submission with valid credentials', async () => {
    axios.post.mockResolvedValue({ data: { token: 'fake_token', user: { name: 'John Doe' } } });

    render(<Login />);
    
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password' } });
    
    fireEvent.click(screen.getByText(/Login/i));
    
    await waitFor(() => expect(localStorage.getItem('token')).toBe('fake_token'));
  });

  test('should show error for invalid credentials', async () => {
    axios.post.mockRejectedValue(new Error('Invalid credentials'));

    render(<Login />);
    
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'wrongpass' } });
    
    fireEvent.click(screen.getByText(/Login/i));
    
    await waitFor(() => expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument());
  });
});
