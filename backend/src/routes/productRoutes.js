const express = require('express')
const routes = express.Router()

const controller = require('../controllers/produtosController')

routes.get('/:nomeLoja', controller.get)

routes.post('/', controller.autenticador , controller.post)

routes.delete('/:id', controller.autenticador , controller.delete)

routes.put('/', controller.autenticador ,  controller.put)


module.exports = routes