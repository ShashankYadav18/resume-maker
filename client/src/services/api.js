import axios from 'axios';

// Create API instance with proper configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
});

// Add request interceptor for error handling
api.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
