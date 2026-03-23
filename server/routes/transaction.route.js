const express = require('express')
const transactionController = require('../controllers/transaction.controller')
const router = express.Router()

router.get('/get', transactionController.getAllTransactions)
router.delete('/delete/all', transactionController.deleteAllTransactions)

module.exports = router
