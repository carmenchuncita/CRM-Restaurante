const Reservations = require('../models/reservation.model');
const Users = require('../models/user.model');


// Crear un nuevo menú estnado logueado
const createReservationClient = async (req, res) => {
    const { table, date, time } = req.body;

    const user = await Users.findById(req.user.user_id);
    const client = user.user_id;
    const email = user.email;

    try {
        const reservationList = await Reservations.find({ });

        reservationList.forEach(element => {
            const dateFormat = new Date(date);
            
            if(element.email == email && 
                element.table == table 
                && element.date.getTime() == dateFormat.getTime() 
                && element.time == time){
                res.status(401).send({ message: "Ya hay una reserva en ese momento", error: error.message });
            }
        });

        const newReservation = new Reservations({ 
            client,
            table,
            email,
            date,
            time
        });
        
        await newReservation.save();
        res.status(201).send({ message: "Reserva creado con éxito", reservation: newReservation });
    } catch (error) {
        res.status(400).send({ message: "Error al crear la reserva", error: error.message });
    }
};

// Crear un nuevo menú
const createReservation = async (req, res) => {
    const { email, table, date, time } = req.body;

    try {
        const reservationList = await Reservations.find({ });

        reservationList.forEach(element => {
            const dateFormat = new Date(date);
            
            if(element.email == email && 
                element.table == table 
                && element.date.getTime() == dateFormat.getTime() 
                && element.time == time){
                res.status(401).send({ message: "Ya hay una reserva en ese momento", error: error.message });
            }
        });

        const newReservation = new Reservations({ 
            table,
            email,
            date,
            time
        });
        
        await newReservation.save();
        res.status(201).send({ message: "Reserva creado con éxito", reservation: newReservation });
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
            res.status(200).json(reservations);
        }else{
            const id = user.user_id;
            const reservations = await Reservations.find({ id });
            res.status(200).json(reservations);
        }

    } catch (error) {
        res.status(500).send({ message: "Error al obtener las reseñas", error: error.message });
    }
};

const updateReservation = async (req, res) => {
    const { reservation, table, date, time } = req.body; 
  
    if (!date || !time || !table || !reservation) {
      return res.status(400).json({ message: 'La mesa, fecha y hora son obligatorios.' });
    }
  
    try {
      let reserv = await Reservations.findByIdAndUpdate( reservation, {table, date, time} );
  
      const updatedReservation = await reserv.save();
      res.status(200).json({ message: 'Reserva actualizada correctamente.', reserv: updatedReservation });
  
    } catch (error) {
      res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
    }
};

const deleteReservation = async (req, res) => {
    const { reservation } = req.body; 
  
    try {
      const resultado = await Reservations.deleteOne({ reservation});

      res.status(200).json({ message: 'Reserva eliminada correctamente.', resultado: 'elemento eliminado' });
  
    } catch (error) {
      res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
    }
  };

module.exports = { createReservationClient, createReservation, getReservations, updateReservation, deleteReservation};