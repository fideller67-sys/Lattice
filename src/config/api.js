
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: getHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Network response was not ok');
    }
    return response.json();
  },
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Network response was not ok');
    }
    return response.json();
  },
  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Network response was not ok');
    }
    return response.json();
  },
  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Network response was not ok');
    }
    return response.json();
  },
};

export default api;
