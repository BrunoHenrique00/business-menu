import { useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head'
//Components
import AdminProducts from '../components/AdminProducts'
import RegisterProduct from '../components/RegisterProduct'
import Myshop from '../components/MyShop'

import Home from '@material-ui/icons/Home'
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function Admin() {

    // Router
    const router = useRouter()
    // Product states
    const [ produtos, setProdutos] = useState([])
    const [usuario, setUsuario] = useState('')
    // Navigation States
    const [isAdminProducts, setIsAdminProducts] = useState(true)
    const [isAdminInShop, SetIsAdminInShop] = useState(false)
    const [isPaid, setIsPaid] = useState(false)

    async function getProducts(){
        const token = localStorage.getItem('token')

        if(!token){
            window.alert('Ops, você não está autenticado!')
            router.push('/login')
        }else{
            const data = await fetch(`http://localhost:3001/lojas/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token: token})
                }) 
            const json = await data.json()
            if(json.error){
                alert('Algo deu errado, por favor faça o login novamente!')
                router.push('/login')
                return null
            }
            setProdutos(json.produtos)
            setUsuario(json.nome)
        }
    }

    async function checkPayment(){
        const response = await fetch(`http://localhost:3001/lojas/assinatura`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token')
            })
        })
        const { isPaid } = await response.json()
        if(isPaid === 'active'){
            setIsPaid(true)
        }
    }

    useEffect(() =>{
        getProducts()
        checkPayment()
    }, [])

    return (
      <>
        <Head>
            <title>Cardapiú - Admin</title>
        </Head>
        <div className="container-admin">
            <div className="navbar-admin">
                <img src="/logo.svg" />

                <div className="navbar-menu">
                    <div
                    className={isAdminInShop ? "options-admin-selected" : "options-admin"}
                    onClick={() => isAdminInShop ? null : SetIsAdminInShop(!isAdminInShop)}
                    >
                        <Home style={{ fontSize: 50 }}/>
                        <h2>Minha Loja</h2>
                    </div>
                    <div
                    className={isAdminInShop ? "options-admin" : "options-admin-selected"}
                    onClick={() => isAdminInShop ? SetIsAdminInShop(!isAdminInShop) : null}
                    >
                        <LocalMallIcon style={{ fontSize: 50 }}/>
                        <h2>Produtos</h2>
                    </div>
                    <div className="options-admin">
                        <ExitToAppIcon style={{ fontSize: 50 }}/>
                        <h2>Sair</h2>
                    </div>
                </div>
            </div>


            <div className="admin-area">
                <div className="admin-top">
                    <h1>Cardapiú</h1>
                    <p>Olá <span className="sublime">{`${usuario}`}</span>, seja bem vindo!</p>
                </div>

                {isAdminProducts && !isAdminInShop && <AdminProducts produtos={produtos} setIsAdminProducts={setIsAdminProducts} isPaid={isPaid}/>}
                {!isAdminProducts && !isAdminInShop &&<RegisterProduct setIsAdminProducts={setIsAdminProducts}/>}
                {isAdminInShop && <Myshop usuario={usuario} isPaid={isPaid} />}

            </div>
        </div>
      </>
    )
}