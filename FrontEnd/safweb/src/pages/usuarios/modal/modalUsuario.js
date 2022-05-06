import React from 'react';

import './modalUsuario.css';

import axios from 'axios';

import MaskedInput from '../../login/MaskedInput';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { }, children }) => {

    const notyf = new Notyf();

    function CadastrarCarroceria(event) {

        event.preventDefault();

        axios.post('http://backend-saf-api.azurewebsites.net/api/Usuario', {
            

        })
            .then((resposta) => {
                if (resposta.status === 201) {
                    notyf.success(
                        {
                            message: 'Usuario cadastrado!',
                            duration: 1000,
                            position: {
                                x: 'right',
                                y: 'top',
                            }
                        }
                    );
                    onClose()
                }
            })

    }

    return (
        <div className="modalUsuario">
            <div className="wrapperModalUsuario">
                <div className="headerModal">
                    <p className="pHeaderModal">CADASTRO DE USUÁRIO</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudoUsuario">
                    <div className='imgCadastrar'><FontAwesomeIcon icon={faImage} color="white" size="5x" /></div>
                    <form className='formularioCadastro'>
                        <div className='juntaInputsUsuario'>
                            <div className='inputs-esq'>
                                <input className='inputUsuario' type='text' name='nome' placeholder='Nome' required />
                                <input className='inputUsuario' type='text' placeholder='Sobrenome' name='sobrenome' required />
                            </div>
                            <div className='inputs-dir'>
                                {/* Adicionar máscara de telefone e ajustar de CPF */}
                                <MaskedInput className='inputUsuario' mask="999.999.999-99" placeholder='CPF' required />
                                <input className='inputUsuario' type='tel' name='tel' placeholder='Telefone' required />
                            </div>
                        </div>
                        <button className='btn_cadastroUsuario' type='submit'><p className='pCadastro'>Cadastrar</p></button>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default Modal;