const express = require('express');
const router = express.Router();
const { authenticateToken,roleCheck } = require('../../middleware/jwt-auth');
const {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getUpcomingEvents,
    getEventsByType,
    getEventsByDateRange
} = require('../../controllers/sport.controller');


router.get('/getAllEvents', getEvents);
router.get('/getById/:eventId', getEventById);
//protected by authentication and only accessible to admin
router.post('/createEvent', authenticateToken, roleCheck('admin'), createEvent)
//protected by authentication and only accessible to admin
router.put('/updateEvent/:eventId', authenticateToken, roleCheck('admin'), updateEvent);
//protected by authentication and only accessible to admin
router.delete('/deleteEvent/:eventId', authenticateToken, roleCheck('admin'), deleteEvent);

//Advanced routes
router.get('/events/upcoming', getUpcomingEvents)
router.get('/events', getEventsByType);
router.get('/events/date', getEventsByDateRange);

module.exports = router;
