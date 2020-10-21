import Head from 'next/head'
import Link from 'next/link'


const produtos = ['Cafe', 'Picole', 'Camarao', 'Balinha','Lagosta', 'Laranja', 'Chocolatinho', 'Leitinho', 'Cigarro']

function Produto({titulo}){

  return(
    <div>
      <div className="product-container flex">
        <div className="product-img">

        </div>
        <div className="product-info">
          <h2>{titulo}</h2>
          <p>Preço R$: 20.00</p>
          <button className='button'>
            <span> Veja mais </span>
          </button>
        </div>
      </div>
      <div className='button-flex'>
        <button className='button-ad'>+</button>
        <button className='button-ad'>-</button>
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
    <h2 className="nome-loja">[Nome Empresa]</h2>
    <div className="grid-produtos background">
      {produtos.map((titulo) => <Produto titulo={titulo} />)}
    </div>  
    </>
  )
}
