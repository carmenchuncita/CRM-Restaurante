const Menu = require('../models/menu.model');


// Obtener menús de todos los días
const getMenus = async (req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener los menús", error: error.message });
    }
};

// Obtener menús por día específico
const getMenusByDay = async (req, res) => {
    try {
        const { day } = req.query;

        if (!day) {
            return res.status(400).send({ message: "El parámetro 'day' es requerido" });
        }

        const menus = await Menu.find({ day });
        if (menus.length === 0) {
            return res.status(404).send({ message: `No se encontraron menús para el día ${day}` });
        }

        res.json(menus);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener menús por día", error: error.message });
    }
};

// Crear un nuevo menú
const createMenu = async (req, res) => {
         
            const { name, 
                description, 
                price, 
                principalOptionA,
                principalOptionB,
                principalOptionC, 
                secondOptionA,
                secondOptionB,
                secondOptionC, 
                dessertsOptionA, 
                dessertsOptionB,
                dessertsOptionC,
                day, 
                isAvailable } = req.body;
    
    try {
        const newMenu = new Menu({ 
            name, 
            description, 
            price, 
            principalOptionA, 
            principalOptionB, 
            principalOptionC, 
            secondOptionA, 
            secondOptionB, 
            secondOptionC, 
            dessertsOptionA, 
            dessertsOptionB, 
            dessertsOptionC, 
            day, 
            isAvailable 
        });
        
        await newMenu.save();
        res.status(201).send({ message: "Menú creado con éxito", menu: newMenu });
    } catch (error) {
        res.status(400).send({ message: "Error al crear el menú", error: error.message });
    }
};

const getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.menuId);
        if (!menu) {
            return res.status(404).send({ message: "Menú no encontrado" });
        }
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener el menú", error: error.message });
    }
};


// Actualizar un menú existente
const updateMenu = async (req, res) => {
    const {
        name,
        description,
        price,
        principalOptionA,
        principalOptionB,
        principalOptionC,
        secondOptionA,
        secondOptionB,
        secondOptionC,
        dessertsOptionA,
        dessertsOptionB,
        dessertsOptionC,
        day,
        isAvailable,
    } = req.body;

    try {
        const menu = await Menu.findByIdAndUpdate(
            req.params.menuId,
            {
                name,
                description,
                price,
                principalOptionA,
                principalOptionB,
                principalOptionC,
                secondOptionA,
                secondOptionB,
                secondOptionC,
                dessertsOptionA,
                dessertsOptionB,
                dessertsOptionC,
                day,
                isAvailable,
            },
            { new: true } // Esto asegura que se devuelve el menú actualizado
        );

        if (!menu) {
            return res.status(404).send({ message: "Menú no encontrado" });
        }

        res.status(200).send({ message: "Menú actualizado con éxito", menu });
    } catch (error) {
        res.status(400).send({ message: "Error al actualizar el menú", error: error.message });
    }
};

// Eliminar un menú
const deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findByIdAndDelete(req.params.menuId);
        if (!menu) {
            return res.status(404).send({ message: "Menú no encontrado" });
        }
        res.status(200).send({ message: "Menú eliminado con éxito" });
    } catch (error) {
        res.status(500).send({ message: "Error al eliminar el menú", error: error.message });
    }
};



const getAvailableMenus = async (req, res) => {
    try {
        const menus = await Menu.find({ isAvailable: true });
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener menús disponibles", error: error.message });
    }
};

module.exports = {
    getMenus,
    getMenusByDay,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu,
    getAvailableMenus
};

