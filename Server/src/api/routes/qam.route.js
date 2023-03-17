const express = require('express')
const router = express.Router()
const { isQAM } = require('../middlewares/auth.middleware')
const qamController = require('../controllers/qam.controller')

router.get('/download-files', qamController.downloadFile)
module.exports = router
