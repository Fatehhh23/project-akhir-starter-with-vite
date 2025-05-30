// src/scripts/data/api.js
import CONFIG from '../config';

const ENDPOINTS = {
  GET_STORIES: `${CONFIG.BASE_URL}/stories`,
  ADD_STORY: `${CONFIG.BASE_URL}/stories`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  REGISTER: `${CONFIG.BASE_URL}/register`,
};

// --- Utility untuk token di localStorage ---
function getToken() {
  return localStorage.getItem('authToken');
}

function setToken(token) {
  localStorage.setItem('authToken', token);
}

function clearToken() {
  localStorage.removeItem('authToken');
}

// --- Header Authorization jika token ada ---
function getAuthHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// --- Penanganan response API ---
async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }
  return data;
}

export const AuthAPI = {
  async register({ name, email, password }) {
    const response = await fetch(ENDPOINTS.REGISTER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return handleResponse(response);
  },

  async login({ email, password }) {
    const response = await fetch(ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(response);
    const token = data?.loginResult?.token;
    if (!token) {
      throw new Error('Token tidak ditemukan dalam respons');
    }
    setToken(token);
    return data;
  },

  logout() {
    clearToken();
  },
};

export const StoryAPI = {
  async getStories() {
    const response = await fetch(ENDPOINTS.GET_STORIES, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  async addStory(formData) {
    const response = await fetch(ENDPOINTS.ADD_STORY, {
      method: 'POST',
      headers: {
        ...getAuthHeader(), // Content-Type otomatis multipart
      },
      body: formData,
    });
    return handleResponse(response);
  },
};
