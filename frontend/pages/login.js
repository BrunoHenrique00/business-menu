import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Login(){

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const router = useRouter()

    async function handleLogin(){
        const data = {
            email: userEmail,
            password: userPassword
        }
        const response = await fetch('http://localhost:3001/lojas/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const json = await response.json()
        if(json.token){
            localStorage.setItem('token', json.token)
            router.push('/admin')
        }else{
            console.log(json)
            window.alert('Usuario invalido')
        }
    }

    return(
    <>
        <Head>
            <title>Cardapiú - Login</title>
        </Head>
        <div className="navbar">
          <h1 className="business-menu">Cardapiú</h1>
          <img src="/logo.svg" />
        </div>

        <h2 className="login-title">Seja Bem vindo!</h2>
        <div className="login-img">
            <img src="/login-img.svg" />
        </div>

        <div className="caixa-login">
                <h2>Email:</h2>
                <input placeholder='Digite o nome da sua empresa' className="input" onChange={ (e) => setUserEmail(e.target.value)}/>

                <h2>Senha:</h2>
                <input placeholder='Digite sua senha' type="password" className="input" onChange={ (e) => setUserPassword(e.target.value)}/>

                <button className='button-login' onClick={handleLogin}>Login</button>

                <p>
                    Não sou membro.
                    <span style={{color: '#007FFF'}}>
                        Fazer registro.
                    </span>
                </p>
        </div>
    </>
    )
}