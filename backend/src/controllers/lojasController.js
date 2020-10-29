const knex = require('../database/index')

module.exports.get = async (req, res) => {
    const nomeLoja = req.params.nomeLoja;
    const resultado = await knex('lojas').where('nome', nomeLoja)
    
    if(resultado !== undefined){
        return res.json({
            nome: resultado[0].nome
        });
    }

    res.send('Não achamos a loja que voce queria');

}

module.exports.post = async (req,res) => {
    const { nome } = req.body
    await knex('lojas').insert({ nome })
    res.send('Loja cadastrada com sucesso ' + nome )
} 

module.exports.delete = (req,res) => {
    res.send('rota DELETE')
}

module.exports.put = (req,res) => {
    res.send('rota PUT')
}