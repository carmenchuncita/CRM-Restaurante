const express = require('express');
const router = express.Router();

const { authenticateToken} = require('../../middleware/jwt-auth');
const { createReservationClient, createReservation, getReservations, updateReservation, deleteReservation} = require('../../controllers/reservation.controler');

// Ruta para crear reserva si estas logueado
router.post('/postReservationClient', authenticateToken,createReservationClient);

// Ruta para crear reserva si estas logueado
router.post('/postReservation', createReservation);

// Ruta para ver las reservas, todas si eres admin, solo las tuyas si eres client
router.get('/getReservations', authenticateToken, getReservations);

// Ruta para actualizar una reserva
router.put('/updateReservation', updateReservation);

// Ruta para eliminar una reserva
router.delete('/deleteReservation', deleteReservation);

module.exports = router;
