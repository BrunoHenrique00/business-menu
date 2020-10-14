const express = require('express')
const routes = express.Router()

routes.get('/', (req,res) => {
    res.send('Você está na aba de Produtos');
})

routes.post('/', (req,res) => {
    
})

routes.delete('/', (req,res) => {
    
})

routes.put('/', (req,res) => {
    
})

module.exports = routes