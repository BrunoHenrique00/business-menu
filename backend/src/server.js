const express = require('express')
const app = express()
const productRoutes = require('./routes/productRoutes.js')
const lojasRoutes = require('./routes/lojasRoutes.js')
const cors = require('cors')
const multer = require('multer')
const upload = multer()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// for parsing multipart/form-data
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use('/lojas', lojasRoutes )
app.use('/produtos', productRoutes )

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({error: error.message})
})

app.listen('3001', ()=>{
    console.log('O servidor está funcionando: http://localhost:3001/')
})

