const Reservations = require('../models/reservation.model');
const Users = require('../models/user.model');


// Crear un nuevo menú estnado logueado
const createReservationClient = async (req, res) => {
    const { table, date, time } = req.body;

    const user = await Users.findById(req.user.user_id);
    const client = user.user_id;
    const email = user.email;

    try {
        const newReservation = new Reservations({ 
            client,
            table,
            email,
            date,
            time
        });
        
        await newReservation.save();
        res.status(201).send({ message: "Reserva creado con éxito", menu: newReservation });
    } catch (error) {
        res.status(400).send({ message: "Error al crear la reserva", error: error.message });
    }
};

// Crear un nuevo menú
const createReservation = async (req, res) => {
    const { email, table, date, time } = req.body;

    try {
        const newReservation = new Reservations({ 
            table,
            email,
            date,
            time
        });
        
        await newReservation.save();
        res.status(201).send({ message: "Reserva creado con éxito", menu: newReservation });
    } catch (error) {
        res.status(400).send({ message: "Error al crear la reserva", error: error.message });
    }
};

// Metodo para coger todas las reservas de un cliente
const getReservations = async (req, res) => {
    try {
        const user = await Users.findById(req.user.user_id);
        const role = user.role;

        if(role == 'admin'){
            const reservations = await Reservations.find({ });
        }else{
            const id = user.user_id;
            const reservations = await Reservations.find({ id });
        }

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener las reseñas", error: error.message });
    }
};


module.exports = { createReservationClient, createReservation, getReservations};