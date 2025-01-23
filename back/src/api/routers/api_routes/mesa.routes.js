const express = require('express');
const router = express.Router();
const mesaController = require('../controllers/mesa.controller');
const { authenticateToken, roleCheck } = require('../middleware/authMiddleware');

// Ruta para obtener todas las mesas
router.get('/', authenticateToken, mesaController.getMesas);

// Ruta para obtener una mesa por su ID
router.get('/:mesaId', authenticateToken, mesaController.getMesaById);

// Ruta para crear una nueva mesa (solo para admin)
router.post('/', authenticateToken, roleCheck('admin'), mesaController.createMesa);

// Ruta para actualizar una mesa (solo para admin)
router.put('/:mesaId', authenticateToken, roleCheck('admin'), mesaController.updateMesa);

// Ruta para eliminar una mesa (solo para admin)
router.delete('/:mesaId', authenticateToken, roleCheck('admin'), mesaController.deleteMesa);

// Ruta para obtener todas las mesas disponibles
router.get('/disponibles', authenticateToken, mesaController.getMesasDisponibles);

// Ruta para actualizar la disponibilidad de una mesa (solo para admin)
router.put('/disponibilidad/:mesaId', authenticateToken, roleCheck('admin'), mesaController.updateDisponibilidadMesa);

module.exports = router;
