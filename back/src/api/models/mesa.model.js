const mongoose = require('mongoose');

// Definir el esquema para las mesas
const mesaSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
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
}, {
    collection: 'tables' // Nombre de la colección en la base de datos
});

// Crear el modelo con el esquema definido
const Mesa = mongoose.model('tables', mesaSchema);

module.exports = Mesa;

