import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (credentials) => {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  },
};

export const sweetsAPI = {
  getAll: async () => {
    const response = await api.get('/sweets');
    return response.data;
  },

  search: async (params) => {
    const response = await api.get('/sweets/search', { params });
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/sweets', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/sweets/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/sweets/${id}`);
  },

  purchase: async (id, quantity = 1) => {
    const response = await api.post(`/sweets/${id}/purchase`, { quantity });
    return response.data;
  },

  restock: async (id, quantity) => {
    const response = await api.post(`/sweets/${id}/restock`, { quantity });
    return response.data;
  },
};