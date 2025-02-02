const express = require('express');
const router = express.Router();


const { authenticateToken, roleCheck } = require('../../middleware/jwt-auth');
const { getMesas, getMesaById, createMesa, updateMesa, deleteMesa, getMesasDisponibles, updateDisponibilidadMesa } = require('../../controllers/mesa.controller');

// Ruta para obtener todas las mesas
router.get('/todas', getMesas);

// Ruta para obtener una mesa por su ID
router.get('/:mesaId', authenticateToken,getMesaById);

// Ruta para crear una nueva mesa (solo para admin)
router.post('/create', authenticateToken, roleCheck('admin'),createMesa);

// Ruta para actualizar una mesa (solo para admin)
router.put('/:mesaId', authenticateToken, roleCheck('admin'),updateMesa);

// Ruta para eliminar una mesa (para todos)
router.delete('/:mesaId', authenticateToken,deleteMesa);

// Ruta para obtener todas las mesas disponibles(FALLA EL METODO TRAE EL DATO COMO UN OBJECT)
router.get('/disponibles/available', authenticateToken,getMesasDisponibles);

// Ruta para actualizar la disponibilidad de una mesa (solo para admin)FALLA EL METODO TRAE EL DATO COMO UN OBJECT)
router.put('/available/:mesaId', authenticateToken, roleCheck('admin'),updateDisponibilidadMesa);

module.exports = router;

