import React, { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = { name, email, password };

    try {
      await authService.register(userData);
      alert('Usuario registrado con éxito');
      navigate('/login'); // Redirige al login después del registro
    } catch (error) {
      alert('No se pudo registrar el usuario');
    }
  };

  return (
    <div className=" container mt-5">
      <div className="row justify-content-center">
      <div className="col-md-6">
      <h1 className="text-center  mb-4">Registrar Usuario</h1>
      <form className='form-container' onSubmit={handleRegister}>
        <div className="mb-3">
        <input type="text"placeholder="Nombre" className="form-control" value={name}onChange={(e) => setName(e.target.value)}required/>
        </div>
        <div className="mb-3">
        <input type="email"placeholder="Email" className="form-control"value= {email}onChange={(e) => setEmail(e.target.value)}required/>
        </div>
        <div className="mb-3">
        
        
        <input type="password"placeholder="Contraseña" className="form-control"value={password}onChange={(e) => setPassword(e.target.value)}required/>
        </div>
        <button type="submit" className="btn  w-100 mt-3">Registrar</button>
        
      </form>
      </div>
      </div>
      
    </div>
  );
}

export default RegisterPage;
