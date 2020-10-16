const express = require('express')

const app = express()

const produtos = ['arroz', 'maca','biscoito']

app.get('/lojas/:id', (req,res)=>{
    res.send(`Bem vindo a loja ${req.params.id}`)
})

app.get('/produtos/:id', (req,res)=>{
    const id = req.params.id
    res.send(produtos[id])
})



app.listen('3001', () =>{
    console.log('servidor está funcionando: http://localhost:3001/')
})

