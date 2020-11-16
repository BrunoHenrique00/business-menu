const knex = require('../database/index')
const fs = require('fs')

module.exports.produtosPorLoja= async (req,res,next) => {
    try{
        const { nomeLoja } = req.params
        const resultadoLoja = await knex('lojas').where('nome', nomeLoja)
        
        if(resultadoLoja[0]){
            const resultadoProdutos = await knex('produtos').where('loja_id', resultadoLoja[0].id)
            return res.json({
                nomeLoja: nomeLoja,
                produtos: resultadoProdutos
            })
        }
        else{
            return res.json({
                error: 'Não encontramos a sua loja >.<'
            });
        } 
    }
    catch (error) {
        next(error)
    }
}

module.exports.adicionaProduto = async (req,res,next) => {
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

module.exports.deletaProduto = async (req,res,next) => {
    try{
        const { id } = req.params

        const [ produto ]  = await knex('produtos').where('id', id )

        fs.unlink(`src/uploads/${produto.path_image}`, async (error) => {
            if(error){
                return res.json({ error: error})
            }else{
                console.log('A imagem foi deletada')
                await knex('produtos').where('id', id ).del()
                return res.json({
                    message: 'O produto com id ' + id + ' foi deletado!'
                })
            }
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
