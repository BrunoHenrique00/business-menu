import Link from 'next/link'
import { useRouter } from 'next/router'
import TextField from '@material-ui/core/TextField'
import CallMadeRoundedIcon from '@material-ui/icons/CallMadeRounded';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'

export default function MyShop({usuario , isPaid}){

    useEffect(() =>{
        callApi()
    },[])

    function maskPhone(value){
        value = value.toString()
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{4})(\d+?)$/, "$1");
    }

    function handlePhone(value){
        if(value.length <= 15 ){
            setUserTelefone(value.replace(/([^\d])+/gim, ''))
        }
    }

    async function callApi(){
        const data = await fetch(`http://localhost:3001/lojas/${usuario}`)
        const { nome, cor, numero, id} = await data.json()
        setUserCor(cor)
        setUserNome(nome)
        setUserTelefone(numero)
        setUserId(id)
    }

    async function handleAssinatura(){
        const response = await fetch(`http://localhost:3001/lojas/subscription`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token')
            })
        })

        const data = await response.json()
        if(data.url){
            router.push(data.url)
        }else{
            console.log(data);
            alert('Ops, algo deu errado. Tente novamente!')
        }
    }
    
    async function handleChangeData(){
        const data = await fetch(`http://localhost:3001/lojas/`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: userNome,
                    telefone: userTelefone,
                    cor: userCor,
                    token: localStorage.getItem('token')
                })
        })
        const { message } = await data.json()
        if(message){
            alert(message)
        } else {
            alert('Algo deu errado, tente novamente!')
        }
    }

    async function handleCheckout(){
        const stripe = await stripePromise

        const response = await fetch("http://localhost:3001/lojas/payment", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token')
            })
        });
        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.log(result.error);
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
        }
    }

    const stripePromise = loadStripe("pk_test_51IIgcEJYoInUDvqKwrDskwkfYa0FhqgEvOc983bJqWVbsgb4eUeRy6YVa5VwIu7Mzb4OJ9Fg76WYBWq8Ly3dgW1T00NaYcpSGV");
    const router = useRouter()

    const [userNome, setUserNome] = useState('')
    const [userTelefone, setUserTelefone] = useState('')
    const [userTelefoneMask, setUserTelefoneMask] = useState()
    const [userCor, setUserCor] = useState('')
    const [userId, setUserId] = useState(0)

    return(
        <div className="admin-my-shop">
            <div className="btn-ver-loja">
                <CallMadeRoundedIcon />
                <Link href={`/loja/${userId}`}>
                    <button>Ver Minha Loja</button>
                </Link>
            </div>
            {!isPaid && <button className="button-cadastro" style={{margin:'10px auto'}} onClick={handleCheckout}>Checkout</button>}
            {isPaid && <button className="button-cadastro" style={{margin:'10px auto'}} onClick={handleAssinatura}>Gerenciar Assinatura</button>}
            <h2>
                Configure sua loja do seu jeito
            </h2>

            <div className="my-shop-form">
                <TextField label="Nome" className={{borderColor: 'red'}} variant="outlined" value={userNome} onChange={(e) => setUserNome(e.target.value)}/>
                <TextField label="Telefone" variant="outlined" value={maskPhone(userTelefone)} onChange={(e) => handlePhone(e.target.value)}/>
                {/* <TextField label="Cor" type="color" variant="outlined"/> */}
                <h2>
                    Escolha apenas uma cor e deixe que cuidamos do resto!
                </h2>
                <div className="input-color" >
                    <input type="color" value={userCor} onChange={(e) => setUserCor(e.target.value)}/>
                </div>

                <button className="button-cadastro" onClick={handleChangeData}>Alterar</button>
            </div>
        </div>
    )
}