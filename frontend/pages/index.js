import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
    const [userLogin, setUserLogin] = useState('')
    const [userRegisterName, setUserRegisterName] = useState('')
    const [userRegisterPhone, setUserRegisterPhone] = useState(0)
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
            nome: userRegisterName,
            numero_telefone: userRegisterPhone
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
          <h2 className="pag-registro">Página de Registro</h2>
        </div>
        
        <div className="caixa">
            <div className="caixa-login">
                <h2> Nome da sua empresa:</h2>
                <input placeholder='Digite o nome da sua empresa' className="input" onChange={ (e) => setUserLogin(e.target.value)}/>

                <button className='button button-login' onClick={handleLogin}>Login</button>
            </div>

            <div className="caixa-registro">
                <h2>Nome da Empresa:</h2>
                <input placeholder='Digite o nome da empresa' className="input" onChange={ (e) => setUserRegisterName(e.target.value)}/>

                <h2>Numero de Telefone:</h2>
                <p>EX: +55 (61) 98332-2455 precisa ser digitado assim -> 5561983322455</p>
                <input placeholder='Digite o número de telefone' onChange={(e) => setUserRegisterPhone(e.target.value)} className="input"/>

                <button className='button button-registrar' onClick={handleRegister}>Registrar</button>
            </div>
        </div>
    </>
    )
}