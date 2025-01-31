const mongoose = require('mongoose');

// conexion b-datos de Mongo
const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      });
        console.log('Conexión exitosa a MongoDB');
      
      }catch (error) {
        console.error('Error de conexión a MongoDB:', error);
        process.exit(1);  // Detener si la conexión falla
  }
};

module.exports = connectDB;
