import Link from "next/link";
import { useCarrinho } from '../../../context/Carrinho'
import React , { useState } from "react" ;
import { useRouter } from 'next/router'

export default function Home() {

    const { carrinho } = useCarrinho()
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [observacoes, setObservacoes] = useState('')

    const router = useRouter()
    const nomeLoja = router.query.nomeloja

    function calcularTotal(carrinho){
        const resultado = carrinho.reduce(function (accumulator, currentValue){
            return accumulator + currentValue.preco
        },0)

        return resultado.toFixed(2)
    }

    async function enviarPedido(numero, carrinho){

        const data = await fetch(`http://localhost:3001/lojas/${nomeLoja}`)
        const { numero: numeroLoja } = await data.json()

        let stringPedido = `*Olá, gostaria de fazer um pedido da sua loja ${nomeLoja}. Os itens escolhidos são*:\n
        ${carrinho.map(produto => `
        *Produto*: ${produto.nome}
        *Preco*: ${produto.preco}
        ==============`).join('')}\n
        _Total_: *${calcularTotal(carrinho)}*\n
        Nome: ${nome}\n
        Endereço: ${endereco}\n 
        Observações: ${observacoes}\n
        `

        stringPedido = window.encodeURI(stringPedido)

        window.open(`https://api.whatsapp.com/send?phone=${numeroLoja}&text=${stringPedido}`)
    }

      return (
        <>
            <div className="navbar">
                <h1 className="business-menu">Business Menu</h1>

                <div className="carrinho">
                    <Link href={`/loja/${nomeLoja}`}> 
                        <a className="carrinho-voltar">Voltar</a>
                    </Link>
                    <Link href={`/loja/${nomeLoja}`}>
                        <img src='/back-button.svg' width="60" height="60" />
                    </Link>
                </div>
            </div>


            <div className="caixa-produtos">
                <h1 style={{textAlign: 'center'}}> Produtos Adicionados  </h1>
            {carrinho.map( produto => {
            return (
                <div className="background-gray">
                    <h2>Produto: {produto.nome}</h2>

                    <h2>Preço: R$ {produto.preco.toFixed(2)}</h2>

                    <button className='remove-prod'> Remover </button>

                </div>
            )
            })}
            </div>
            

            <div className="total">
                <h2 className="total-preço">Total: R$ {calcularTotal(carrinho)}</h2> 
            </div>
            
            <div className="final-pedido">
                <div className="dados-comprador">
                        <div className="box-pedido">
                            <span className="dados-span">Nome:</span>
                            <input className="dados-input" placeholder="Seu Nome" required onChange={(event) => setNome(event.target.value)}/>
                        </div>
                        <div className="box-pedido">
                            <span className="endereco">Endereço:</span>
                            <input className="dados-input" placeholder="Seu Endereço" required onChange ={(event) => setEndereco(event.target.value)}/>
                        </div>
                        <div className="box-pedido">
                            <span className="dados-span">Observações:</span>
                            <textarea placeholder="Alguma Preferência/Observação para acrescentar" className="dados-obs" required onChange ={(event) => setObservacoes(event.target.value)}></textarea>
                        </div>
                </div> 
                <div className="pedido">
                    <button className="button-pedido" onClick={() => enviarPedido(21212, carrinho)}> <b>Enviar Pedido </b></button>
                </div>
            </div>
            <div className="agradecer">
                <footer> Obrigado por comprar conosco </footer>
                <footer> Feito por HS Softwares com carinho para os clientes</footer>
            </div>
            
        </>
        
      )
}