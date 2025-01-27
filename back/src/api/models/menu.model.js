const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
    },
    description: { 
        type: String, 
        required: true, 
    },
    price: { 
        type: Number, 
        required: true, 
        min: 0 // Asegura que el precio no sea negativo
    },
    principal: { 
        type: String, 
        required: true,
        enum: ['pollo', 'pescado', 'vegetariano'] // Categorías de menú válidas
    },
    second: { 
        type: String, 
        required: true,
        enum: ['arroz', 'papas', 'ensalada'] // Categorías de menú válidas
    },
    desserts: { 
        type: String, 
        required: true,
        enum: ['flan', 'tarta', 'helado', 'fruta'] // Categorías de menú válidas
    },
    isAvailable: { 
        type: Boolean, 
        default: true // Indica si el plato está disponible
    },
    day: { 
        type: String, 
        required: true,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], // Días de la semana válidos
    }
}, {
    collection: 'menu' // Nombre de la colección en la base de datos
});

// Crear el modelo con el esquema definido
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
