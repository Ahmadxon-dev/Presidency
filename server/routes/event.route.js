const express = require('express');
const router = express.Router()
const EventController = require("../controllers/event.controller")
const upload = require("../middleware/upload.middleware")

router.get("/get/all", EventController.getAllEvents)
router.post("/add", upload.single("event_image"), EventController.addEvent)
router.delete("/delete/:id", EventController.deleteEvent)
router.patch("/edit/:id", upload.single("event_image"), EventController.editEvent)
router.get("/get/:id", EventController.getOneEvent)
router.patch("/register/class", EventController.registerClass)
router.patch("/register/student", EventController.registerStudent)
router.get("/get/class/:id", EventController.getClassEvents)
router.get("/get/student/:id", EventController.getStudentEvents)

module.exports = router