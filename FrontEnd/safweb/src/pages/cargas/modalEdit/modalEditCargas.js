import React from 'react';

import './modalEditCargas.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { }, children }) => {

    return (
        <div className="modal">
            <div className="wrapperModalCargas">
                <div className="headerModal">
                    <p className="pHeaderModal">EDITAR CARGA</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudosCargas">
                    <div className='conteudoCarga'>
                        <input className='inputCarga' type='text' placeholder="Tipo de carga" name='carga' required/>
                        <button className='btn_EditarCarga' type='submit'><p className='pBtnEditarCarga'>ATUALIZAR</p></button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Modal;