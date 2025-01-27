const Mesa = require('../models/mesa.model');

// Obtener todas las mesas
const getMesas = async (req, res) => {
    try {
        const mesas = await Mesa.find();
        res.status(200).json(mesas);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener las mesas", error: error.message });
    }
};

// Obtener una mesa por su ID
const getMesaById = async (req, res) => {
    try {
        const mesa = await Mesa.findById(req.params.mesaId);
        if (!mesa) {
            return res.status(404).send({ message: "Mesa no encontrada" });
        }
        res.status(200).json(mesa);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener la mesa", error: error.message });
    }
};

const createMesa = async (req, res) => {
    try {
        const { numero, capacidad, comensales } = req.body;

        // Validar la cantidad de comensales en el controlador
        if (comensales > capacidad) {
            return res.status(400).json({ error: 'El número de comensales no puede superar la capacidad de la mesa.' });
        }

        // Crear una nueva mesa
        const nuevaMesa = new Mesa({
            numero,
            capacidad,
            comensales
        });

        // Guardar la mesa en la base de datos
        await nuevaMesa.save();

        return res.status(201).json(nuevaMesa);
    } catch (error) {
        return res.status(500).json({ error: 'Hubo un error al crear la mesa.' });
    }
};

// Actualizar los datos de una mesa
const updateMesa = async (req, res) => {
    const { numero, capacidad, isAvailable, comensales } = req.body;

    try {
        const mesa = await Mesa.findByIdAndUpdate(
            req.params.mesaId,
            { numero, capacidad, isAvailable, comensales },
            { new: true }
        );
        if (!mesa) {
            return res.status(404).send({ message: "Mesa no encontrada" });
        }
        res.status(200).send({ message: "Mesa actualizada con éxito", mesa });
    } catch (error) {
        res.status(400).send({ message: "Error al actualizar la mesa", error: error.message });
    }
};

// Eliminar una mesa
const deleteMesa = async (req, res) => {
    try {
        const mesa = await Mesa.findByIdAndDelete(req.params.mesaId);
        if (!mesa) {
            return res.status(404).send({ message: "Mesa no encontrada" });
        }
        res.status(200).send({ message: "Mesa eliminada con éxito" });
    } catch (error) {
        res.status(500).send({ message: "Error al eliminar la mesa", error: error.message });
    }
};

// Obtener mesas disponibles
const getMesasDisponibles = async (req, res) => {
    try {
        const mesasDisponibles = await Mesa.find({ isAvailable: true });
        res.status(200).json(mesasDisponibles);
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error al obtener las mesas disponibles", error: error.message })
        ;
    }
};

// Actualizar la disponibilidad de una mesa
const updateDisponibilidadMesa = async (req, res) => {
    const { isAvailable } = req.body;

    try {
        const mesa = await Mesa.findByIdAndUpdate(
            req.params.mesaId,
            { isAvailable },
            { new: true }
        );
        if (!mesa) {
            return res.status(404).send({ message: "Mesa no encontrada" });
        }
        res.status(200).send({ message: "Disponibilidad de la mesa actualizada", mesa });
    } catch (error) {
        res.status(400).send({ message: "Error al actualizar la disponibilidad de la mesa", error: error.message });
    }
};

module.exports = {
    getMesas,
    getMesaById,
    createMesa,
    updateMesa,
    deleteMesa,
    getMesasDisponibles,
    updateDisponibilidadMesa
};
