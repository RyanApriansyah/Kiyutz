const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
    const SECRET_JWT = process.env.SECRET_JWT

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({message: "Unauthorized"})
    }

    try {
        const decode = jwt.verify(token, SECRET_JWT)
        req.user = decode
        next()
    } catch (error) {
        return res.status(403).json({message: "Forbidden Access"})
    }
}

module.exports = {verifyToken}