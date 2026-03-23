const express = require('express')
const requestController = require('../controllers/request.controller')
const router = express.Router()
const upload = require('../middleware/upload.middleware')

router.post('/academics', upload.single('proofImage'), requestController.requestForAcademics)
router.post('/volunteering', requestController.requestForVolunteering)
router.post('/presidency', requestController.requestForPresidency)
router.post('/competitions', requestController.requestForCompetitions)
router.post('/team-competitions', requestController.requestForTeamCompetitions)
router.get('/get/all', requestController.getAllRequests)
router.get('/get/:id', requestController.getRequestsById)
router.patch('/approve/:id', requestController.approveRequest)
router.patch('/reject/:id', requestController.rejectRequest)
router.delete('/delete/all', requestController.deleteAllRequests)

module.exports = router
