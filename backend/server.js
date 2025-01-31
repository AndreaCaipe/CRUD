const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');


const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes'); // Rutas de productos y usuarios

const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api/products', productRoutes);  // Rutas para manejar productos
app.use('/api/users', userRoutes);       // Rutas para manejar usuarios (login, registro)
//app.use('/api/register',userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
