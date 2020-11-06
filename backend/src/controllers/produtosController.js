const knex = require('../database/index')

const multer = require('multer')

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'src/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname)
    }
})

const upload = multer({ storage })


module.exports.get = async (req,res,next) => {
    try{
        const { nomeLoja } = req.params
        const resultadoLoja = await knex('lojas').where('nome', nomeLoja)

        if(resultadoLoja[0] !== undefined){
            const resultadoProdutos = await knex('produtos').where('loja_id', resultadoLoja[0].id)
            return res.json({
                nomeLoja: nomeLoja,
                produtos: resultadoProdutos
            })
        }
        else{
            return res.send('Não encontramos a sua loja >.<');
        } 
    }
    catch (error) {
        next(error)
    }
}

module.exports.post = async (req,res,next) => {
    try{
        const { nome, descricao, preco, loja_id } = req.body
        const path_image = req.file.filename
        
        await knex('produtos').insert({ 
            nome, 
            descricao, 
            preco, 
            loja_id,
            path_image
        })
        
        res.json({
            message:'Produto cadastrado com sucesso :) ' + nome 
        })
    }
    catch (error) {
        error.status = 400
        next(error)
    }
} 

module.exports.delete = async (req,res,next) => {
    try{
        const { id } = req.params

        await knex('produtos').where('id', id ).del()

        res.json({
            message: 'O produto com id ' + id + ' foi deletado!'
        })
    }
    catch(error){
        next(error) 
    }
}

module.exports.put = async (req,res,next) => {
    res.send('rota PUT')
}

module.exports.autenticador = async (req,res,next) => {
    try{
        const { id } = req.body
        
        if( id ){
            next()
        }else{
            return res.json({
                message: 'ID não verificado'
            }) 
        }
    }
    catch(error){
        next(error) 
    }
}
