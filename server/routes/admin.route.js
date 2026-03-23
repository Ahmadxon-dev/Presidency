const express = require('express');
const adminController = require('../controllers/admin.controller');
const router = express.Router()

router.put("/set/points/student", adminController.setManualPointsStudents)
router.put("/set/points/class", adminController.setManualPointsClass)
router.patch("/add/points/class", adminController.addPointsClass )
router.patch("/add/points/students", adminController.addPointsStudents )

module.exports = router