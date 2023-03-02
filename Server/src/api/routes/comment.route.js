const express = require('express')
const router = express.Router()
const { isStaff, verifyToken } = require('../middlewares/auth.middleware')
const CommentController = require('../controllers/comment.controller')

router.post('/create', [isStaff, uploadAvatars], IdeaController.createIdea)
router.get('/list', verifyToken, IdeaController.paginationListIdea)

module.exports = router
