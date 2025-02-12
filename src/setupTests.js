// src/setupTests.js
import '@testing-library/jest-dom';

// Mock react-router-dom to avoid errors related to routing during tests
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: () => <div />,
  Link: ({ children }) => <span>{children}</span> // Mock Link component
}));
