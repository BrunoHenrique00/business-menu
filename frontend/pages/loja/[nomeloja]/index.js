import Link from "next/link";
import { useCarrinho } from '../../../context/Carrinho'

function Produto({titulo, preco, path_image, nomeLoja, descricao, addCart , removeCart}){
  return(
      <div className="product-container flex">
        <img className="product-img" src={`http://localhost:3001/uploads/${path_image}`} />
        <div className="product-info">
          <h2>{titulo}</h2>
          <p>{preco.toFixed(2)}</p>
          {/* <button className='button'>
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
          </button> */}
      {/* <div className='button-flex'>
        <button className='button-adicionar' onClick={() => addCart(titulo, preco)}>+</button>
        <button className='button-adicionar'onClick={()=> removeCart(titulo)}>-</button>
      </div> */}
        </div>
      </div>
  )
}

export default function Home({nomeLoja, produtos, path_image, error}) {

  const { carrinho , setCarrinho }  = useCarrinho()
  
  function addCart(nome, preco){
    setCarrinho([
      ...carrinho,
      {
        nome: nome,
        preco: preco,
      }
    ]);
  }

  function removeCart(nome){
    const resultado = carrinho.findIndex(function( produto ){
      if(produto.nome === nome){
        return true
      }
    })
    if(resultado !== -1){
      // remover o item do array carrinho
      carrinho.splice(resultado,1)
      const newCarrinho = [...carrinho]
      setCarrinho(newCarrinho)
    }
  }

  return (
    <>
    <div className="navbar-loja">
        <h2 className="nome-loja">{nomeLoja}</h2>
        <Link
        href={
          { 
          pathname: `/loja/${nomeLoja}/carrinho` 
          }
        }
        >
          <a className="carrinho">
            {carrinho.length}
            <img src='/shopping-cart.svg' width="60" height="60" />
          </a>
        </Link>
    </div>
    {
      !error && 
      <> 
        <div className="grid-produtos">
          {produtos.map( produto => <Produto 
          titulo={produto.nome} 
          key={produto.id} 
          preco={produto.preco} 
          nomeLoja={nomeLoja} 
          path_image={produto.path_image} 
          descricao={produto.descricao}
          addCart={addCart}
          removeCart={removeCart}
          />
          )}
        </div>
      </>
    }

    {
      error && <p className='erro-loja'>Não achamos esta loja!</p>
    }
    </>
  )
}

export async function getServerSideProps({params}) {

  const nomeLoja = params.nomeloja

  const data = await fetch(`http://localhost:3001/produtos/${nomeLoja}`) 
  const json  = await data.json()

  if(json.produtos){
    return {
      props: {
        nomeLoja: params.nomeloja,
        produtos: json.produtos
      }, 
    }
  }else{
    return {
      props: {
        error: json.error
      }, 
    }
  }


}