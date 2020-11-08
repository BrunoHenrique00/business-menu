const express = require('express')
const routes = express.Router()
const controller = require('../controllers/lojasController')
const { autenticador } = require('../controllers/produtosController')

routes.get('/:nomeLoja', controller.get)

routes.post('/register', controller.post)

routes.delete('/:id', autenticador , controller.delete)

routes.put('/:id', autenticador , controller.put)

routes.post('/login', controller.login)

module.exports = routes