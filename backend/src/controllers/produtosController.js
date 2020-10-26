const knex = require('../database/index')

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

        await knex('produtos').insert({ 
            nome, 
            descricao, 
            preco, 
            loja_id 
        })
        
        res.send('Produto cadastrado com sucesso ( ͡° ͜ʖ ͡°) ' + nome )
    }
    catch (error) {
        error.status = 400
        next(error)
    }
} 

module.exports.delete = async (req,res,next) => {
    res.send('rota DELETE')
}

module.exports.put = async (req,res,next) => {
    res.send('rota PUT')
}