const express = require('express')
const app = express()
const productRoutes = require('./routes/productRoutes.js')
const lojasRoutes = require('./routes/lojasRoutes.js')
const cors = require('cors')
const multer = require('multer')
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'src/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname)
    }
})
const upload = multer({ storage });

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// for parsing multipart/form-data
app.use(upload.single('img'))
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use('/lojas', lojasRoutes )
app.use('/produtos', productRoutes )

<<<<<<< HEAD
<<<<<<< HEAD
app.listen('3000', ()=>{
    console.log('servidor está funcionando andré troll: http://localhost:3000/')
=======
=======
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({error: error.message})
})

>>>>>>> 00a492826b0167bbbb4fb0af80e0eb71f175739e
app.listen('3001', ()=>{
    console.log('O servidor está funcionando: http://localhost:3001/')
>>>>>>> a2d9171394d58c483bd4877b1a1fcb75ffa610a2
})

