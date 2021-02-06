const multer = require('multer')
const jwt = require('jsonwebtoken')

module.exports = {
    storage: multer.diskStorage({

        destination: (req, file, cb) => {
            cb(null, 'src/uploads/')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now()+'-'+file.originalname)
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) =>{

        const allowedMimes = [
            'image/jpeg',
            'image/pjeg',
            'image/png',
            'image/gif',
        ]

        try {
            const { token, nome , preco , descricao } = req.body
            const decoded = jwt.verify(token , process.env.JWT_KEY)

            if(!preco || !nome || !descricao){
                cb(new Error("Faltam informações do produto!"))
            }
            if(decoded && allowedMimes.includes(file.mimetype)){
                req.user = decoded
                cb(null, true)
            } else {
                cb(new Error("Invalid file Type."))
            }
        } catch (error) {
            cb( new Error("Usuario nao autenticado para imagem"))
        }
    } 
}