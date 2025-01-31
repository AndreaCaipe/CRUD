
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';// URL base de la API para usuarios

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data.token;
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response?.data?.message || error.message);
    return null;
  }
};

//función para registrar usuarios
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error.response?.data?.message || error.message);
    throw error; 
  }
};

const authService = {
  login,
  register,
};

export default authService;
