import Link from 'next/link'
import TextField from '@material-ui/core/TextField'
import CallMadeRoundedIcon from '@material-ui/icons/CallMadeRounded';

export default function MyShop({usuario}){
    return(
        <div className="admin-my-shop">
            <div className="btn-ver-loja">
                <CallMadeRoundedIcon />
                <Link href={`/loja/${usuario}`}>
                    <button>Ver Minha Loja</button>
                </Link>
            </div>
            <h2>
                Configure sua loja do seu jeito
            </h2>

            <div className="my-shop-form">
                <TextField label="Nome" className={{borderColor: 'red'}} variant="outlined"/>
                <TextField label="Telefone" variant="outlined"/>
                <TextField label="Cor" variant="outlined"/>
                <h2>
                    Escolha apenas uma cor e deixe que cuidamos do resto!
                </h2>

                <button className="button-cadastro">Alterar</button>
            </div>
        </div>
    )
}