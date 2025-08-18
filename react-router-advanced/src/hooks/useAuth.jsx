// Simple authentication hook
export default function useAuth() {
  // Replace this with real auth logic if needed
  const isAuthenticated = () => localStorage.getItem('auth') === 'true';
  return { isAuthenticated: isAuthenticated() };
}
