import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

export default function ResgisterProduct({setIsAdminProducts}){

    //Popup state
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsAdminProducts(true)
    };


    // Form states
    const [ name, setName] = useState('')
    const [ descricao, setDescricao] = useState('')
    const [ preco, setPreco] = useState(0)
    const [ img, setImg] = useState(null)

    async function sendProduct(){
        const precoNumber = parseFloat(preco)
        const formData = new FormData()

        formData.append('nome', name)
        formData.append('descricao', descricao)
        formData.append('preco', precoNumber)
        formData.append('token', localStorage.getItem('token'))
        formData.append("img", img[0])

        const response = await fetch('http://localhost:3001/produtos/',{
            method: 'POST',
            body: formData
        })
        const json = await response.json()
        if(json.error){
            console.log(json.error);
            window.alert(json.error)
        }else{
            handleClickOpen()
        }
    }

    return(
        <div className='admin-form'>
            <Dialog
            open={open}
            onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Produto criado com sucesso!"} <CheckCircleRoundedIcon fontSize="large" style={{color: 'green'}}/>
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

            <Button
            onClick={() => setIsAdminProducts(true)}
            variant="contained"
            className="button-cadastro"
            startIcon={<ArrowBackIosRoundedIcon />}
            color="primary"
            >
                Voltar
            </Button>
            <p>
                Preencha as informações do seu produto e aperte em <span className="sublime">criar!</span>
            </p>

            <div  className='admin-input'>
                <TextField label="Nome do Produto" multiline variant="outlined" onChange={(e) => setName(e.target.value)}/>
            </div>
            
            <div  className='admin-input'>
                <TextField className='admin-input' multiline label="Descrição" variant="outlined" onChange={ (e) => setDescricao(e.target.value)}/>
            </div>

            <div  className='admin-input'>
                <TextField className='admin-input' label="Preço" variant="outlined" type='number'onChange={ (e) => setPreco(e.target.value)}/>
            </div>

            <label className='file-input' htmlFor="image">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <CloudUploadIcon size="large" />
                </IconButton>
                <Button variant="contained" color="primary" component="span">
                    Escolher imagem
                </Button>
            </label>
            <input style={{display: 'none'}} id="image" type='file'onChange={ (e) => setImg(e.target.files)}/>

            <Button
            onClick={sendProduct}
            variant="contained"
            className='button-cadastro'
            startIcon={<BorderColorRoundedIcon />}
            color="primary"
            >
                Cadastrar
            </Button>
        </div>
    )
}