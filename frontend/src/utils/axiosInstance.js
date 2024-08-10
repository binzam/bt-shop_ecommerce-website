import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    let token = null;
    if (user) {
      token = user.token;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { user } = useContext(AuthContext);
        const token = user.token
        const response = await axiosInstance.post(
          '/users/refresh',
          {token},
          { withCredentials: true }
        );
        localStorage.setItem('token', response.data.accessToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        useContext(AuthContext).dispatch({ type: 'LOGOUT' });
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
