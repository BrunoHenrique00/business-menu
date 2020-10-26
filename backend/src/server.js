const express = require('express')
const app = express()
const productRoutes = require('./routes/productRoutes.js')
const lojasRoutes = require('./routes/lojasRoutes.js')


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/lojas', lojasRoutes )
app.use('/produtos', productRoutes )

app.listen('3001', ()=>{
    console.log('O servidor está funcionando: http://localhost:3001/')
})

