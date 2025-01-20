const Menus = require('../models/menu.model');

const getEvents = async (req, res) => {
    try {
        const events = await Menus.find(); 
        res.json(events);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener los eventos", error: error.message });
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await Menus.findById(req.params.eventId);
        if (!event) {
            return res.status(404).send({ message: "Evento no encontrado" });
        }
        res.json(event);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener el evento", error: error.message });
    }
};

const createEvent = async (req, res) => {
    const { name, description, date, location, type } = req.body;
    try {
        const newEvent = new Menus({ name, description, date, location, type }); 
        await newEvent.save();
        res.status(201).send({ message: "Evento creado con éxito", event: newEvent });
    } catch (error) {
        res.status(400).send({ message: "Error al crear el evento", error: error.message });
    }
};

const updateEvent = async (req, res) => {
    const { name, description, date, location, type } = req.body;
    try {
        const event = await Menus.findByIdAndUpdate(
            req.params.eventId,
            { name, description, date, location, type }, 
            { new: true }
        );
        if (!event) {
            return res.status(404).send({ message: "Evento no encontrado" });
        }
        res.status(200).send({ message: "Evento actualizado con éxito", event });
    } catch (error) {
        res.status(400).send({ message: "Error al actualizar el evento", error: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Menus.findByIdAndDelete(req.params.eventId);
        if (!event) {
            return res.status(404).send({ message: "Evento no encontrado" });
        }
        res.status(200).send({ message: "Evento eliminado con éxito" });
    } catch (error) {
        res.status(500).send({ message: "Error al eliminar el evento", error: error.message });
    }
};

// Advanced
const getUpcomingEvents = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7); 

        const events = await Menus.find({
            date: { $gte: today, $lte: nextWeek }
        }).sort({ date: 1 });

        res.status(200).json(events);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener eventos de la próxima semana", error: error.message });
    }
};

const getEventsByType = async (req, res) => {
    try {
        const { type } = req.query;

        if (!type) {
            return res.status(400).send({ message: "El parámetro 'type' es requerido" });
        }

        const events = await Menus.find({ type });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).send({ message: "Error al filtrar eventos por tipo", error: error.message });
    }
};

const getEventsByDateRange = async (req, res) => {
    try {
        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).send({ message: "Los parámetros 'from' y 'to' son requeridos" });
        }

        const events = await Menus.find({
            date: { $gte: new Date(from), $lte: new Date(to) }
        }).sort({ date: 1 });

        res.status(200).json(events);
    } catch (error) {
        res.status(500).send({ message: "Error al filtrar eventos por rango de fechas", error: error.message });
    }
};
    
module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getUpcomingEvents,
    getEventsByType,
    getEventsByDateRange
};
