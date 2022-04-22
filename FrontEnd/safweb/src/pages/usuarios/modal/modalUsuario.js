import React from 'react';

import './modalUsuario.css';

import MaskedInput from '../../login/MaskedInput';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { }, children }) => {

    return (
        <div className="modal">
            <div className="wrapperModal">
                <div className="headerModal">
                    <p className="pHeaderModal">CADASTRO DE USUÁRIO</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudos">
                    <div className="conteudo">
                        <div className='imgCadastrar'><FontAwesomeIcon icon={faImage} color="white" size="5x" /></div>
                        <form className='formularioCadastro'>
                            <div className='juntaInputs'>
                                <div className='inputs-esq'>
                                    <input className='inputUsuario' type='text' name='nome' placeholder='Nome' required/>
                                    <input className='inputUsuario' type='text' placeholder='Sobrenome' name='sobrenome' required/>
                                </div>
                                <div className='inputs-dir'>
                                    {/* Adicionar máscara de telefone e ajustar de CPF */}
                                    <MaskedInput className='inputUsuario' mask="999.999.999-99" placeholder='CPF' required/>
                                    <input className='inputUsuario' type='tel' name='tel' placeholder='Telefone' required />
                                    <button className='btn_cadastro' type='submit'><p className='pCadastro'>Cadastrar</p></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Modal;