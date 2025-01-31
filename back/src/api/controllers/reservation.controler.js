const Reservations = require('../models/reservation.model');
const Users = require('../models/user.model');
const Tables = require('../models/mesa.model');


// Crear un nuevo menú estnado logueado
const createReservationClient = async (req, res) => {
    const { table, telefono, date, time } = req.body;

    const user = await Users.findById(req.user.user_id);
    const client = user._id;

    try {
        const reservationList = await Reservations.find({ });

        reservationList.forEach(element => {
            const dateFormat = new Date(date);
            
            if(element.table == table 
                && element.date.getTime() == dateFormat.getTime() 
                && element.time == time){
                res.status(401).send({ message: "Ya hay una reserva en ese momento", error: error.message });
            }
        });

        const newReservation = new Reservations({ 
            client,
            table,
            telefono,
            date,
            time
        });
        
        await newReservation.save();
        res.status(201).send({ message: "Reserva creado con éxito", reservation: newReservation });
    } catch (error) {
        res.status(400).send({ message: "Error al crear la reserva", error: error.message });
    }
};

// Crear una reserva sin estar logueado
/*
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
*/


// Metodo para coger todas las reservas de un cliente
const getReservations = async (req, res) => {
    try {
        const user = await Users.findById(req.user.user_id);
        const role = user.role;
        const listaEmail = [];

        if(role == 'admin'){
            const reservations = await Reservations.find({ });
            for (let element of reservations) {
                const id = element.client;
                const client = await Users.findById(id);

                const tableName = await Tables.findById(element.table);
                const datos = {"email" : client.email,
                    "table" : tableName.nombre,
                    "telefono" : element.telefono,
                    "date" : element.date,
                    "time" : element.time
                };

                listaEmail.push(datos);                
            }

            
        }else{
            const id = user._id;
            const reservations = await Reservations.find({ client: id });

            for (let element of reservations) {

                const tableName = await Tables.findById(element.table);
                const datos = {"email" : user.email,
                    "table" : tableName.nombre,
                    "telefono" : element.telefono,
                    "date" : element.date,
                    "time" : element.time
                };

                if(element.canceled == false){
                    listaEmail.push(datos);
                }
            }
        }

        res.status(200).json(listaEmail);

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
      let reserv = await Reservations.findByIdAndUpdate( reservation, 
        {table : table,
            date : date, 
            time : time} );
  
      const updatedReservation = await reserv.save();
      res.status(200).json({ message: 'Reserva actualizada correctamente.', reserv: updatedReservation });
  
    } catch (error) {
      res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
    }
};

const deleteReservation = async (req, res) => {
    const { reservation } = req.body; 
  
    try {
        let reserv = await Reservations.findByIdAndUpdate(
            reservation,               
            { canceled: true }
        );

      res.status(200).json({reserv});
  
    } catch (error) {
      res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
    }
  };

module.exports = { createReservationClient, getReservations, updateReservation, deleteReservation};