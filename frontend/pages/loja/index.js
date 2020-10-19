import Head from 'next/head'
import styles from '../../styles/Home.module.css'


const produtos = ['Arroz', 'Bedida', 'Café', 'Chocolate','Arroz', 'Bedida', 'Café', 'Chocolate']

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

export default function Home() {
  return (
    <>
    <div className="navbar">
        <h1 className="business-menu">Business Menu</h1>
        <p className="carrinho">Carrinho</p>
    </div>
    <h2 className="nome-loja">[Business Menus]</h2>
    <div className="grid-produtos background">
      {produtos.map((titulo) => <Produto titulo={titulo} />)}
    </div>  
    </>
  )
}
