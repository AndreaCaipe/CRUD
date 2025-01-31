const jwt = require('jsonwebtoken');

// middlware oara verificar el token y obtener el token verifica y decofica

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
          return res.status(401).json({ message: 'Acceso no autorizado, se requiere autenticación' });
      }
      try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.userId = decoded.userId;
          next();
  } catch (error) {
   
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = { verifyToken };
