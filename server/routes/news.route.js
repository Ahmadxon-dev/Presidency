const express = require('express')
const newsController = require('../controllers/news.controller')
const upload = require('../middleware/upload.middleware')
const router = express.Router()

router.post('/add', upload.single('news_image'), newsController.addNews)
router.delete('/delete/:id', newsController.deleteNews)
router.patch('/edit/:id', upload.single('news_image'), newsController.editNews)
router.get('/get/all', newsController.getAllNews)
router.get('/get/:id', newsController.getOneNews)

module.exports = router
