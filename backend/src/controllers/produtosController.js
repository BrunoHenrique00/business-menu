const knex = require('../database/index')
const fs = require('fs')

module.exports.produtosPorLoja= async (req,res,next) => {
    try{
        const { nomeLoja } = req.params
        const [ resultadoLoja ] = await knex('lojas').where('nome', nomeLoja)
        
        if(resultadoLoja){
            const resultadoProdutos = await knex('produtos').where('loja_id', resultadoLoja.id)
            return res.json({
                nomeLoja: resultadoLoja.nome,
                cor: resultadoLoja.cor,
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
        const { nome, descricao, preco } = req.body
        const path_image = req.file.filename
        const { id } = req.user
       
        await knex('produtos').insert({ 
            nome, 
            descricao, 
            preco, 
            loja_id: id,
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
        const user_id = req.user.id

        const [ produto ]  = await knex('produtos').where('id', id )

        if(produto.loja_id !== user_id) return res.status(401).json({error: "Usuario não tem permissão!"})

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

module.exports.alterarProduto = async (req,res,next) => {
    try {
        const { nome , preco , descricao } = req.body
        const { id } = req.params
        const user_id = req.user.id

        const [ produto ] = await knex('produtos').where('id', id)
        
        if(produto.loja_id === user_id){
            await knex('produtos')
            .update({
                nome,
                preco,
                descricao
            }).where('id', id)

            return res.status(200).json({ message: 'Seu produto foi alterado com sucesso!'})
        }
        
    } catch (error) {
        next(error)
    }
}