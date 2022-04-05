import React from 'react';

import '../components/modal.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { }, children }) => {
    return (
        <div className="modal" onClick={onClose}>
            <div className="wrapperModal">
                <div className="headerModal">
                    <p className="pHeaderModal">Cadastro de veículo</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} color="red" size="lg" />
                </div>
                <button className="close" onClick={onClose}></button>
                <div className="conteudo">{children}</div>
            </div>
        </div>
    );
};

export default Modal;