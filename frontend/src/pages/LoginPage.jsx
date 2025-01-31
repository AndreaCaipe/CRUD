import React, { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await authService.login(email, password);
      if (token) {
        localStorage.setItem('token', token);
        navigate('/products');
      } else {
        alert('Datos inválidos o error en el servidor');
      }
    } catch (error) {
      alert('Ocurrió un error al intentar iniciar sesión');
    }
  };

  return (
    <div className=" container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center  mb-4">Iniciar sesión</h1>
          <form  className="form-container"onSubmit={handleLogin}>
          
            <div className="mb-3">
              <input type="email"className="form-control"placeholder="Email"value={email}onChange={(e) => setEmail(e.target.value)}required/>
            </div>
            <div className="mb-3">
              <input type="password"className="form-control"placeholder="Contraseña"value={password}onChange={(e) =>setPassword(e.target.value)}required/>
            </div>
            <button type="submit" className="btn  w-100 mt-3">Iniciar sesión</button>
            <button onClick={() => navigate('/register')} className="btn  w-100 mt-3">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
