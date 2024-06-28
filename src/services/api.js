// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data;
};

// Ejemplo de una nueva función para obtener recetas
export const getMyRecipes = async (token) => {
  const response = await axios.get(`${API_URL}/recipes/my-recipes`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getRecipes = async () => {
  const response = await axios.get(`${API_URL}/recipes`);
  return response.data;
};
