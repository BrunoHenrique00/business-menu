import { useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'

export default function Admin() {

    useEffect(() =>{
        getProducts()
        setUsuario(localStorage.getItem('nome_usuario'))
    }, [])

    async function getProducts(){
        const lojaId = localStorage.getItem('id_usuario')

        if(!lojaId){
            window.alert('Ops, você não está autenticado!')
            router.push('/')
        }else{
            const data = await fetch(`http://localhost:3001/lojas/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: lojaId})
                }) 
            const json = await data.json()
            setProdutos(json.produtos)
        }
    }

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

    async function removeProduto(idProduto){
        const response = await fetch(`http://localhost:3001/produtos/${idProduto}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: localStorage.getItem('id_usuario')})
        })
        const json = await response.json()
        console.log(json)
        window.alert('Produto removido com sucesso!')
    }
    // Router
    const router = useRouter()
    // Form states
    const [ name, setName] = useState('')
    const [ descricao, setDescricao] = useState('')
    const [ preco, setPreco] = useState(0)
    const [ img, setImg] = useState(null)

    // Product states
    const [ produtos, setProdutos] = useState([])

    const [usuario, setUsuario] = useState('')


    return (
      <>
        <div className="navbar">
            <h1 className="business-menu">Business Menu</h1>
            <p className="carrinho">{`Olá ${usuario}, seja bem vindo!`}</p>
            
            <div className='carrinho'>
                <Link href={`/loja/${usuario}`}>
                    <button className="button">Ver Minha Loja</button>
                </Link>
                <img src='/shop.svg' width="60" height="60" />
            </div>
            
        </div>
        <div className='caixa'>
            <div className='caixa-login'>
                <div className='admin-form'>
                    <label> <b>Nome do produto</b> </label>
                    <input className='admin-input'onChange={ (e) => setName(e.target.value)}/>

                    <label> <b>Descrição</b> </label>
                    <textarea className='admin-input' onChange={ (e) => setDescricao(e.target.value)}/>

                    <label> <b> Preço </b> </label>
                    <input className='admin-input' type='number'onChange={ (e) => setPreco(e.target.value)}/>

                    <label> <b> A imagem do seu produto </b> </label>
                    <input  type='file'onChange={ (e) => setImg(e.target.files)}/>
                    <button onClick={sendProduct} className='button-cadastro'>Cadastrar produto</button>
                </div>
            </div>
            <div className='caixa-registro'>
                <h2>Meus Produtos</h2>
                <div className='cadastrados-form'>
                    {produtos.map( produto => (
                        <div className='produtos-cadastrados'>
                            <h2>Produto: {produto.nome}</h2>
                            <h2>Preço: R$ {produto.preco.toFixed(2)}</h2>
                            <button className='remove-prod' onClick={() => removeProduto(produto.id)}><b>Remover</b></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
      </>
    )
}