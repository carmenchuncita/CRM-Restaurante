const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingrese un correo electrónico válido']
    },
    password: { type: String, required: true },
    role: { type: String,
      enum: ['admin', 'client'], 
      default: 'client' 
    },
    telefono: {
    type: String,
    required: true,
    match: [/^(6|7)\d{8}$/, 'El telefono tiene que empezar por 6 o 7 y tener 9 digitos'],
    },
  },
  {
    collection: 'users',
    timestamps: true, 
  }
);

const Users = mongoose.model('users', userSchema);
module.exports = Users;
