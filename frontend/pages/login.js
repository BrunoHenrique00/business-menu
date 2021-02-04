import { useState } from 'react'
import { useRouter } from 'next/router'




export default function Login(){

    const [userLogin, setUserLogin] = useState('')
    const router = useRouter()

    async function handleLogin(){
        const data = {
            nome: userLogin
        }
        const response = await fetch('http://localhost:3001/lojas/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const json = await response.json()
        if(json.id){
            localStorage.setItem('id_usuario', json.id)
            localStorage.setItem('nome_usuario', userLogin)
            router.push('/admin')
        }else{
            console.log(json)
            window.alert('Usuario invalido')
        }
    }

    return(
    <>
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
                <input placeholder='Digite o nome da sua empresa' className="input" onChange={ (e) => setUserLogin(e.target.value)}/>

                <h2>Senha:</h2>
                <input placeholder='Digite sua senha' className="input"/>

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