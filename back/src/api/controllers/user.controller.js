const Users = require('../models/user.model');
const Review = require('../models/review.model');
const bcrypt = require('bcryptjs');
const { createToken } = require('../middleware/jwt-auth'); 

const registerUser = async (req, res) => {
  const { email, password, name, role } = req.body; 

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
      role
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
              name: user.name
          }
      });
  } catch (error) {
      console.error(error);  
      res.status(500).json({ message: "Error al procesar la solicitud", error: error.message });
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

const updateOrRegisterUser = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: 'Email, nombre y contraseña son obligatorios.' });
  }

  try {
    let user = await Users.findOne({ email });

    if (user) {
    
      user.image = req.file?.path || user.image;
      const updatedUser = await user.save();
      res.status(200).json({ message: 'Usuario actualizado correctamente.', user: updatedUser });
    } else {
  
      const newUser = new Users({
        name,
        email,
        password, 
        image: req.file?.path || ''
      });

      const createdUser = await newUser.save();
      res.status(201).json({ message: 'Usuario creado correctamente.', user: createdUser });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
  }
};

const postReview = async (req, res) => {
  const { rating, description } = req.body; 
  const reviwerObject = await Users.findById(req.user.user_id);
  const reviwer = req.user.user_id;
  try {
    //Check if the user already exists
    const existingReview = await Review.findOne({ reviwerObject });
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

module.exports = { registerUser,loginUser, profileUser,updateOrRegisterUser,postReview };
