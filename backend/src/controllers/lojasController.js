const knex = require('../database/index')

module.exports.get = async (req, res, next) => {
    try {
        const nomeLoja = req.params.nomeLoja;
        const [ resultado ] = await knex('lojas').where('nome', nomeLoja)
        
        if(resultado !== undefined){
            return res.json({
                nome: resultado.nome
            });
        }

        res.send('Não achamos a loja que voce queria >.<');
    }
    catch (error) {
        next(error)
    }
}

module.exports.post = async (req,res,next) => {
    try{
        const { nome } = req.body
        await knex('lojas').insert({ nome })
        res.send('Loja cadastrada com sucesso ' + nome )
    }
    catch (error) {
        next(error)
    }
} 

module.exports.delete = async (req,res,next) => {
    res.send('rota DELETE')
}

module.exports.put = async (req,res,next) => {
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
        }
        res.json({
            message: "Informacoes erradas"
        })
     }
     catch (error) {
         next(error)
     }
}