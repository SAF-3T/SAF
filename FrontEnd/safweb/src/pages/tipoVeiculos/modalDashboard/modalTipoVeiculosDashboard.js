import { useState, useEffect } from 'react';

import React from 'react';

import '../../tipoVeiculos/modalDashboard/modalTipoVeiculosDashboard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { }, children }) => {

    return (
        <div className="modalTipoVeiculo">
            <div className="wrapperModalTipoVeiculosDashboard">
                <div className="headerModal">
                    <p className="pHeaderModal">CADASTRO DE VEÍCULO</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudosTipoVeiculos">
                    <div className='conteudoTipoVeiculo'>
                        <input className='inputTipoVeiculo' type='text' placeholder="Tipo de veículo" name='carroceria' required/>
                        <button className='btn_cadastro-TipoVeiculo' type='submit'><p className='pBtnCadastroTipoVeiculo'>Cadastrar</p></button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Modal;