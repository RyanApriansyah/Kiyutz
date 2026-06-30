const route = require('express').Router()
const { addProduct, editProduct, deleteProduct, getAllProduct, getActiveProduct, getNewestProduct, getDetailProduct } = require('../controllers/productController')
const {verifyToken} = require('../middleware/authMiddleware')
const uploadImg = require('../middleware/uploadImageMiddleware')

route.post('/product', uploadImg.single('imgProduk'), addProduct)
route.put('/product/:idProduk', uploadImg.single('imgProduk'), editProduct)
route.delete('/product/:idProduk', deleteProduct)
route.get('/product/all', getAllProduct)
route.get('/product/active', getActiveProduct)
route.get('/product/newest', getNewestProduct)
route.get('/product/:idProduk', getDetailProduct)

module.exports = route