// src/utils/apiClient.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.umi2.one',
});

// Automatically attach token to each request
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;