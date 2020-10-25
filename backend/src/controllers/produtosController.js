const produtos = require('../database/produtos')
const lojas = require('../database/lojas')

module.exports.get = (req,res) => {
    const nomeLoja = req.params.nomeLoja
    const resultadoLoja = lojas.find(loja => loja.nome === nomeLoja)
    
    if(resultadoLoja !== undefined){
        const resultProducts = produtos.filter( produto => produto.loja_id === resultadoLoja.id)
        res.json(resultProducts)
    }else{
        res.json({ message: 'Não achamos esta loja :('})
    }

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