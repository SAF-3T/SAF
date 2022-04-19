import React from 'react';

import '../components/modal.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { }, children }) => {
    return (
        <div className="modal">
            <div className="wrapperModal">
                <div className="headerModal">
                    <p className="pHeaderModal">[cadastro-de-nome]</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudo">
                    <div className='imgCadastrar'></div>
                    <form className='formularioCadastro'>
                        <div className='juntaInputs'>
                            <div className='inputs-esq'>
                                <input className='inputs' type='text' name='tipoVeiculo' placeholder='Placa' />
                                <input className='inputs' type='text' name='tipoVeiculo' placeholder='Marca' />
                                <input className='inputs' type='text' name='tipoVeiculo' placeholder='Data de aquisição' />
                            </div>
                            <div className='inputs-dir'>
                                <input className='inputs' type='text' name='tipoVeiculo' placeholder='Tipo de Veículo' />
                                <input className='inputs' type='text' name='tipoVeiculo' placeholder='Carroceria' />
                                <input className='inputs' type='text' name='tipoVeiculo' placeholder='Carga' />
                            </div>
                        </div>
                        <input className='inputs inputStatus' type='text' name='tipoVeiculo' placeholder='Status' />
                    </form>
                    {/* <div></div>
                    <div></div> */}
                </div>
            </div>
        </div >
    );
};

export default Modal;