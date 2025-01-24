const mongoose = require('mongoose');

// Definir el esquema para las mesas
const mesaSchema = new mongoose.Schema({
    numero: { 
        type: Number, 
        required: true, 
    },
    capacidad: { 
        type: Number, 
        required: true, 
        min: 1 // La capacidad mínima es 1 persona
    },
    isAvailable: { 
        type: Boolean, 
        default: true // Indica si la mesa está disponible
    },
    comensales: { 
        type: Number, 
        default: 0, 
        min: 0, // Número de comensales debe ser mayor o igual a 0
    }
}, {
    collection: 'tables' // Nombre de la colección en la base de datos
});

// Crear el modelo con el esquema definido
const Mesa = mongoose.model('tables', mesaSchema);

module.exports = Mesa;

