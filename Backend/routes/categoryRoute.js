const route = require('express').Router()
const { addCategory, editCategory, deleteCategory, getCategory } = require('../controllers/categoryController')
const {verifyToken} = require('../middleware/authMiddleware')

route.get('/category', getCategory)
route.post('/category', addCategory)
route.put('/category/:idKategori', editCategory)
route.delete('/category/:idKategori', deleteCategory)

module.exports = route