const knex = require('../database/index')

module.exports.get = async (req,res) => {
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

module.exports.post = async (req,res) => {
    const { nome, descricao, preco, loja_id } = req.body

    await knex('produtos').insert({ 
        nome, 
        descricao, 
        preco, 
        loja_id 
    })
    
    res.send('Produto cadastrado com sucesso ( ͡° ͜ʖ ͡°) ' + nome )
} 

module.exports.delete = (req,res) => {
    res.send('rota DELETE')
}

module.exports.put = (req,res) => {
    res.send('rota PUT')
}