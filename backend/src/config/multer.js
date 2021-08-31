const multer = require('multer')
const jwt = require('jsonwebtoken')
const { stripeFilterImage } = require('../middleware/stripe')

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
    fileFilter: async (req, file, cb) =>{

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

            const assinatura  = await stripeFilterImage( {user: decoded} )

            if(!assinatura){
                cb(new Error("Usuario não tem assinatura!"))
            }

            if(decoded && allowedMimes.includes(file.mimetype)){
                req.user = decoded
                cb(null, true)
            } else {
                cb(new Error("Invalid file Type."))
            }
        } catch (error) {
            cb( new Error(error))
        }
    } 
}