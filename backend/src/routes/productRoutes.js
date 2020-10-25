const express = require('express')
const routes = express.Router()

const controller = require('../controllers/produtosController')

routes.get('/:nomeLoja', controller.get)

routes.post('/', controller.post)

routes.delete('/', controller.delete)

routes.put('/', controller.put)

module.exports = routes