const knex = require('../database/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv/config')
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_API_KEY)

module.exports.get = async (req, res, next) => {
    try {
        const { id , nome } = req.user;
        const produtos  = await knex('produtos').where('loja_id', id)
        
        if(produtos){
            return res.json({
                produtos: produtos,
                nome: nome
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

        const customer = await stripe.customers.create({
            email: email,
            phone: numero_telefone
        })

        if(!customer.id) return res.status(500).json({error: "Algo deu errado, tente novamente!"})

        bcrypt.hash(password , 10, async (errBcrypt , hash) => {
            if(errBcrypt) return res.status(500).json({error: errBcrypt})

            await knex('lojas').insert({ 
                nome,
                numero_telefone,
                password: hash,
                email,
                id_stripe: customer.id
            })
            return res.json({ message:'Loja cadastrada com sucesso: ' + nome})
        })
    }
    catch (error) {
        next(error)
    }
} 

module.exports.deletaLoja = async (req,res,next) => {
    try {
        const { id } = req.user

        await knex('lojas').where('id',id).del()

        return res.status(200).json({message: "Loja deletada com sucesso!"})
        
    } catch (error) {
        next(error)
    }
}

module.exports.alterarLoja = async (req,res,next) => {
   try{
        const { id } = req.user;
        const { nome , telefone , cor } = req.body

        await knex('lojas')
        .update({
                nome,
                numero_telefone: telefone,
                cor
        }).where('id', id)

        return res.json({
            message: 'Alterado com sucesso :)',
            nome,
            telefone,
            cor
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
                        nome: user.nome
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
        const [ loja ] = await knex('lojas').where('nome', nome)

        res.json({
            numero: loja.numero_telefone,
            cor: loja.cor,
            nome: loja.nome,
            id: loja.id
        })
     }
     catch (error) {
         next(error)
     }
}

module.exports.getPortalStripe = async (req, res, next) => {
    try {
        const { id } = req.user

        const [ user ] = await knex('lojas').where('id' , id)

        const { url }  = await stripe.billingPortal.sessions.create({
            customer: user.id_stripe,
            return_url: 'http://localhost:3000/admin',
        });

        return res.json({ url: url })

    } catch (error) {
        next(error)
    }
}

module.exports.payment = async (req, res, next) => {
    try {

        const { id } = req.user

        const [ user ] = await knex('lojas').where('id' , id)

        const checkout = await stripe.checkout.sessions.create({
            mode: "subscription",
            customer: user.id_stripe,
            payment_method_types: ["card"],
            line_items: [
              {price: 'price_1IIggBJYoInUDvqKALhNxi3D', quantity: 1},
            ],
            success_url: 'http://localhost:3000/admin',
            cancel_url: 'http://localhost:3000/login',
        });

        return res.json({id: checkout.id})

    } catch (error) {
        next(error)
    }
}

module.exports.getAssinatura = async (req, res, next) => {
    try {

        const { id } = req.user

        const [ user ] = await knex('lojas').where('id' , id)

        const customer = await stripe.customers.retrieve(user.id_stripe , {
            expand: ['subscriptions'],
        });

        return res.json({isPaid: customer.subscriptions.data[0].status})

    } catch (error) {
        next(error)
    }
}

