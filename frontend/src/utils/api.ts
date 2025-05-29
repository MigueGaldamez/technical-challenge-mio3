import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// Add a request interceptor (optional)
API.interceptors.request.use(
  (config) => {
    // You could add tokens or headers here
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log(error)
    return Promise.reject(error);
  }
);

// Add a response interceptor (this is what you want)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Log or handle error globally
    console.error('API Error:', error.response?.data || error.message);

    if (typeof window !== 'undefined') {
      if (status === 401) {
        // Unauthorized - redirect to login
      }

      if (status === 403) {
        // Forbidden - maybe show a message
        alert('You are not authorized to perform this action.');
      }

      if (status >= 500) {
        // Server error
        alert('Server error. Please try again later.');
      }
    }

    return Promise.reject(error); // propagate to the calling code if needed
  }
);

export default API;