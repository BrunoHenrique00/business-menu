
export default function Home() {
    return (
      <>

      <div className="navbar">
          <h1 className="business-menu">Business Menu</h1>
          <p className="carrinho">Carrinho</p>
      </div>

      <h2 className="nome-loja-detalhe">GELADEIRAS TSUNAMI!</h2>
      
      <div className="detalhe">
      
      <img src="https://media.tenor.com/images/e860242d4c92a3fe35e98f2f7449e148/tenor.gif" href="" className="imagem-produto"></img>

      <div className="titulo-preço-detalhe">

        <h2 className="titulo"> CAVALOO</h2>
        <h2 className="preço"> Preço: R$ 2.000,00</h2>
        
        <p className="detalhes-de-produto">
          O texto descritivo é um tipo de texto que apresenta a descrição de algo, seja de uma pessoa, um objeto, um local, etc. Assim, ele expõe apreciações, impressões e observações de algo indicando os aspectos, as características, os detalhes singulares e os pormenores.
          Alguns recursos linguísticos relevantes na estruturação dos textos descritivos são: a utilização de adjetivos, verbos de ligações, metáforas e comparações.
        </p>

      </div>
      
      <button className="ad-prod">ADICIONAR</button>
      </div>

      </>
    )
}