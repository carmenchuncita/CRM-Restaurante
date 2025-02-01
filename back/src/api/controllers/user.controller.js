const Users = require('../models/user.model');
const Review = require('../models/review.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { createToken } = require('../middleware/jwt-auth'); 

const registerUser = async (req, res) => {
  const { email, password, name, role, telefono } = req.body; 

  try {
    //Check if the user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'El correo electrónico ya está registrado' });
    }

    const newUser = new Users({
      name,
      email,
      password,  
      role,
      telefono
    });

    const createdUser = await newUser.save();
    return res.status(201).json({ message: 'Usuario creado con éxito', data: createdUser });
  } catch (error) {
    console.log(error);
    
    if (error.code === 11000) {
      return res.status(409).json({ message: 'El correo electrónico ya está en uso' });
    }
    return res.status(500).json({ message: 'Error al registrar el usuario', error: error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await Users.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      const token = createToken(user);
      res.json({
          message: "Inicio de sesión con éxito",
          token,
          user: {
              id: user._id,
              email: user.email,
              name: user.name,
              role: user.role
          }
      });
  } catch (error) {
      console.error(error);  
      res.status(500).json({ message: "Error al procesar la solicitud", error: error.message });
  }
};

const verifyToken = async (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ verified: false, message: "No hay token"})
  }

  const token = authHeader.split(' ')[1];
   
 
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ verified: true, user: decoded });
  } catch (error) {

    console.error('Error de JWT:', error);

    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ verified: false, message: 'Token expired' });
    }
    
    return res.status(401).json({ verified: false, message: 'Invalid token', error: error.message });
  }
}

const verifyRole = async (req, res) => {
  const {email} = req.body
  try {
    const user = await Users.findOne({ email });
      if (!user) return res.status(404).json({ message: "Usuario no encontrado", error });
      res.status(200).json({ user: { role :user.role} });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al recuperar la información del usuario", error: error.message });
  }
};

const profileUser = async (req, res) => {
  try {
      const user = await Users.findById(req.user.user_id);
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

      res.json({ user: { name: user.name, email: user.email, id: user._id, role:user.role} });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al recuperar la información del usuario", error });
  }
};
//Metodo para hacer actualizar usuario mediante queryparams
const updateUser = async (req, res) => {
  try {

    const updateData = {};

    if (req.body.name) updateData.name = req.body.name;
    if (req.body.password) updateData.password = req.body.password;

    const user = await Users.findByIdAndUpdate(req.params.id, updateData, {new:true, runValidators: true});

    if (user) {
      const updatedUser = await user.save();
      res.status(200).json({ message: 'Usuario actualizado correctamente.', user: updatedUser });
    } else {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
  }
};

//Metodo que recibe 2 parametros y recoge id del usuario para crear una reseña
//Requiere un usuario loguedo de rol cliente 

const postReview = async (req, res) => {
  const { rating, description } = req.body; 
  const user = await Users.findById(req.user.user_id);
  const reviwer = req.user.user_id;
  try {
    //Check if its a user
    if (user.role !== 'client') {
      return res.status(409).json({ message: 'El admin no puede hacer reseñas' });
    }

    //Check if the review already exists
    const existingReview = await Review.findOne({ reviwer });
    if (existingReview) {
      return res.status(409).json({ message: 'Ya ha hecho una reseña' });
    }

    const newReview = new Review({
      reviwer,
      rating,
      description
    });

    const createdReview = await newReview.save();
    return res.status(201).json({ message: 'Reseña creado con éxito', data: createdReview });
  } catch (error) {
    console.log(error);
    
    if (error.code === 11000) {
      return res.status(409).json({ message: 'El usuario ya tiene una reseña' });
    }
    return res.status(500).json({ message: 'Error al crear la reseña', error: error });
  }
};

//Metodo que recibe 2 parametros y recoge id del usuario para actualizar una reseña
//Requiere un usuario loguedo de rol cliente 

const updateReview = async (req, res) => {
  const { rating, description } = req.body; 
  const reviwer = req.user.user_id;
  const user = await Users.findById(reviwer); 

  if (!rating || !description) {
    return res.status(400).json({ message: 'Rating y descripcion son obligatorios.' });
  }

  //Check if its a user
  if (!user || user.role !== 'client') {
    return res.status(409).json({ message: 'El admin no puede hacer reseñas' });
  }

  try {
    let review = await Review.findOne({ reviwer });
    review.rating = rating;
    review.description = description;

    const updatedReview = await review.save();
    res.status(200).json({ message: 'Reseña actualizada correctamente.', review: updatedReview });

  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
  }
};

const sendEmail = async (req, res) => {
  
  console.log("hola");

try {

  //Config del tipo de correo host y port
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Cambia según el proveedor (por ejemplo, Outlook, Yahoo, etc.)
    port: 587, // Puerto para STARTTLS
    secure: false, // true para puerto 465, false para otros puertos
    auth: {
      user: 'joshuaalejandro1999@gmail.com', // Tu correo electrónico
      pass: 'rqat imod pnqt jvim', // Tu contraseña o token de aplicación (en caso de usar Gmail, activa la verificación en dos pasos y usa un token de aplicación)
    },
  });

  //Creacion del correo y envio
  const info = await transporter.sendMail({
    from: 'josh@gmail.com', // Dirección del remitente
    to: 'joshua.gutierrez@bootcamp-upgrade.com', // Lista de destinatarios
    subject: 'Hola desde Node.js', // Asunto del correo
    text: 'Este es un correo enviado con Nodemailer en Node.js.', // Texto plano
    html: '<b>Este es un correo enviado con Nodemailer en Node.js.</b>', // HTML
  });
  console.log('Correo enviado: %s', info.messageId);
} catch (error) {
  console.error('Error enviando el correo:', error);
}

  return res.status(200).json({ message: 'correo enviado' });

}

// Metodo para coger todas las reviews de la base de datos
const getReviews = async (req, res) => {
  try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
  } catch (error) {
      res.status(500).send({ message: "Error al obtener las reseñas", error: error.message });
  }
};

module.exports = { registerUser,loginUser, profileUser,updateUser,postReview, updateReview,verifyRole,verifyToken, sendEmail, getReviews};
