const express = require('express')
const routes = express.Router()
const controller = require('../controllers/lojasController')
const loginController = require('../middleware/login')

routes.post('/', controller.get)

routes.get('/:nomeLoja', controller.numeroLoja)

routes.post('/register', controller.adicionaLoja)

routes.delete('/:id', controller.deletaLoja)

routes.put('/', loginController , controller.alterarLoja)

routes.post('/login', controller.login)

module.exports = routes