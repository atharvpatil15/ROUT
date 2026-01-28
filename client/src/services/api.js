import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rout-k3j1.onrender.com/api/v1',
  withCredentials: true, // Important for sending cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here (e.g., redirect to login on 401)
    return Promise.reject(error);
  }
);

export default api;
