const express = require('express')
const routes = express.Router()
const controller = require('../controllers/lojasController')
const { autenticador } = require('../controllers/produtosController')

routes.post('/', autenticador, controller.get)

routes.get('/:nomeLoja', controller.numeroLoja)

routes.post('/register', controller.adicionaLoja)

routes.delete('/:id', autenticador , controller.deletaLoja)

routes.put('/:id', autenticador , controller.alteraNomeLoja)

routes.post('/login', controller.login)

module.exports = routes