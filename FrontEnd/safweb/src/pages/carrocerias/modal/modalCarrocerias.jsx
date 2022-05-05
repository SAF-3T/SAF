import { useState, useEffect } from 'react';

import React from 'react';

import '../modal/modalCarroceria.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { }, children }) => {

    return (
        <div className="modalCarroceria">
            <div className="wrapperModalCarrocerias1">
                <div className="headerModal">
                    <p className="pHeaderModal">CADASTRO DE CARROCERIA</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudosCarrocerias1">
                    <div className='conteudoCarroceriaModal'>
                        <div className="inputsCarroceria">
                            <select className='inputSelect' type='text' placeholder="Tipo de carroceria" name='carroceria' required>
                                <option value='0' disabled selected >Tipo de carroceria</option>
                            </select>
                            <input className='inputCarroceria1' type='number' placeholder="Cubagem" name='carroceria' required />
                            <input className='inputCarroceria1' type='number' placeholder="Peso" name='carroceria' required />
                        </div>
                        <button className='btn_cadastroCarroceria' type='submit'><p className='pBtnCadastroCarroceria'>Cadastrar</p></button>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Modal;