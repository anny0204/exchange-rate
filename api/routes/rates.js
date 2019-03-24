const express = require('express')
const router = express.Router()
const RatesController = require('../controllers/rates')

router.get('/', RatesController.rates_get_all)

router.post('/', RatesController.rates_create_rate)

module.exports = router
