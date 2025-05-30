import axios from 'axios';
import { toast } from 'react-toastify'; 
console.log('Base URL:',process.env.NEXT_PUBLIC_API_URL,);
const API = axios.create({
  baseURL:process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (typeof window !== 'undefined') {
      if (status === 401) {
        toast.error(message);
      } else if (status === 403) {
        toast.error('No tienes permiso para hacer esto.');
      } else if (status >= 500) {
        //toast.error('Error del servidor. Inténtalo de nuevo.');
      } else {
        toast.error(message); 
      }
    }

    return Promise.reject(error);
  }
);

export default API;