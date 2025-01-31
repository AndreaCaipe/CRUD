import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productService.getAllProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await productService.deleteProduct(id);
    setProducts(products.filter(product => product._id !== id));
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Productos</h1>
      <div className="d-flex justify-content-between mb-3">
      <Link to="/products/new"  className="btn btn-primary">Agregar Producto</Link>
      </div>
      <div className="w-50">
       <h3>Buscar producto</h3>
       <input type="text" className="form-control mb-4" placeholder="Buscar productos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      
      <table className="table table-bordered table-striped table-hover">
        <thead className="bg-light">
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Creado</th>
            <th>Actualizado</th>
            
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>{new Date(product.createdAt).toLocaleDateString()}</td>
              <td>{new Date(product.updatedAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/products/edit/${product._id}`} className="btn btn-primary btn-sm ml-2">Editar</Link>
                
              </td>
              <td> 
              <button onClick={() => handleDelete(product._id)} className="btn  btn-sm ml-2">Eliminar</button>
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsPage;
