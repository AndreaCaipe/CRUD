import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token'); // Verifica si hay un token en localStorage

  if (!token) {
    return <Navigate to="/login" />;  // Si no hay token, redirige al login
  }

  try {
    const decodedToken = jwtDecode(token);// Decodifica el token y verifica si está expirado
    const currentTime = Date.now() / 1000; // 

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error('Error decodificando el token:', error);
    return <Navigate to="/login" />;
  }

  
  return children;
}

export default PrivateRoute;
