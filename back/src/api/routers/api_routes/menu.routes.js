
const express = require('express');
const router = express.Router();
const { authenticateToken, roleCheck } = require('../../middleware/jwt-auth');
const {
    getMenus,
    getMenusByDay,
    createMenu,
    updateMenu,
    deleteMenu,
    getAvailableMenus,
    getMenuById
} = require('../../controllers/menu.controller');

// Rutas públicas
router.get('/', authenticateToken, getMenus); // Solo usuarios autenticados pueden ver menús
router.get('/day', getMenusByDay);
router.get('/available', authenticateToken, getAvailableMenus);
router.get('/:menuId',getMenuById);

// Rutas restringidas a administradores
router.post('/create', authenticateToken, roleCheck('admin'), createMenu);
router.put('/:menuId', authenticateToken, roleCheck('admin'), updateMenu);
router.delete('/:menuId', authenticateToken, roleCheck('admin'), deleteMenu);

module.exports = router;

