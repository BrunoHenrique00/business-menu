import { useState } from 'react';

import SearchIcon from '@material-ui/icons/Search';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import EditIcon from '@material-ui/icons/Edit';
import EditProduct from './EditProduct'


async function removeProduto(idProduto){
    const response = await fetch(`http://localhost:3001/produtos/${idProduto}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: localStorage.getItem('token')})
    })
    const json = await response.json()
    console.log(json)
    window.alert('Produto removido com sucesso!')
}


export default function AdminProducts({produtos , setIsAdminProducts , isPaid}){

    const [ isEdit , setIsEdit ] = useState(false)
    const [editingProduct , setEditingProduct] = useState({})

    function handleEdit(id){
        const [ produto ] = produtos.filter((produto) => produto.id === id )
        
        setEditingProduct(produto)
        setIsEdit(true)
    }

    return (
        <section className="admin-section">
                {!isEdit &&
                <>
                <div className="busca-admin">
                    <input placeholder="Busque um produto..."/>
                    <SearchIcon style={{fontSize: 50}}/>
                </div>
                {isPaid && <button className="btn-registrar-produto" onClick={() => setIsAdminProducts(false)}>Adicionar Produto</button>}
                {!isPaid && <button className="btn-registrar-produto">Você precisa ativar sua assinatura.</button>}
                <div className="produtos">
                        { produtos.lenght === 0 ? <p style={{textAlign: 'center'}}>Sem produtos ainda.</p> : produtos.map( produto => (
                            <>
                                <div className='produtos-cadastrados'>
                                    <img src={`http://localhost:3001/uploads/${produto.path_image}`} />
                                    <h1>{produto.nome}</h1>
                                    <h2>R$ {produto.preco.toFixed(2)}</h2>
                                    <button className="btn-alterar" onClick={() => handleEdit(produto.id)}>
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
                </>
                }
                { isEdit && <EditProduct setIsEdit={setIsEdit} produto={editingProduct} />}
        </section>
    )
} 