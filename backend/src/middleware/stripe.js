require('dotenv/config')
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_API_KEY)
const knex = require('../database/index')

const stripeFilter = async (req, res, next) => {
    try {

        const { id } = req.user || req.params

        const [ user ] = await knex('lojas').where('id' , id)

        const customer = await stripe.customers.retrieve(user.id_stripe , {
            expand: ['subscriptions'],
        });

        const [ assinatura ] = customer.subscriptions.data

        if(assinatura.status === 'active' ){
            next()
        } else if(assinatura === undefined){
            console.log(assinatura.status);
            return res.status(401).json({error: 'Usuario não tem assinatura!'})
        }

    } catch (error) {
        next(error)
    }
}

const stripeFilterImage = async (req , cb) => {
    try {

        const { id } = req.user

        const [ user ] = await knex('lojas').where('id' , id)

        const customer = await stripe.customers.retrieve(user.id_stripe , {
            expand: ['subscriptions'],
        });

        const [assinatura]  = customer.subscriptions.data

        if(assinatura.status === 'active'){
            return true
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    stripeFilterImage,
    stripeFilter
}