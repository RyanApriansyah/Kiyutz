const route = require('express').Router()
const { login } = require('../controllers/authController')
const {verifyToken} = require('../middleware/authMiddleware')

route.post('/loginAdmin', login)

module.exports = route