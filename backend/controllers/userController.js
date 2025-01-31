const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// registro de un nuevo usuario 

exports.registerUser = async (req, res) => {
  const { name,email,password } = req.body;
    if (!email || !password) {
     return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    try {
        const existingUser = await User.findOne({ email });
          if (existingUser) {
          return res.status(400).json({ message: 'El usuario ya existe' });
    }
      const hashedPassword = await bcrypt.hash(password, 10);// Encriptar la contraseña

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito', userId: savedUser._id });
  } catch (error) {
    console.error('Error al registrar el usuario:', error.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Iniciar sesión (Login) para el  usuario


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  } 
   try {
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario inválido' });
    }

        const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return res.status(400).json({ message: 'Contraseña inválida' });
    }

      
      // Crear el token JWT autenticacion 
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
       res.status(500).json({ message: 'Error interno del servidor' });
  }
};

 // Validar el token JWT (middleware para proteger rutas)
 exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error.message);
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
