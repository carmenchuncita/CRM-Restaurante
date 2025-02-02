const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const data = {
    user_id: user._id,
    user_email: user.email,
    user_role: user.role
  };
  return jwt.sign(data, process.env.JWT_SECRET, {expiresIn:"1h"});
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // no token, unauthorized
  if (!token) return res.sendStatus(401);
  //invalid token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded; 
    next();
  });
}

function roleCheck(requiredRole) {
  return function(req, res, next) {
    console.log("User Role:", req.user.user_role);
    console.log("Required Role:", requiredRole);
    if (!req.user) {
      return res.status(401).json({ message: "No user found in request" });
    }

    if (req.user.user_role !== requiredRole) {
      console.log(req.user.user_role);
      return res.status(403).json({ message: "No tiene permisos para realizar esta acción" });
    }
    next();
  };
}



module.exports = { createToken, authenticateToken,roleCheck};