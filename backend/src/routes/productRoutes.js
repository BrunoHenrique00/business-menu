const express = require('express')
const routes = express.Router()
const multerConfig = require('../config/multer')
const multer = require('multer');

const controller = require('../controllers/produtosController')
const loginController = require('../middleware/login')
const { stripeFilter } = require('../middleware/stripe')

routes.get('/:id', stripeFilter , controller.produtosPorLoja)

routes.post('/', multer(multerConfig).single('img'), controller.adicionaProduto)

routes.delete('/:id', loginController , controller.deletaProduto)

routes.put('/:id', loginController , controller.alterarProduto)


module.exports = routes