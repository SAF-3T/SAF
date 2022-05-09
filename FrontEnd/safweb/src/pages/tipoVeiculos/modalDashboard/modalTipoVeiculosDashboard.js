import { useState } from 'react';

import axios from 'axios';

import React from 'react';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import '../../tipoVeiculos/modalDashboard/modalTipoVeiculosDashboard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ onClose = () => { } }) => {

    const [TipoDeVeiculo, setTipoDeVeiculo] = useState([]);

    const notyf = new Notyf();

    function CadastrarTipoVeiculo(event) {

        event.preventDefault();

        axios.post('http://backend-saf-api.azurewebsites.net/api/TipoVeiculos', {
            nomeTipoVeiculo: TipoDeVeiculo
        })
            .then(resposta => {
                if (resposta.status === 201) {
                    onClose()
                    notyf.success(
                        {
                            message: 'Tipo de veículo cadastrado com êxito',
                            duration: 1000,
                            position: {
                                x: 'right',
                                y: 'top',
                            }
                        }
                    );
                }
            })
            .catch(erro => console.log(erro));
    };

    return (
        <div className="modalTipoVeiculo">
            <div className="wrapperModalTipoVeiculosDashboard">
                <div className="headerModal">
                    <p className="pHeaderModal">CADASTRO DE TIPO VEÍCULO</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudosTipoVeiculos">
                    <form className='conteudoTipoVeiculo' onSubmit={CadastrarTipoVeiculo}>
                        <input className='inputTipoVeiculo' type='text' placeholder="Tipo de veículo" name='TipoVeiculo' value={TipoDeVeiculo} onChange={event => setTipoDeVeiculo(event.target.value)} required />
                        <button className='btn_cadastro-TipoVeiculo' type='submit'><p className='pBtnCadastroTipoVeiculo'>Cadastrar</p></button>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default Modal;