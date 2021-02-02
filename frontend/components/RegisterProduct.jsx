import { useState } from 'react'
import TextField from '@material-ui/core/TextField'

export default function ResgisterProduct({setIsAdminProducts}){


    // Form states
    const [ name, setName] = useState('')
    const [ descricao, setDescricao] = useState('')
    const [ preco, setPreco] = useState(0)
    const [ img, setImg] = useState(null)

    async function sendProduct(){
        const precoNumber = parseFloat(preco)
        const formData = new FormData()

        formData.append("img", img[0])
        formData.append('nome', name)
        formData.append('descricao', descricao)
        formData.append('preco', precoNumber)
        formData.append('loja_id', localStorage.getItem('id_usuario'))
        formData.append('id', localStorage.getItem('id_usuario'))

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

    return(
        <div className='admin-form'>

            <button className="button-cadastro" onClick={() => setIsAdminProducts(true)}>Voltar</button>
            <p>
                Preencha as informações do seu produto e aperte em <span className="sublime">criar!</span>
            </p>

            <div  className='admin-input'>
                <TextField label="Nome do Produto" multiline variant="outlined" onChange={(e) => setName(e.target.value)}/>
            </div>
            
            <div  className='admin-input'>
                <TextField className='admin-input' multiline label="Descrição" variant="outlined" onChange={ (e) => setDescricao(e.target.value)}/>
            </div>

            <div  className='admin-input'>
                <TextField className='admin-input' label="Preço" variant="outlined" type='number'onChange={ (e) => setPreco(e.target.value)}/>
            </div>

            <label> 
                <b> A imagem do seu produto </b> 
            </label>
            <input  type='file'onChange={ (e) => setImg(e.target.files)}/>

            <button onClick={sendProduct} className='button-cadastro'>Cadastrar</button>
        </div>
    )
}