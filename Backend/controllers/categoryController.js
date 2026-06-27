const { where } = require('sequelize')
const {Kategori} = require('../models')
const product = require('../models/product')

exports.addCategory = async (req, res) => {
    try {
        const {namaKategori, statusKategori} = req.body

        if (!namaKategori || !statusKategori || namaKategori === "" || statusKategori === "") {
            return res.status(400).json({message : "Email dan Password wajib diisi"})
        }
        if (statusKategori ==! "Active" || statusKategori ==! "Inactive") {
            return res.status(400).json({message : "Nama kategori tidak boleh selain Active dan Inactive"})
        }

        const checkKategori = await Kategori.findOne({where : {namaKategori : namaKategori}})

        if (checkKategori) {
            return res.status(400).json({message : "Nama kategori sudah ada"})
        }

        const addKategori = await Kategori.create({namaKategori : namaKategori, statusKategori : statusKategori})
        await console.log(addKategori)

        res.status(201).json({message : "Kategori berhasil ditambahkan"})
    } catch (error) {
        console.log(error)
    }
}

exports.editCategory = async (req, res) => {
    try {
        const {idKategori} = req.params
        const {namaKategori, statusKategori} = req.body

        const checkKategori = await Kategori.findByPk(idKategori)
        if (!checkKategori) {
            return res.status(404).json({message : "Kategori tidak ditemukan"})
        }
        
        const kategori = await Kategori.findOne({where:{namaKategori : namaKategori}})

        if (kategori) {
            if (kategori.idKategori != checkKategori.idKategori) {
                return res.status(400).json({message : "Kategori sudah ada"})
            } 
        }
            
        await Kategori.update({
            namaKategori: namaKategori || checkKategori.namaKategori,
            statusKategori: statusKategori || checkKategori.statusKategori,
            updatedAt: new Date()
            }, {where : {idKategori : idKategori}})
    
        res.status(201).json({message : "Kategori berhasil diupdate"})
    } catch (error) {
        console.log(error)
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const {idKategori} = req.params

        const checkKategori = await Kategori.findByPk(idKategori)
        console.log(checkKategori)
        if (!checkKategori) {
            return res.status(404).json({message : "Kategori tidak ditemukan"})
        }

        await Kategori.destroy({where : {idKategori : idKategori}})

        res.status(201).json({message : "Kategori berhasil dihapus"})
    } catch (error) {
        console.log(error)
    }
}

exports.getCategory = async(req, res) => {
    try {
        const kategori = await Kategori.findAll()

        if (kategori.length === 0) {
            return res.status(404).json({message : "Kategori tidak ditemukan"})
        }

        const data = {message : "Berhasil ambil semua data", kategori}
        
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}