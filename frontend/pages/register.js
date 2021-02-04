import { useState } from 'react'

export default function Register(){

    const [userRegisterName, setUserRegisterName] = useState('')
    const [userRegisterPhone, setUserRegisterPhone] = useState(0)

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


    return(
        <>
            <div className="navbar">
                <h1 className="business-menu">Cardapiú</h1>
                <img src="/logo.svg" />
            </div>

            <h2 className="login-title">Agora, vamos modernizar seu negócio.</h2>
            <div className="login-img">
                <img src="/register-img.svg" />
            </div>
            
            
                <div className="caixa-registro">
                    <h2>Nome da Empresa:</h2>
                    <input placeholder='Digite o nome da empresa' className="input" onChange={ (e) => setUserRegisterName(e.target.value)}/>

                    <h2>Email:</h2>
                    <input placeholder='Seu email' className="input"/>

                    <h2>Senha:</h2>
                    <input placeholder='Senha' className="input"/>

                    <h2>Numero de Telefone:</h2>
                    <input placeholder='Digite o número de telefone' onChange={(e) => setUserRegisterPhone(e.target.value)} className="input"/>

                    <button className='button-registrar' onClick={handleRegister}>Registrar</button>
                </div>
        </>
    )
}