const express = require('express')
const app = express()
const productRoutes = require('./routes/productRoutes.js')
const lojasRoutes = require('./routes/lojasRoutes.js')


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/lojas', lojasRoutes )
app.use('/produtos', productRoutes )

<<<<<<< HEAD
app.listen('3000', ()=>{
    console.log('servidor está funcionando andré troll: http://localhost:3000/')
=======
app.listen('3001', ()=>{
    console.log('O servidor está funcionando: http://localhost:3001/')
>>>>>>> a2d9171394d58c483bd4877b1a1fcb75ffa610a2
})

