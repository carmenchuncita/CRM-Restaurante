const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
        client: { type: String, required: true },
        table: { type: String, required: true },
        telefono: {type: String, required: true, match: [/^(6|7)\d{8}$/, 'El telefono tiene que empezar por 6 o 7 y tener 9 digitos'],},
        date: { type: Date, required: true },
        time: { type: String,
            enum: ['comida','cena'],
            required: true
        },
        canceled: { type: Boolean,
            default: false,
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
