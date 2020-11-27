import Link from "next/link";
import { useCarrinho } from '../../../context/Carrinho'
import React , { useState } from "react" ;

export default function Home() {

    const { carrinho } = useCarrinho()
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [observacoes, setObservacoes] = useState('')


    function calcularTotal(carrinho){
        const resultado = carrinho.reduce(function (accumulator, currentValue){
            return accumulator + currentValue.preco
        },0)

        return resultado
    }

    function enviarPedido(numero, carrinho){

        let stringPedido = `Olá gostaria de pedir
        ${carrinho.map(produto => `
        Produto:${produto.nome}
        Preco:${produto.preco}
        ===========================`).join('')}
        Total: ${calcularTotal(carrinho)}\n
        Nome: ${nome}\n
        Endereço: ${endereco}\n 
        Observações: ${observacoes}\n
        `

        stringPedido = window.encodeURI(stringPedido)

        window.open(`https://api.whatsapp.com/send?phone=5561983322455&text=${stringPedido}`)
    }

      return (
        <>
            <div className="navbar">
                <h1 className="business-menu">Business Menu</h1>
                <Link href='/loja/Blend'> 
                    <h2 className="carrinho">Voltar</h2>
                </Link>
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
                <h2 className="total-preço">Total: R$ {calcularTotal(carrinho).toFixed(2)}</h2> 
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
                    <button className="button-remover-pedido"> <b>Remover todos os produtos</b></button>
                </div>
            </div>
            <div className="agradecer">
            <footer className="fim-loja">Obrigado por comprar conosco</footer>
            <footer className="agradecimentos"> Feito por HS Softwares com carinho para os clientes</footer>
            </div>
            
        </>
        
      )
}