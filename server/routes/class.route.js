const express = require('express')
const router = express.Router()
const classController = require('../controllers/class.controller')

router.get('/get', classController.getClasses)
router.post('/create', classController.createClass)
router.patch('/edit', classController.editClass)
router.delete('/delete/:id', classController.removeClass)
router.get('/get/:id', classController.getOneClass)

module.exports = router
