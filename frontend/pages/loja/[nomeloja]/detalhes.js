
export default function Home() {
    return (
      <>

      <div className="navbar">
          <h1 className="business-menu">Business Menu</h1>
          <p className="carrinho">Carrinho</p>
      </div>

      <h2 className="nome-loja-detalhe">Quente Novamente!</h2>
      
      <div className="detalhe">
      
      <img src="https://images-ext-2.discordapp.net/external/CxLCiFHkzphGRy7OIgQ5c73Mq5x2MkqJW-kbPTaLjaQ/%3Fwidth%3D453%26height%3D605/https/media.discordapp.net/attachments/686265916958310471/773682464794083368/IMG_20201031_104000.jpg" href="" className="imagem-produto"></img>

      <div className="titulo-preço-detalhe">

        <h2 className="titulo">DibStep</h2>
        <h2 className="preço"> Preço: R$ 2 Skins</h2>
        
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