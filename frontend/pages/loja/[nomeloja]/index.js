import Link from "next/link";
import { useState } from 'react'

function Produto({titulo, preco, path_image, nomeLoja, descricao, addCart , removeCart}){
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
        <button className='button-adicionar' onClick={() => addCart(titulo, preco)}>+</button>
        <button className='button-adicionar'onClick={()=> removeCart(titulo)}>-</button>
      </div>

      
    </div>
  )
}

export default function Home({nomeLoja, produtos, path_image}) {

  const [ carrinho , setCarrinho ] = useState([])
  
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
    <div className="navbar">
        <h1 className="business-menu">Business Menu</h1>
        <p className="carrinho">Carrinho ({carrinho.length})</p>
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
      addCart={addCart}
      removeCart={removeCart}
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