const mongoose = require('mongoose');

// creacion modelo  datos  del producto para mongo 

const productSchema = new mongoose.Schema({
  name: {type: String,required: true,trim: true},
  description: {type: String,required: true},
  price: {type: Number,required: true,min: 0},
  category: {type: String,required: true},
  quantity: {type: Number,required: true,min: 0 },
}, {
  timestamps: true,  
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;