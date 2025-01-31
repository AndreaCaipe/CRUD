// Importar dependencias
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

// Rutas de productos y usuarios
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

// Conexión a la base de datos MongoDB
const connectDB = require('./config/db');

// Configurar el entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar a la base de datos MongoDB
connectDB();

// Rutas
app.use('/api/products', productRoutes);  // Rutas para manejar productos
app.use('/api/users', userRoutes);       // Rutas para manejar usuarios (login, registro)
//app.use('/api/register',userRoutes);

// Configuración del puerto y servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
