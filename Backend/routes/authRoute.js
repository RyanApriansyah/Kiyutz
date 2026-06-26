const route = require('express').Router()
const { login, test } = require('../controllers/authController')
const {verifyToken} = require('../middleware/authMiddleware')

route.get('/test', login)
route.get('/testt', verifyToken, test)

module.exports = route