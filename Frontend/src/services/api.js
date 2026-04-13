import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
  profile: () => api.get('/auth/profile')
};

export const clubsAPI = {
  getAll: () => api.get('/clubs'),
  joinClub: (id) => api.post(`/clubs/${id}/join`),
  leaveClub: (id) => api.post(`/clubs/${id}/leave`)
};

export const feedbackAPI = {
  create: (data) => api.post('/feedback', data)
};

export const attendanceAPI = {
  mark: (data) => api.post('/attendance', data)
};

export const applicationAPI = {
  submit: (data) => api.post('/applications', data)
};

export const certificateAPI = {
  getMy: () => api.get('/certificates/my')
};

export const updatesAPI = {
  getAll: () => api.get('/updates')
};

export default api;

