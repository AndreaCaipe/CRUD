import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <h1 className="text-white">CarterasCM</h1>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link text-white">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link text-white">Inicia Sesión</Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link text-white">Productos</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
