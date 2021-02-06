const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const { token } = req.body
        const decoded = jwt.verify(token , process.env.JWT_KEY)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ error: "Usuário não autenticado" })
    }
}