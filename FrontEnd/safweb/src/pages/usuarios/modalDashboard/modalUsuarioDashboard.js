import React from 'react';

import './modalUsuarioDashboard.css';

import MaskedInput from '../../login/MaskedInput';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { }, children }) => {

    return (
        <div className="modalUsuario">
            <div className="wrapperModalUsuarioDashboard">
                <div className="headerModalUsuarioDashboard">
                    <p className="pHeaderModal">CADASTRO DE USUÁRIO</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudoUsuario">
                    <div className='imgCadastrarUsuarioDashboard'><FontAwesomeIcon icon={faImage} color="white" size="5x" /></div>
                    <form className='formularioCadastroUsuarioDashboard'>
                        <div className='juntaInputsUsuario'>
                            <div className='inputs-esq'>
                                <input className='inputUsuario' type='text' name='nome' placeholder='Nome' required />
                                <input className='inputUsuario' type='text' placeholder='Sobrenome' name='sobrenome' required />
                            </div>
                            <div className='inputs-dir-UsuarioDashboard'>
                                {/* Adicionar máscara de telefone e ajustar de CPF */}
                                <MaskedInput className='inputUsuario' mask="999.999.999-99" placeholder='CPF' required />
                                <input className='inputUsuario' type='tel' name='tel' placeholder='Telefone' required />
                            </div>
                        </div>
                        <button className='btn_cadastro_Usuario-Dashboard' type='submit'><p className='pCadastro'>Cadastrar</p></button>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default Modal;