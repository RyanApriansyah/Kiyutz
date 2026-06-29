const splitPublicId = require('../functions/splitPublicId')
const {Product} = require('../models')
const cloudinary = require('cloudinary').v2

exports.addProduct = async (req, res) => {
    try {
        const {idKategori, namaProduk, descProduk, harga, stok, statusProduk} = req.body

        if (!namaProduk || !descProduk || !harga || !stok || !statusProduk) {
            return res.status(400).json({message: "semua field wajib diisi"})
        }
        if (namaProduk === "" || descProduk === "" || harga === ""|| stok === "" || statusProduk === "") {
            return res.status(400).json({message: "semua field wajib diisi"})
        }

        if (!req.file) {
            return res.status(400).json({message: "wajib upload gambar"})
        }

        const imgUrl = req.file.path

        await Product.create({
            idKategori: idKategori, 
            namaProduk: namaProduk, 
            imgProduk: imgUrl, 
            descProduk: descProduk, 
            harga: harga, 
            stok: stok, 
            statusProduk: statusProduk})

        res.status(201).json({message: "Berhasil tambah product"})
    } catch (error) {
        if (req.file && req.file.path) {   
            try {
                const publicId = splitPublicId(req.file.path)
                await cloudinary.uploader.destroy(publicId)
                console.log('berhasil hapus gambar dari cloud')
            } catch (cloudinaryError) {
                console.log('gagal hapus gambar dari cloud', cloudinaryError)
            }
        }
        console.log(error)
        return res.status(500).json({message: "Error Server"})
    }
}

// exports.editProduct
// exports.deleteProduct
// exports.getProduct
// exports.getDetailProduct
