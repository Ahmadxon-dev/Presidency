const express = require('express');
const router = express.Router()
const shopController = require("../controllers/shop.controller")

router.post("/transfer/toclass", shopController.transferToClass)

//mock Test
router.post("/create/mocktest", shopController.createTest )
router.patch("/edit/mocktest/:id", shopController.editTest )
router.delete("/delete/mocktest/:id", shopController.deleteTest )
router.get("/get/mocktest/all", shopController.getAllTests )
router.get("/get/mocktest/:id", shopController.getsingleTest )
router.patch("/register/mock", shopController.registerUserToMockTest)

// football court
router.post("/create/footballcourt", shopController.createFootballcourt)
router.delete("/delete/footballcourt/:id", shopController.deleteFootballCourt)
router.get("/get/footballcourt", shopController.getAllFootballCourt)
router.patch("/register/footballcourt", shopController.registerClassToFootballcourt )

// cybersport room
router.post("/create/cybersportroom", shopController.createCybersportRoom)
router.delete("/delete/cybersportoom/:id", shopController.deleteCybersportRoom)
router.get("/get/cyberportroom", shopController.getAllCybersportRoom)
router.patch("/register/cybersportroom", shopController.registerUsersToCybersportRoom )

//get dataa of all activities
router.get("/get/activities/all", shopController.fetchAllActivities )

module.exports = router