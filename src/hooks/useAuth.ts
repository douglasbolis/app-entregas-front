import { useAuthStore } from '../stores/authStore';
import api from '../services/api/base';
import type { AuthResponse } from '../types/auth';

interface AuthCredentials {
  username: string;
  password: string;
}

export function useAuth() {
  const { user, token, isAuthenticated, login, logout } = useAuthStore();

  const signIn = async (credentials: AuthCredentials) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      const { user, token } = response.data;
      login(user, token);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      logout(); // Ensure state is cleared on failed login attempt
      throw error;
    }
  };

  const signOut = () => {
    logout();
    // Optionally, invalidate token on backend if applicable
  };

  return {
    user,
    token,
    isAuthenticated,
    signIn,
    signOut,
  };
}
