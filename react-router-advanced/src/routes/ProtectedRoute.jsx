import { Navigate } from 'react-router-dom';

// Simulate authentication status
const isAuthenticated = () => {
  return localStorage.getItem('auth') === 'true';
};

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
