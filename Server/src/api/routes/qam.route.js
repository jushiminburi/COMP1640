const express = require('express')
const router = express.Router()
const { isQAM } = require('../middlewares/auth.middleware')
const qamController = require('../controllers/qam.controller')
const dashboardController = require('../controllers/dashboard.controller')

router.get('/download-files', qamController.downloadFile)
router.get('/get-event-document', qamController.listDocumentInfo)
router.get('/detail-document/:id', qamController.detailDocument)
router.get('/download-csv/:id', qamController.downloadFilecsv)
router.get('/dowload/:file', qamController.dowloadFile)
router.get('/dashboard', dashboardController.ideaOfDepartmentOrCategory)
module.exports = router
