const express = require('express');
const router = express.Router();


const { authenticateToken, roleCheck } = require('../middleware/authMiddleware');
const { getMesas, getMesaById, createMesa, updateMesa, deleteMesa, getMesasDisponibles, updateDisponibilidadMesa } = require('../../controllers/mesa.controller');

// Ruta para obtener todas las mesas
router.get('/', authenticateToken,getMesas);

// Ruta para obtener una mesa por su ID
router.get('/:mesaId', authenticateToken,getMesaById);

// Ruta para crear una nueva mesa (solo para admin)
router.post('/', authenticateToken, roleCheck('admin'),createMesa);

// Ruta para actualizar una mesa (solo para admin)
router.put('/:mesaId', authenticateToken, roleCheck('admin'),updateMesa);

// Ruta para eliminar una mesa (solo para admin)
router.delete('/:mesaId', authenticateToken, roleCheck('admin'),deleteMesa);

// Ruta para obtener todas las mesas disponibles
router.get('/disponibles', authenticateToken,getMesasDisponibles);

// Ruta para actualizar la disponibilidad de una mesa (solo para admin)
router.put('/disponibilidad/:mesaId', authenticateToken, roleCheck('admin'),updateDisponibilidadMesa);

module.exports = router;

