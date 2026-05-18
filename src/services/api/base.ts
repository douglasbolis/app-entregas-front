import axios from 'axios';

const API_BASE_URL = import.meta.env.API_URL;

/**
 * Base Axios instance for API communication.
 * Configures a base URL and default headers.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to automatically attach the authentication token
 * from local storage to the Authorization header of outgoing requests.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-storage') ? JSON.parse(localStorage.getItem('auth-storage') || '{}').state?.token : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for global error handling.
 * Specifically handles 401 Unauthorized errors by clearing authentication
 * state and redirecting the user to the login page.
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth-storage'); // Clear auth state
      window.location.href = '/'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
