import { useState } from 'react';

import axios from 'axios';

import './modalCargas.css';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { } }) => {

    const [NovaCarga, setNovaCarga] = useState('');
    const [Disponibiliade, setDisponibilidade] = useState('');

    const notyf = new Notyf();

    async function CadastrarCarga(event) {

        event.preventDefault();
        axios('http://backend-saf-api.azurewebsites.net/VerificaDisponibilidadeNome/' + NovaCarga)
            .then(response => {
                setDisponibilidade(response.data)
            })
            
        if (Disponibiliade === 1) {
            axios.post('http://backend-saf-api.azurewebsites.net/api/TipoCargas', {
                nomeTipoCarga: NovaCarga
            })
                .then((resposta) => {
                    if (resposta.status === 201) {
                        onClose()
                        notyf.success(
                            {
                                message: 'Carga cadastrada com êxito',
                                duration: 3000,
                                position: {
                                    x: 'right',
                                    y: 'top',
                                }
                            }
                        );
                    }
                })
        }
        if (Disponibiliade === 0) {
            notyf.error(
                {
                    message: 'Carga já cadastrada!',
                    duration: 3000,
                    position: {
                        x: 'right',
                        y: 'top',
                    }
                }
            );
        }
    };


    return (
        <div className="modal">
            <div className="wrapperModalCargas">
                <div className="headerModal">
                    <p className="pHeaderModal">CADASTRO DE CARGA</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudosCargas">
                    <form className='conteudoCarga' onSubmit={CadastrarCarga}>
                        <input required type='text' className='inputCarga' placeholder='Tipo de carga' onChange={(e) => setNovaCarga(e.target.value)} />
                        <button className='btn_cadastroCarga' type='submit'><p className='pBtnCadastroCarga'>Cadastrar</p></button>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default Modal;