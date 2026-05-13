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
      console.log(`API Request: ${options.method || 'GET'} ${API_URL}${endpoint}`);
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Response:', errorData);
        throw new Error(errorData.error || errorData.message || `API Error: ${response.status}`);
      }
      const data = await response.json();
      console.log('API Response Success:', data);
      return data;
    } catch (error) {
      console.error('API Request Failed:', error);
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
    getProfile: () => apiClient.request('/usuarios/me'),
    updateProfile: (data) =>
      apiClient.request('/usuarios/me', { method: 'PUT', body: JSON.stringify(data) }),
  },
  reservations: {
    getAll: () => apiClient.request('/reservas'),
    create: (data) =>
      apiClient.request('/reservas', { method: 'POST', body: JSON.stringify(data) }),
  },
  destinations: {
    getAll: () => apiClient.request('/destinos'),
  },
};

export default apiClient;
