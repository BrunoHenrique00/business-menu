const knex = require('../database/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv/config')

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
        const { nome , numero_telefone, password , email } = req.body

        bcrypt.hash(password , 10, async (errBcrypt , hash) => {
            if(errBcrypt) return res.status(500).json({error: errBcrypt})

            await knex('lojas').insert({ nome , numero_telefone, password: hash , email  })
            return res.json({ message:'Loja cadastrada com sucesso: ' + nome})
        })
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
        const { email , password } = req.body
        
        const [ user ] = await knex('lojas').where('email', email)

        if(user){
            bcrypt.compare(password , user.password , (error, result) =>{
                if(error) return res.status(401).json(error)

                if(result){
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email
                    }, process.env.JWT_KEY , { expiresIn: "1h"})
                    return res.json({ token })
                }

                return res.status(401).json({error: "Falha na autenticação"})
            })
        }else{
            res.status(401).json({
                message: "Informacoes erradas"
            })
        }
     }
     catch (error) {
         next(error)
     }
}

module.exports.numeroLoja = async (req,res,next) => {
    try{
        const  nome  = req.params.nomeLoja
        const numeroLoja = await knex('lojas').where('nome', nome)

        res.json({
            numero: numeroLoja[0].numero_telefone
        })
     }
     catch (error) {
         next(error)
     }
}