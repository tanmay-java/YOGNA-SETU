const API_BASE = 'http://localhost:5000/api';

// Helper to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('yojana_token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Auth API
export const authAPI = {
  register: (userData) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getProfile: () => apiRequest('/auth/me'),
};

// Schemes API
export const schemesAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/schemes${query ? `?${query}` : ''}`);
  },

  getById: (id) => apiRequest(`/schemes/${id}`),

  getSaved: () => apiRequest('/schemes/saved'),

  toggleSave: (id) =>
    apiRequest(`/schemes/${id}/save`, { method: 'POST' }),
};

export default apiRequest;
