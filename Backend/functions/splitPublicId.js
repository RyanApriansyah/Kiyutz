const cloudinary = require('cloudinary').v2

const splitPublicId = (img_product) => {
    const splitUrl = img_product.split('/')
    const publicId = splitUrl.slice(-2).join('/')
    return publicId.split('.')[0]

}

module.exports = splitPublicId