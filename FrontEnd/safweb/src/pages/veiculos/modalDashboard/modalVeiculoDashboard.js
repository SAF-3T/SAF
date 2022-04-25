import React from 'react';

import './modalVeiculoDashboard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { } }) => {
    
    return (
        <div className="modalVeiculoDashboard">
            <div className="wrapperModalVeiculoDashboard">
                <div className="headerModal">
                    <p className="pHeaderModal">CADASTRO DE VEÍCULO</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudos">
                    <div className="conteudo">
                        <div className='imgCadastrarVeiculoDashboard'><FontAwesomeIcon icon={faImage} color="white" size="5x" /></div>

                        <form className='formularioCadastroVeiculoDashboard'>
                            <div className='juntaInputs'>
                                <div className='inputs-esq'>
                                    <input className='inputVeiculoDashboard' type='text' placeholder="ABC-1234" name='placa' maxlength="8" />
                                    <input className='inputVeiculoDashboard' type='text' name='marca' placeholder='Marca' />
                                    <input className='inputVeiculoDashboard' type='date' name='data' placeholder='Data de aquisição' />
                                    <select className='inputVeiculoDashboard selectsVeiculoDashboard' type='text' name='status' placeholder='Status' required>
                                        <option value='' disabled selected>Status</option>
                                    </select>
                                </div>
                                <div className='inputs-dir'>
                                    <select className='inputVeiculoDashboard selectsVeiculoDashboard' type='text' name='tipoVeiculo' required>
                                        <option value='' disabled selected>Tipo de veículo</option>
                                    </select>
                                    <select className='inputVeiculoDashboard selectsVeiculoDashboard' type='text' name='carroceria' required>
                                        <option value='' disabled selected>Carroceria</option>
                                    </select>
                                    <select className='inputVeiculoDashboard selectsVeiculoDashboard' type='text' name='carga' required>
                                        <option value='' disabled selected>Carga</option>
                                    </select>
                                    <div className='inputVeiculoDashboardEspaco'/>
                                </div>
                            </div>
                        </form>
                    </div >
                    <button className='btn_cadastro_Dashboard' type='submit'><p className='pCadastro'>Cadastrar</p></button>
                </div >
            </div >
        </div >
    );
};

export default Modal;