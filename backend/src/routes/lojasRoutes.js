const express = require('express')
const routes = express.Router()
const controller = require('../controllers/lojasController')

routes.get('/:nomeLoja', controller.get)

routes.post('/', controller.post)

routes.delete('/', controller.delete)

routes.put('/', controller.put)

module.exports = routes