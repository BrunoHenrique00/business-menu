const lojas = require('../database/lojas')

module.exports.get = function (req, res) {
    const nomeLoja = req.params.nomeLoja;
    const resultado = lojas.find(loja => loja.nome === nomeLoja)
    
    if(resultado !== undefined){
        return res.send('Bem vindo à loja ' + resultado.nome);
    }

    res.send('Não achamos a loja que voce queria');

}

module.exports.post = (req,res) => {
    res.send('rota POST')
} 

module.exports.delete = (req,res) => {
    res.send('rota DELETE')
}

module.exports.put = (req,res) => {
    res.send('rota PUT')
}