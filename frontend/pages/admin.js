import { useState, useEffect} from 'react'
import { useRouter } from 'next/router';
//Components
import AdminProducts from '../components/AdminProducts'
import RegisterProduct from '../components/RegisterProduct'
import Myshop from '../components/MyShop'

import Home from '@material-ui/icons/Home'
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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

    // Router
    const router = useRouter()
    // Product states
    const [ produtos, setProdutos] = useState([])
    const [usuario, setUsuario] = useState('')
    // Navigation States
    const [isAdminProducts, setIsAdminProducts] = useState(true)
    const [isAdminInShop, SetIsAdminInShop] = useState(false)

    return (
      <>
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

                {isAdminProducts && !isAdminInShop && <AdminProducts produtos={produtos} setIsAdminProducts={setIsAdminProducts}/>}
                {!isAdminProducts && !isAdminInShop &&<RegisterProduct setIsAdminProducts={setIsAdminProducts}/>}
                {isAdminInShop && <Myshop usuario={usuario} />}

            </div>
        </div>
      </>
    )
}