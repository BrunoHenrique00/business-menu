const express = require('express')
const routes = express.Router()

const lojas = [
    'Blend',
    'Barbosinha',
    'Bar do Mou',
    'Bar do Juca'
];

routes.get('/:id', function (req, res) {
    const id = req.params.id;
    const resultado = lojas.find(loja => loja === id)
    
    if(resultado !== undefined){
        return res.send('Bem vindo à loja ' + resultado);
    }

    res.send('Não achamos a loja que voce queria');

})

routes.post('/', (req,res) => {
    
})

routes.delete('/', (req,res) => {
    
})

routes.put('/', (req,res) => {
    
})

module.exports = routes