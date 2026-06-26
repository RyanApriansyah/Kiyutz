const { where } = require('sequelize')
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

exports.login = async (req, res) => {
    const SECRET_JWT = process.env.SECRET_JWT
    try {
        const {email, password} = req.body

        if (!email || email === "" || !password || password === "") {
            return res.status(400).json({message : "Email dan Password wajib diisi"})
        }

        const checkUser = await User.findOne({where : {email : email}})
        if (!checkUser) {
            return res.status(400).json({message : "Email atau Password salah"})
        }
        const compare = bcrypt.compareSync(password, checkUser.password)
        if (!compare) {
            return res.status(400).json({message : "Email atau Password salah"})
        }

        const token = jwt.sign(
            {idUser : checkUser.idUser, nama : checkUser.nama, email : checkUser.email},
            SECRET_JWT,
            {expiresIn: '1m'}
        )

        const data = {message: "Berhasil Login", token, user: {idUser : checkUser.idUser, nama : checkUser.nama, email : checkUser.email}}

        res.status(200).json({data})
    } catch (error) {
        console.log(error)
    }
}