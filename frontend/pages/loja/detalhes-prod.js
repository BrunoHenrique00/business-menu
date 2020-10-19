import styles from '../../styles/detalhes.css'

export default function Detalhes() {
  return (
    <>
    <div className="detalhes">
      <div className="navbar">
          <h1 className="business-menu">Business Menu</h1>
          <a href=" " className="carrinho">Carrinho</a>
      </div>
      <div className="title">
          <h2 className="nome-empresa">Nome da Empresa</h2>
          <div className="content">
                <h3 className="nome-produto">Título do Produto</h3>
                <p className="detalhe-produto">Texto a cerca das especificações dos produtos</p>
                <img className="imagem-produto" />
          </div>
      </div>
    </div>
    </>
  )
}