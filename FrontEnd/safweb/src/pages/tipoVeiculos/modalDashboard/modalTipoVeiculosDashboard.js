import { useState } from 'react';

import axios from 'axios';

import React from 'react';

import '../../tipoVeiculos/modalDashboard/modalTipoVeiculosDashboard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ onClose = () => { } }) => {

    const [TipoVeiculo, setTipoVeiculo] = useState([]);

    function CadastrarTipoVeiculo(event) {

        event.preventDefault();

        axios.post('http://localhost:5000/api/TipoVeiculos', {
            nomeTipoVeiculo : TipoVeiculo
        }
            .then(resposta => {
                if (resposta.status === 201) {
                    console.log('Tipo veiculo cadastrada')
                    setTipoVeiculo('');
                }
            })
            .catch(erro => console.log(erro))
        );
    };

    return (
        <div className="modalTipoVeiculo">
            <div className="wrapperModalTipoVeiculosDashboard">
                <div className="headerModal">
                    <p className="pHeaderModal">CADASTRO DE VEÍCULO</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudosTipoVeiculos">
                    <form className='conteudoTipoVeiculo' onSubmit={CadastrarTipoVeiculo}>
                        <input className='inputTipoVeiculo' type='text' placeholder="Tipo de veículo" name='TipoVeiculo' value={TipoVeiculo} onChange={event => setTipoVeiculo(event.target.value)} required/>
                        <button className='btn_cadastro-TipoVeiculo' type='submit'><p className='pBtnCadastroTipoVeiculo'>Cadastrar</p></button>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default Modal;