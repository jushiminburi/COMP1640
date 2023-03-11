const express = require('express')
const router = express.Router()
const EventController = require('../controllers/event.controller')
const AuthMiddleWare = require('../middlewares/auth.middleware')

router.post('/add', AuthMiddleWare.isAdmin, EventController.createEvent)
router.get('/list', EventController.getListEvent)
router.delete('/delete/:id', EventController.deleteEvent)
router.put('/update', AuthMiddleWare.isAdmin, EventController.updateEvent)

module.exports = router
