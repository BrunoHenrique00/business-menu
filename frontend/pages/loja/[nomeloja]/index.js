import Head from 'next/head'

function Produto({titulo, preco, path_image}){
  return(
    <>
      <div className="product-container flex">
        <img className="product-img" src={`http://localhost:3001/uploads/${path_image}`} />
        <div className="product-info">
          <h2>{titulo}</h2>
          <p>Preço R$: {preco.toFixed(2)}</p>
          <button className='button'>
            <span> Veja mais </span>
          </button>
        </div>
      </div>
      <div className='button-flex'>
        <button className='button-ad'>+</button>
        <button className='button-ad'>-</button>
      </div>
    </>
  )
}

export default function Home({nomeLoja, produtos, path_image}) {

  return (
    <>
    <div className="navbar">
        <h1 className="business-menu">Business Menu</h1>
        <p className="carrinho">Carrinho</p>
    </div>
    <h2 className="nome-loja">{nomeLoja}</h2>
    <div className="grid-produtos background">
      {produtos.map( produto => <Produto titulo={produto.nome} preco={produto.preco} path_image={produto.path_image}/>)}
    </div>  
    </>
  )
}

export async function getServerSideProps({params}) {

  const nomeLoja = params.nomeloja

  const data = await fetch(`http://localhost:3001/produtos/${nomeLoja}`) 
  const { produtos } = await data.json()
  console.log(produtos)

  return {
    props: {
      nomeLoja: params.nomeloja,
      produtos: produtos
    }, 
  }
}