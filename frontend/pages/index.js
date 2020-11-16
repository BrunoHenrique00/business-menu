import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
    const [userLogin, setUserLogin] = useState('')
    const [userRegister, setUserRegister] = useState('')
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

    async function handleRegister(){
        const data = {
            nome: userRegister
        }
        const response = await fetch('http://localhost:3001/lojas/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const json = await response.json()
        if(json.message){
            window.alert(`${json.message} , agora faça seu login!`)
        }else{
            console.log(json)
            window.alert('Algo de errado aconteceu no seu cadastro!')
        }
    }

    return (
    <>
        <div className="navbar">
          <h1 className="business-menu">Business Menu</h1>
          <h2>Página de Registro</h2>
        </div>
        
        <div className="caixa">
            <div className="caixa-login">
<<<<<<< HEAD
                <h2> Email:</h2>
                <input placeholder='Digite seu email' className="input"/>
                <h2> Senha:</h2>
                <input type="password" placeholder='Digite sua senha' className="input"/>
=======
                <h2> Nome da sua empresa:</h2>
                <input placeholder='Digite sua empresa' className="input" onChange={ (e) => setUserLogin(e.target.value)}/>
>>>>>>> 8a8df9f52300052a80c6a22acb2777f1567e46b2

                <button className='button button-login' onClick={handleLogin}>Login</button>
            </div>

            <div className="caixa-registro">
                <h2>Nome da Empresa:</h2>
<<<<<<< HEAD
                <input placeholder='Digite o nome da empresa' className="input"/>
                <h2>Email:</h2>
                <input placeholder='Digite seu email' className="input"/>
                <h2>Senha:</h2>
                <input type="password" placeholder='Digite sua senha' className="input"/>
=======
                <input placeholder='Digite o nome da empresa' className="input" onChange={ (e) => setUserRegister(e.target.value)}/>

>>>>>>> 8a8df9f52300052a80c6a22acb2777f1567e46b2
                <h2>Numero de Telefone:</h2>
                <input placeholder='Digite o número de telefone' className="input"/>

                <button className='button button-registrar' onClick={handleRegister}>Registrar</button>
            </div>
        </div>
    </>
    )
}