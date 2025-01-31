import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productService from '../services/productService';

function ProductFormPage() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const data = await productService.getProductById(id);
        setProduct(data);
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await productService.updateProduct(id, product);
    } else {
      await productService.createProduct(product);
    }
    navigate('/products');
  };

  return (
    <div className="container my-5">
      <h1  className="text-center mb-4">{id ? 'Editar Producto' : 'Agregar Producto'}</h1>
      <form  onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
      <div className="mb-3">
        <input name="name"type="text"placeholder="Nombre"  className="form-control" value={product.name}onChange={handleChange}required/>
      </div>
      <div className="mb-3">
        <input name="description" type="text"placeholder="Descripción" className="form-control" value={product.description}onChange={handleChange}required/>
      </div>
      <div className="mb-3">
        <input name="price"type="number"placeholder="Precio" className="form-control"value={product.price}onChange={handleChange}required/>
      </div>
      <div className="mb-3">
          <input name="category"type="text"placeholder="Categoría" className="form-control" value={product.category}onChange={handleChange}required/>
      </div>
      <div className="mb-3">   
        <input name="quantity"type="number"placeholder="Cantidad" className="form-control"value={product.quantity}onChange={handleChange}required/>
      </div> 

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">{id ? 'Actualizar' : 'Agregar'}</button>
        </div>
      </form>
    </div>
  );
}

export default ProductFormPage;
