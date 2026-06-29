const route = require('express').Router()
const { addProduct } = require('../controllers/productController')
const {verifyToken} = require('../middleware/authMiddleware')
const uploadImg = require('../middleware/uploadImageMiddleware')

route.post('/product', uploadImg.single('imgProduk'), addProduct)

module.exports = route