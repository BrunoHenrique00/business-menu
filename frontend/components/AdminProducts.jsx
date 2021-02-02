import SearchIcon from '@material-ui/icons/Search';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import EditIcon from '@material-ui/icons/Edit';


async function removeProduto(idProduto){
    const response = await fetch(`http://localhost:3001/produtos/${idProduto}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: localStorage.getItem('id_usuario')})
    })
    const json = await response.json()
    console.log(json)
    window.alert('Produto removido com sucesso!')
}

export default function AdminProducts({produtos , setIsAdminProducts}){
    return (
        <section className="admin-section">
                <div className="busca-admin">
                    <input placeholder="Busque um produto..."/>
                    <SearchIcon style={{fontSize: 50}}/>
                </div>
                <button className="btn-registrar-produto" onClick={() => setIsAdminProducts(false)}>Adicionar Produto</button>
                <div className="produtos">
                        {produtos.map( produto => (
                            <>
                                <div className='produtos-cadastrados'>
                                    <img src={`http://localhost:3001/uploads/${produto.path_image}`} />
                                    <h1>{produto.nome}</h1>
                                    <h2>R$ {produto.preco.toFixed(2)}</h2>
                                    <button className="btn-alterar">
                                        <EditIcon />
                                    </button>
                                    <button className='remove-prod' onClick={() => removeProduto(produto.id)}>
                                        <DeleteForeverRoundedIcon />
                                    </button>
                                </div>
                                <hr />
                            </>
                        ))}
                </div>
            </section>
    )
} 