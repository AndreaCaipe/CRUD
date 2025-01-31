const Product = require('../models/productModel');


// funion para la creacion de un nuevo producto 
exports.createProduct = async (req, res) => {
    try {
      const { name, description, price, category, quantity } = req.body;
    
      const newProduct = new Product({
        name,
        description,
        price,
        category,
        quantity,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
}; 

// funcion para ontener todos los productos creados  

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

  //  funcion PARA OBTENER PRODUCTOS POR ID


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};
  // FUNcion para actualizar lo spructos creados 


exports.updateProduct = async (req, res) => {
  try {
       const { name, description, price, category, quantity } = req.body;
    
       const updatedProduct = await Product.findByIdAndUpdate(
       req.params.id,
       { name, description, price, category, quantity },
       { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
     res.status(200).json(updatedProduct);
  } catch (error) {
       res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};

  // funcion para eliminar los productos de la lista 


exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
       res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};
