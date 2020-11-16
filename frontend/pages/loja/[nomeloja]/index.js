import Link from "next/link";

function Produto({titulo, preco, path_image, nomeLoja, descricao}){
  return(
    <div>
      <div className="product-container flex">
        <img className="product-img" src={`http://localhost:3001/uploads/${path_image}`} />
        <div className="product-info">
          <h2>{titulo}</h2>
          <p>Preço R$: {preco.toFixed(2)}</p>
          <button className='button'>
            <Link 
            href={
            { 
            pathname: `/loja/${nomeLoja}/detalhes`, 
            query: {
              titulo: titulo,
              preco: preco,
              path_image: path_image,
              descricao: descricao
              } 
            }
            }>
              <span>
                Veja mais
              </span>
            </Link>
          </button>
        </div>
      </div>

      <div className='button-flex'>
        <button className='button-adicionar'>+</button>
        <button className='button-adicionar'>-</button>
      </div>

      
    </div>
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
      {produtos.map( produto => <Produto 
      titulo={produto.nome} 
      key={produto.id} 
      preco={produto.preco} 
      nomeLoja={nomeLoja} 
      path_image={produto.path_image} 
      descricao={produto.descricao}
      />
      )}
    </div>
    </>
  )
}

export async function getServerSideProps({params}) {

  const nomeLoja = params.nomeloja

  const data = await fetch(`http://localhost:3001/produtos/${nomeLoja}`) 
  const { produtos } = await data.json()

  return {
    props: {
      nomeLoja: params.nomeloja,
      produtos: produtos
    }, 
  }
}