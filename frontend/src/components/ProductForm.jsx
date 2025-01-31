import React, { useState } from 'react';
import productService from '../services/productService';

function ProductForm({ existingProduct, onProductSaved }) {
  const [name, setName] = useState(existingProduct ? existingProduct.name : '');
  const [description, setDescription] = useState(existingProduct ? existingProduct.description : '');
  const [price, setPrice] = useState(existingProduct ? existingProduct.price : '');
  const [category, setCategory] = useState(existingProduct ? existingProduct.category : '');
  const [quantity, setQuantity] = useState(existingProduct ? existingProduct.quantity : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, description, price, category, quantity };
    if (existingProduct) {                                                   // Si ya existe el producto, lo actualizamos
      await productService.updateProduct(existingProduct._id, productData);
    } else {
            await productService.createProduct(productData);
        }
    
    onProductSaved();  // Llamamos a la función que actualiza la lista de productos
  };

  return (
    <div className="product-form">
      <h2>{existingProduct ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Product Name"value={name} onChange={(e) => setName(e.target.value)} required/>
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}required/>

        <input type="number"placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required/>

        <input type="text"placeholder="Category"value={category}onChange={(e) => setCategory(e.target.value)}required/>

        <input type="number"placeholder="Quantity"value={quantity}onChange={(e) => setQuantity(e.target.value)}required/>

        <button type="submit">{existingProduct ? 'Update Product' : 'Add Product'}</button>
      </form>
    </div>
  );
}

export default ProductForm;
