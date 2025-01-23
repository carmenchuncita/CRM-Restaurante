const mongoose = require('mongoose');



const menuSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
    },
    description: { 
        type: String, 
        required: true, 
        trim: true 
    },
    price: { 
        type: Number, 
        required: true, 
        min: 0 // Asegura que el precio no sea negativo
    },
    category: { 
        type: String, 
        required: true,
        enum: ['primero', 'segundo', 'postre', 'cafe'] // Categorías de menú
    },

    isAvailable: { 
        type: Boolean, 
        default: true // Indica si el plato está disponible
    },
    
    day: { 
        type: String, 
        required: true,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], // Días de la semana
    }
}, {
    collection: 'menu' // Nombre de la colección en la base de datos
});

// Crear el modelo con el esquema definido
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
