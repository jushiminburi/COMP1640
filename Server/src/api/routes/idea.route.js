const express = require('express')
const router = express.Router()
const { uploadFiles, uploadAvatars } = require('../middlewares/file.middleware')
const { isStaff, verifyToken } = require('../middlewares/auth.middleware')
const IdeaController = require('../controllers/idea.controller')

router.post('/create', [isStaff, uploadAvatars], IdeaController.createIdea)
router.get('/list', verifyToken, IdeaController.paginationListIdea)

module.exports = router
