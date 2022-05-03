import { useState, useEffect } from 'react';

import React from 'react';

import '../modalEdit/modalEditCarrocerias.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { }, children }) => {

    return (
        <div className="modalCarroceria">
            <div className="wrapperModalCarrocerias">
                <div className="headerModal">
                    <p className="pHeaderModal">EDITAR CARROCERIA</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudosCarrocerias">
                    <div className='conteudoCarroceria'>
                        <input className='inputCarroceria' type='text' placeholder="Tipo de carroceria" name='carroceria' required/>
                        <button className='btn_editarCarroceria' type='submit'><p className='pBtnEditarCarroceria'>ATUALIZAR</p></button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Modal;