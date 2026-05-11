const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      });
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  },
  auth: {
    register: (nombre, email, password) =>
      apiClient.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ nombre, email, password }),
      }),
    login: (email, password) =>
      apiClient.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
  },
  trips: {
    getAll: () => apiClient.request('/planes'),
    create: (data) =>
      apiClient.request('/planes', { method: 'POST', body: JSON.stringify(data) }),
    getById: (id) => apiClient.request(`/planes/${id}`),
  },
  users: {
    getProfile: () => apiClient.request('/usuarios/perfil'),
    updateProfile: (data) =>
      apiClient.request('/usuarios/perfil', { method: 'PUT', body: JSON.stringify(data) }),
  },
  reservations: {
    getAll: () => apiClient.request('/reservas'),
    create: (data) =>
      apiClient.request('/reservas', { method: 'POST', body: JSON.stringify(data) }),
  },
};

export default apiClient;
