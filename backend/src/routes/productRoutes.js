const express = require('express')
const routes = express.Router()

const produtos = require('../database/produtos')
const lojas = require('../database/lojas')

routes.get('/:nomeLoja', (req,res) => {
    const nomeLoja = req.params.nomeLoja
    const resultadoLoja = lojas.find(loja => loja.nome === nomeLoja)
    
    if(resultadoLoja !== undefined){
        const resultProducts = produtos.filter( produto => produto.loja_id === resultadoLoja.id)
        res.json(resultProducts)
    }else{
        res.json({ message: 'Não achamos esta loja :('})
    }

})

routes.post('/', (req,res) => {
    
})

routes.delete('/', (req,res) => {
    
})

routes.put('/', (req,res) => {
    
})

module.exports = routes