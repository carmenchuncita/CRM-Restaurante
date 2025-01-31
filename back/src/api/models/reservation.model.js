const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
        client: { type: String},
        table: { type: String, required: true },
        email: { 
            type: String, 
            required: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingrese un correo electrónico válido']
        },
        date: { type: Date, required: true },
        time: { type: String,
            enum: ['comida', 'cena',],
            required: true
        },
    },
    {
        collection: 'reservations',
        timestamps: true, 
    }
);

const Reservations = mongoose.model('reservations', reservationSchema);
module.exports = Reservations;