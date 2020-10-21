import Head from 'next/head'


const database = [
  {
    loja: "DSuplements",
    produtos: ['Whey', 'Creatina', 'BCAA', 'Glutamina', 'Albumina', 'HMB']
  },
  {
    loja: "Açaí",
    produtos: ['Açaí', 'Suco de Groselha','Passaporte USA', 'Complementos']
  },
  {
    loja: "Bruno's",
    produtos: ['Cachaça','Vodka','Cerveja','Litrao']
  },
  {
    loja: "Barbosinha",
    produtos: ['Frango', 'Carne/Frango', 'Misto', 'Vegetariano', 'Skol', 'Refrigerante']
  },
  {
    loja: "Obelisco",
    produtos : ['Coxinha','Pão de queijo','Esfirra','Presunto e Queijo','Misto quente','Refrigerante','Café','Suco']
  },
  {
    loja: "Oficina Hookah Lounge",
    produtos : ['Rosh simples','Rosh duplo','Rosh Triplo','Cerveja','Caipirinha','Cigarro']
  },
]

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

  const nomeLoja = params.nomeloja

  const resultLoja = database.find( item => item.loja === nomeLoja )

  return {
    props: {
      nomeLoja: params.nomeloja,
      produtos: resultLoja.produtos
    }, 
  }
}