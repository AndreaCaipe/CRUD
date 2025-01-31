import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import ProductFormPage from './pages/ProductFormPage';
import PrivateRoute from './components/PrivateRout';

function App() {
  return (
    <Router>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products/*"element={
              <PrivateRoute>
                <Routes>
                  <Route path="/" element={<ProductsPage />} />
                  <Route path="/new" element={<ProductFormPage />} />
                  <Route path="/edit/:id" element={<ProductFormPage />} />
                </Routes>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
  );
}

export default App;


