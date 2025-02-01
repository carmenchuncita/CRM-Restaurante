const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
        client: { type: String, required: true},
        table: { type: String, required: true },
        telefono: { 
            type: String, 
            required: true
        },
        date: { type: Date, required: true },
        time: { type: String,
            enum: ['comida', 'cena',],
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
