import React from 'react';
import MyImagen from '../images/imagen2.jpg'

function HomePage() {
  
  return (
    <div className='home-container'>
      
      <h1>Iniciar sesion para  gestionar todos los productos</h1>
      <img src={MyImagen} alt="imagen" className='img' />
    </div>
  );
}

export default HomePage;


