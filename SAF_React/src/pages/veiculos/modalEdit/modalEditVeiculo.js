import React from 'react';

import '../modalEdit/modalEditVeiculo.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { } }) => {

    return (
        <div className="modalEditVeiculo">
            <div className="wrapperModal">
                <div className="headerModal">
                    <p className="pHeaderModal">EDITAR VEÍCULO</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudos">
                    <div className="conteudo">
                        <div className='imgCadastrar'><FontAwesomeIcon icon={faImage} color="white" size="5x" /></div>

                        <form className='formularioCadastro'>
                            <div className='juntaInputs'>
                                <div className='inputs-esq'>
                                    <input className='inputVeiculo' type='text' placeholder="ABC-1234" name='placa' maxlength="8" />
                                    <input className='inputVeiculo' type='text' name='marca' placeholder='Marca' />
                                    <input className='inputVeiculo' type='date' name='data' placeholder='Data de aquisição' />
                                    <select className='inputVeiculo selects' type='text' name='status' placeholder='Status' required>
                                        <option value='' disabled selected>Status</option>
                                    </select>
                                </div>
                                <div className='inputs-dir'>
                                    <select className='inputVeiculo selects' type='text' name='tipoVeiculo' required>
                                        <option value='' disabled selected>Tipo de veículo</option>
                                    </select>
                                    <select className='inputVeiculo selects' type='text' name='carroceria' required>
                                        <option value='' disabled selected>Carroceria</option>
                                    </select>
                                    <select className='inputVeiculo selects' type='text' name='carga' required>
                                        <option value='' disabled selected>Carga</option>
                                    </select>
                                    <button className='btn_editarVeiculo' type='submit'><p className='pCadastro'>Atualizar</p></button>
                                </div>
                            </div>
                        </form>
                    </div >
                </div >
            </div >
        </div >
    );
};

export default Modal;