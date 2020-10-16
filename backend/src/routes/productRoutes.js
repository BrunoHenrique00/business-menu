const express = require('express')
const routes = express.Router()

const produtos = require('../database/produtos')

routes.get('/', (req,res) => {
    res.json(produtos);
})

routes.post('/', (req,res) => {
    
})

routes.delete('/', (req,res) => {
    
})

routes.put('/', (req,res) => {
    
})

module.exports = routes