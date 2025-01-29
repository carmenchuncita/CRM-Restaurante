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
    principalOptionA: { 
        type: String, 
        required: true,
    },
    principalOptionB: { 
        type: String, 
        required: true,
    },
    principalOptionC: { 
        type: String, 
        required: true,
    },
    secondOptionA: { 
        type: String, 
        required: true,
    },
    secondOptionB: { 
        type: String, 
        required: true,
    },
    secondOptionC: { 
        type: String, 
        required: true,
    },
    dessertsOptionA: { 
        type: String, 
        required: true,
    },
    dessertsOptionB: { 
        type: String, 
        required: true,
    },
    dessertsOptionC: { 
        type: String, 
        required: true,
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
