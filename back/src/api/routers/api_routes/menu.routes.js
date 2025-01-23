const express = require('express');
const router = express.Router();
const { authenticateToken, roleCheck } = require('../../middleware/jwt-auth');
const {
    getMenus,
    getMenusByDay,
    createMenu,
    updateMenu,
    deleteMenu,
    getMenusByCategory,
    getAvailableMenus
} = require('../controllers/menu.controller');

// Rutas públicas
router.get('/', authenticateToken, getMenus); // Solo usuarios autenticados pueden ver menús
router.get('/day', authenticateToken, getMenusByDay);
router.get('/category', authenticateToken, getMenusByCategory);
router.get('/available', authenticateToken, getAvailableMenus);

// Rutas restringidas a administradores
router.post('/', authenticateToken, roleCheck('admin'), createMenu);
router.put('/:menuId', authenticateToken, roleCheck('admin'), updateMenu);
router.delete('/:menuId', authenticateToken, roleCheck('admin'), deleteMenu);

module.exports = router;
