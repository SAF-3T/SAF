import { useState, useEffect } from 'react';

import React from 'react';

import '../modal/modalCarroceria.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { }, children }) => {

    return (
        <div className="modalCarroceria">
            <div className="wrapperModalCarrocerias">
                <div className="headerModal">
                    <p className="pHeaderModal">CADASTRO DE CARROCERIA</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudosCarrocerias">
                    <div className='conteudoCarroceria'>
                        <input className='inputCarroceria' type='text' placeholder="Tipo de carroceria" name='carroceria' required/>
                        <button className='btn_cadastroCarroceria' type='submit'><p className='pBtnCadastroCarroceria'>Cadastrar</p></button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Modal;