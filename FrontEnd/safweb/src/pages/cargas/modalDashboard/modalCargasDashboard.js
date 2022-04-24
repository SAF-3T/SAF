import React from 'react';

import './modalCargasDashboard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { }, children }) => {

    return (
        <div className="modal">
            <div className="wrapperModalCargasDashboard">
                <div className="headerModal">
                    <p className="pHeaderModal">CADASTRO DE CARGA</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudosCargas">
                    <div className='conteudoCarga'>
                        <input className='inputCarga' type='text' placeholder="Tipo de carga" name='carga' required/>
                        <button className='btn_cadastroCarga' type='submit'><p className='pBtnCadastroCarga'>Cadastrar</p></button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Modal;