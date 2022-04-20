import { useState, useEffect } from 'react';

import React from 'react';

import '../../modals/carrocerias/modalCarroceria.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { }, children }) => {

    return (
        <div className="modal">
            <div className="wrapperModal">
                <div className="headerModal">
                    <p className="pHeaderModal">CADASTRO DE CARROCERIA</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudos">
                    <div className="conteudo">
                        <div className='imgCadastrar'><FontAwesomeIcon icon={faImage} color="white" size="5x" /></div>
                        <form className='formularioCadastro'>
                            <div className='juntaInputs'>
                                <div className='inputs-esq'>
                                    <input className='inputs' type='text' placeholder="ABC-1234" name='placa' maxlength="8" />
                                    <input className='inputs' type='text' name='marca' placeholder='Marca' />
                                    <input className='inputs' type='date' name='data' placeholder='Data de aquisição' />
                                    <select className='inputs selects' type='text' name='status' placeholder='Status' required>
                                        <option value='' disabled selected>Status</option>
                                    </select>
                                </div>
                                <div className='inputs-dir'>
                                    <select className='inputs selects' type='text' name='tipoVeiculo' required>
                                        <option value='' disabled selected>Tipo de veículo</option>
                                    </select>
                                    <select className='inputs selects' type='text' name='carroceria' required>
                                        <option value='' disabled selected>Carroceria</option>
                                    </select>
                                    <select className='inputs selects' type='text' name='carga' required>
                                        <option value='' disabled selected>Carga</option>
                                    </select>
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