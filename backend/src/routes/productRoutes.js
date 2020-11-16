const express = require('express')
const routes = express.Router()

const controller = require('../controllers/produtosController')

routes.get('/:nomeLoja', controller.produtosPorLoja)

routes.post('/', controller.autenticador , controller.adicionaProduto)

routes.delete('/:id', controller.autenticador , controller.deletaProduto)

routes.put('/', controller.autenticador ,  controller.put)


module.exports = routes