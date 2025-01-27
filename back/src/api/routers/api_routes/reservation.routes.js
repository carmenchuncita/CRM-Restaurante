const express = require('express');
const router = express.Router();

const { authenticateToken} = require('../../middleware/jwt-auth');
const { createReservationClient, createReservation, getReservations} = require('../../controllers/reservation.controler');

// Ruta para crear reserva si estas logueado
router.post('/porstReservationClient', authenticateToken,createReservationClient);

// Ruta para crear reserva si estas logueado
router.post('/porstReservation', createReservation);

// Ruta para ver las reservas, todas si eres admin, solo las tuyas si eres client
router.get('/getReservations', authenticateToken, getReservations);

// Ruta para actualizar una mesa (solo para admin)
router.put('/:mesaId', authenticateToken, roleCheck('admin'),updateMesa);

// Ruta para eliminar una mesa (para todos)
router.delete('/:mesaId', authenticateToken,deleteMesa);

// Ruta para obtener todas las mesas disponibles(FALLA EL METODO TRAE EL DATO COMO UN OBJECT)
router.get('/disponibles/available', authenticateToken,getMesasDisponibles);

// Ruta para actualizar la disponibilidad de una mesa (solo para admin)FALLA EL METODO TRAE EL DATO COMO UN OBJECT)
router.put('/available/:mesaId', authenticateToken, roleCheck('admin'),updateDisponibilidadMesa);

module.exports = router;
