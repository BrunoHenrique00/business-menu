import Head from 'next/head'
import styles from '../../styles/Home.module.css'

const database = [
  {
    loja: 'Blend',
    produtos: ['Tio Dandan', 'Feijao','Arroz', 'Daniel']
  },
  {
    loja: 'Brunos',
    produtos: ['Cachaça', 'Vodka','cerveja', 'Litrao']
  },
]

function Produto({titulo}){
  return(
    <div className="product-container flex">
      <div className="product-img">

      </div>
      <div className="product-info">
        <h2>{titulo}</h2>
        <p>Preço R$: 20.00</p>
      </div>
    </div>
  )
}

export default function Home({nomeLoja, produtos}) {

  return (
    <>
    <div className="navbar">
        <h1 className="business-menu">Business Menu</h1>
        <p className="carrinho">Carrinho</p>
    </div>
    <h2 className="nome-loja">{nomeLoja}</h2>
    <div className="grid-produtos background">
      {produtos.map( produto => <Produto titulo={produto} />)}
    </div>  
    </>
  )
}

export async function getServerSideProps({params}) {

  const nomeLoja = params.nomeLoja

  const resultLoja = database.find( item => item.loja === nomeLoja )

  return {
    props: {
      nomeLoja: params.nomeLoja,
      produtos: resultLoja.produtos
    }, // will be passed to the page component as props
  }
}