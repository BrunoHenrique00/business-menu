export default function Home() {

    return (
    <>
        <div className="navbar">
          <h1 className="business-menu">Business Menu</h1>
          <h2>Página de Registro</h2>
        </div>
        
        <div className="caixa">
            <div className="caixa-login">
                <h2> Email:</h2>
                <input placeholder='Digite seu email' className="input"/>
                <h2> Senha:</h2>
                <input placeholder='Digite sua senha' className="input"/>

                <button className='button button-login'>Login</button>
            </div>

            <div className="caixa-registro">
                <h2>Nome da Empresa:</h2>
                <input placeholder='Digite o nome da empresa' className="input"/>
                <h2>Email:</h2>
                <input placeholder='Digite seu email' className="input"/>
                <h2>Senha:</h2>
                <input placeholder='Digite sua senha' className="input"/>
                <h2>Numero de Telefone:</h2>
                <input placeholder='Digite o número de telefone' className="input"/>

                <button className='button button-registrar'>Registrar</button>
            </div>
        </div>
        
    </>
    )

  }