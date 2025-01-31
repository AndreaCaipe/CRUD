import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';                           //verificar en post el 

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

axios.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token'); 
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

const getAllProducts = async () => {
  const response = await axios.get(API_URL, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(API_URL, product, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

const updateProduct = async (id, product) => {
  const response = await axios.put(`${API_URL}/${id}`, product, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

const deleteProduct = async (id) => {
  const confirmed = window.confirm("¿Está seguro de que desea eliminar este producto?");
  if (confirmed) {
    await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
  }
};

const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

const productService = {getAllProducts,createProduct,updateProduct,deleteProduct,getProductById,
};

export default productService;
