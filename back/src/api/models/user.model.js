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
    image: { type: String, default: '' },
    birth: { type: Date },
    role: { type: String,
      enum: ['admin', 'client'], 
      default: 'client' },
  },
  {
    collection: 'users',
    timestamps: true, 
  }
);

const Users = mongoose.model('users', userSchema);
module.exports = Users;
