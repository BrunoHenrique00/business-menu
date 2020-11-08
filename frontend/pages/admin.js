import { useState } from 'react'

export default function Admin() {

    const [ name, setName] = useState('')
    const [ descricao, setDescricao] = useState('')
    const [ preco, setPreco] = useState(0)
    const [ idLoja, setIdLoja] = useState(0)
    const [ img, setImg] = useState(null)

    async function sendProduct(){
        const precoNumber = parseFloat(preco)
        const idlojaNumber = parseInt(idLoja)
        const formData = new FormData()

        formData.append("img", img[0])
        formData.append('nome', name)
        formData.append('descricao', descricao)
        formData.append('preco', precoNumber)
        formData.append('loja_id', idlojaNumber)
        formData.append('id', 1)

        const response = await fetch('http://localhost:3001/produtos/',{
            method: 'POST',
            body: formData
        })
        const json = await response.json()
        if(json.error){
            window.alert('Algo deu errado com a criação do seu produto :( ')
        }else{
            window.alert('Seu produto foi criado com sucesso!')
        }
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

            <label>A imagem do seu produto</label>
            <input type='file'onChange={ (e) => setImg(e.target.files)}/>
            <button onClick={sendProduct} className='button'>Cadastrar produto</button>
        </div>
      </>
    )
  }