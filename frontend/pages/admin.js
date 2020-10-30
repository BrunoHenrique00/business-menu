import { useState } from 'react'

export default function Admin() {

    const [ name, setName] = useState('')
    const [ descricao, setDescricao] = useState('')
    const [ preco, setPreco] = useState(0)
    const [ idLoja, setIdLoja] = useState(0)

    async function sendProduct(){
        const precoNumber = parseFloat(preco)
        const idlojaNumber = parseInt(idLoja)
        const data = {
            nome: name,
            descricao,
            preco: precoNumber,
            loja_id: idlojaNumber
        }
        const response = await fetch('http://localhost:3001/produtos/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }


    return (
      <>
        <div className="navbar">
            <h1 className="business-menu">Business Menu</h1>
            <p className="carrinho">Carrinho</p>
        </div>

        <div className='admin-form'>
            <label>Nome do produto</label>
            <input onChange={ (e) => setName(e.target.value)}/>

            <label>Descrição</label>
            <textarea onChange={ (e) => setDescricao(e.target.value)}/>

            <label>Preço</label>
            <input type='number'onChange={ (e) => setPreco(e.target.value)}/>

            <label>Id da sua loja</label>
            <input type='number'onChange={ (e) => setIdLoja(e.target.value)}/>
            <button onClick={sendProduct} className='button'>Cadastrar produto</button>
        </div>
      </>
    )
  }