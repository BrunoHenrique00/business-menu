const express = require('express')
const routes = express.Router()

const lojas = require('../database/lojas')

routes.get('/:nomeLoja', function (req, res) {
    const nomeLoja = req.params.nomeLoja;
    const resultado = lojas.find(loja => loja.nome === nomeLoja)
    
    if(resultado !== undefined){
        return res.send('Bem vindo à loja ' + resultado.nome);
    }

    res.send('Não achamos a loja que voce queria');

})

routes.post('/', (req,res) => {
    res.send('rota POST')
})

routes.delete('/', (req,res) => {
    res.send('rota DELETE')
})

routes.put('/', (req,res) => {
    res.send('rota PUT')
})

module.exports = routes