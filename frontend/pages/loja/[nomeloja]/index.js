import Link from "next/link";
import Head from 'next/head'
import { useCarrinho } from '../../../context/Carrinho'
import lightOrDark from '../../../functions/lightOrDark'
import IconButton from '@material-ui/core/IconButton';


function Produto({titulo, preco, path_image, nomeLoja, descricao, addCart , removeCart, cor}){
  return(
      <div className="product-container flex" style={{border: `1px solid ${cor}` }}>
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
      <div className='button-flex'>
        <IconButton onClick={() => addCart(titulo, preco)}>
          +
        </IconButton>
        <IconButton onClick={()=> removeCart(titulo)}>-</IconButton>
      </div>
        </div>
      </div>
  )
}

export default function Home({nomeLoja = 'Cardapiu', produtos, cor, error , theme}) {

  const { carrinho , setCarrinho }  = useCarrinho()
  // const { theme , setTheme } = useState('light')
  
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
    <Head>
      <title>{nomeLoja}</title>
    </Head>
    <div className={`navbar-loja ${theme === "light" ? 'dark-text': 'light-text'}`} style={{backgroundColor: cor}}>
        <h2 className='nome-loja'>{nomeLoja}</h2>
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
          cor={cor}
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
        nomeLoja: json.nomeLoja,
        produtos: json.produtos,
        cor: json.cor,
        theme: lightOrDark(json.cor)
      }, 
    }
  }else if(json.error){
    return {
      props: {
        error: json.error
      }, 
    }
  }


}