const mongoose = require ('mongoose');

 // modelo para los datos de usuario  para mongo 

const userSchema = new mongoose.Schema({

  name:{ type: String,required: true},
  email: {type: String,required: true,unique: true,trim: true, lowercase: true,match: [/\S+@\S+\.\S+/, 'Por favor, ingrese un correo válido']},
  password: {type: String,required: true,minlength: 6},
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
