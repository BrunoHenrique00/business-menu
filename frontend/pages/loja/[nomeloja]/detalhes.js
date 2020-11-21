import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter()
  const {titulo, preco, path_image, nomeLoja, descricao } = router.query

    return (
      <>

      <div className="navbar">
          <h1 className="business-menu">Business Menu</h1>
          <p className="carrinho">Carrinho</p>
      </div>

      <h2 className="nome-loja-detalhe">{nomeLoja}</h2>
      
      <div className="detalhe">
      
        <img src={`http://localhost:3001/uploads/${path_image}`} href="" className="imagem-produto"></img>

        <div className="titulo-preço-detalhe">

          <h2 className="titulo">{titulo}</h2>
          <h2 className="preço"> Preço: R$ {preco}</h2>
          
          <p className="detalhes-de-produto">
            {descricao}
          </p>

        </div>

        <button className="ad-prod">ADICIONAR</button>

      </div>

      </>
    )
}