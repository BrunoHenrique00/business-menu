import { useState } from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditProduct({ setIsEdit , produto}){

    //Popup state
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsEdit(false)
    };

    const [nome , setNome] = useState(produto.nome)
    const [preco , setPreco] = useState(produto.preco)
    const [descricao , setDescricao] = useState(produto.descricao)



    async function handleEdit(){
        const data = {
            nome,
            preco,
            descricao,
            token: localStorage.getItem('token')
        }
        console.log(data);
        const response = await fetch(`http://localhost:3001/produtos/${produto.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const json = await response.json()
        if(!json.error){
            handleClickOpen()
        }else{
            console.log(json);
        }
    }

    return (
        <div className="admin-edit-form">
            <Dialog
            open={open}
            onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Produto alterado com sucesso!"} <CheckCircleRoundedIcon fontSize="large" style={{color: 'green'}}/>
                </DialogTitle>
                {/* <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Produto criado com sucesso! <CheckCircleRoundedIcon />
                    </DialogContentText>
                </DialogContent> */}
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <div className='admin-edit-flex'>
                <img src={`http://localhost:3001/uploads/${produto.path_image}`}/>
                <div className="admin-edit-info">
                    <p>Mude o que quiser e clique no botão para alterar!</p>
                    <Button
                    onClick={() => setIsEdit(false)}
                    variant="contained"
                    startIcon={<ArrowBackRoundedIcon />}
                    color="primary"
                    >
                    Voltar
                    </Button>
                </div>
                
            </div>
            <div className='admin-edit-flex'>
                <TextField 
                value={nome}
                label="Nome"
                onChange={(e) => setNome(e.target.value)}
                />

                <TextField 
                value={preco.toFixed(2)}
                type="number"
                label="Preço"
                className="admin-edit-preco"
                onChange={(e) => setPreco(e.target.value)}
                />
            </div>

            <TextField 
            value={descricao}
            label="Descrição"
            multiline
            onChange={(e) => setDescricao(e.target.value)}
            />

            <Button
            onClick={() => handleEdit()}
            variant="contained" 
            color="primary"
            startIcon={<EditRoundedIcon />}
            >
                Alterar
            </Button>
        </div>
    )
}