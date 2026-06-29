const cloudinary = require('cloudinary').v2
const multer = require('multer')
const {CloudinaryStorage} = require('multer-storage-cloudinary')
require('dotenv').config

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET_CLOUDINARY
})

const fileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'img_product',
        allowed_formats: ['png', 'jpg', 'jpeg', 'webp']
    }
})

const uploadImg = multer({storage: fileStorage})

module.exports = uploadImg