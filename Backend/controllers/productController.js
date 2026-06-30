const { where } = require('sequelize')
const splitPublicId = require('../functions/splitPublicId')
const {Product, Kategori} = require('../models')
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

exports.editProduct = async (req, res) => {
    let newImgProduk = null
    try {
        const {idProduk} = req.params
        const {idKategori, namaProduk, descProduk, harga, stok, statusProduk} = req.body

        const produk = await Product.findByPk(idProduk)
        if (!produk) {
            return res.status(404).json({message : "Produk tidak ditemukan"})
        }

        const checkKategori = await Kategori.findByPk(idKategori)
        if (!checkKategori) {
            return res.status(404).json({message : "Kategori tidak ditemukan"})
        }

        const oldImgProduk = produk.imgProduk
        let imgProduk = oldImgProduk

        if (!namaProduk || !descProduk || !harga || !stok || !statusProduk) {
            return res.status(400).json({message: "semua field wajib diisi"})
        }
        if (namaProduk === "" || descProduk === "" || harga === ""|| stok === "" || statusProduk === "") {
            return res.status(400).json({message: "semua field wajib diisi"})
        }
        if (req.file) {
            imgProduk = req.file.path 
            newImgProduk = splitPublicId(imgProduk)
        }

        await Product.update({
            idKategori: idKategori || produk.idKategori,
            namaProduk: namaProduk || produk.namaProduk,
            descProduk: descProduk || produk.descProduk, 
            harga: harga || produk.harga, 
            stok: stok || produk.harga, 
            statusProduk: statusProduk || produk.statusProduk,
            imgProduk: imgProduk
        }, {where: {idProduct: idProduk}})

        if (req.file && oldImgProduk) {
            const publicId = splitPublicId(oldImgProduk)
            await cloudinary.uploader.destroy(publicId)
            console.log('berhasil hapus gambar lama dari cloud')
        }

        return res.status(200).json({message: "Berhasil update data Produk"})
    } catch (error) {
        if (req.file && oldImgProduk) {
            try {
                await cloudinary.uploader.destroy(newImgProduk)
                console.log('berhasil hapus gambar baru dari cloud')
            } catch (cloudinaryError) {
                console.log(cloudinaryError)
                console.log('Gagal hapus data lama')
            }
        }
        console.log(error)
        return res.status(500).json({message: "Error server"})
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const {idProduk} = req.params

        const checkProduk = await Product.findByPk(idProduk)
        if (!checkProduk) {
            return res.status(404).json({message: "Data prooduk tidak ditemukan"})
        }

        await Product.destroy({where: {idProduct: idProduk}})

        try {
            const publicId = splitPublicId(checkProduk.imgProduk)
            await cloudinary.uploader.destroy(publicId)
        } catch (cloudinaryError) {
            console.log(cloudinaryError)
            return console.log('gagal hapus data gambar')
        }

        return res.status(200).json({message: "Berhasil hapus data dari database"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error server"})
    }
}

exports.getAllProduct = async (req, res) => {
    try {
        const dataProduk = await Product.findAll()
        console.log('test')

        if (dataProduk.length === 0) {
            return res.status(404).json({message: "Tidak ada data produk"})
        }

        res.status(200).json({message: "berhasil ambil data produk", dataProduk})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error server"})
    }
}

exports.getActiveProduct = async (req, res) => {
    try {
        const dataProduk = await Product.findAll({where: {statusProduk: 'Active'}})

        if (dataProduk.length === 0) {
            return res.status(404).json({message: "Tidak ada data produk"})
        }

        res.status(200).json({message: "berhasil ambil data produk", dataProduk})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error server"})
    }
}
exports.getNewestProduct = async (req, res) => {
    try {
        const dataProduk = await Product.findAll({
            limit: 5,
            order:[['createdAt', 'DESC']]
        })

        if (dataProduk.length === 0) {
            return res.status(404).json({message: "Tidak ada data produk"})
        }

        res.status(200).json({message: "berhasil ambil data produk", dataProduk})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error server"})
    }
}

exports.getDetailProduct = async (req, res) => {
    try {
        const {idProduk} = req.params
        const dataProduk = await Product.findByPk(idProduk)

        if (!dataProduk) {
            return res.status(404).json({message: "Tidak ada data produk"})
        }

        res.status(200).json({message: "berhasil ambil data produk", dataProduk})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error server"})
    }
}
