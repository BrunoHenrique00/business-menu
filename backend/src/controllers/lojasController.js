const knex = require('../database/index')

module.exports.get = async (req, res, next) => {
    try {
        const { id } = req.body;
        const produtos  = await knex('produtos').where('loja_id', id)
        
        if(produtos){
            return res.json({
                produtos: produtos
            });
        }else{
            res.json({
                error: 'Nao achamos o que queria'
            });
        }
    }
    catch (error) {
        next(error)
    }
}

module.exports.adicionaLoja = async (req,res,next) => {
    try{
        const { nome } = req.body
        await knex('lojas').insert({ nome })
        res.json({ message:'Loja cadastrada com sucesso ' + nome })
    }
    catch (error) {
        next(error)
    }
} 

module.exports.deletaLoja = async (req,res,next) => {
    res.send('rota DELETE')
}

module.exports.alteraNomeLoja = async (req,res,next) => {
   try{
        const id_loja = req.params.id;
        const novo_nome = req.body.nome
        await knex('lojas')
        .update('nome', novo_nome)
        .where('id', id_loja)

       return res.json({
           message: 'Alterado com sucesso :)',
           novo_nome: novo_nome
       })
    }
    catch (error) {
        next(error)
    }
}

module.exports.login = async (req,res,next) => {
    try{
        const nomeLoja = req.body.nome
        
        const [ login ] = await knex('lojas').where('nome', nomeLoja)

        if( login ){
            res.json({
                id: login.id
            })
        }else{
            res.json({
                message: "Informacoes erradas"
            })
        }
     }
     catch (error) {
         next(error)
     }
}