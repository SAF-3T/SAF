import React, { useEffect, useState } from 'react';

import './modalVeiculo.css';

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons'

export default function Modal({ onClose = () => { } }) {

    const [Placa, setPlaca] = useState('');
    const [Marca, setMarca] = useState('');
    const [Data, setData] = useState('');
    const [Status, setStatus] = useState('');
    const [TipoVeiculo, setTipoVeiculo] = useState('');
    const [Carroceria, setCarroceria] = useState('');
    const [Carga, setCarga] = useState('');

    const [TiposCarrocerias, setTiposCarrocerias] = useState([]);
    const [Marcas, setMarcas] = useState([ 'AS', 'df']);
    const [TiposCargas, setTiposCargas] = useState([]);

    function AdicionarVeiculo() {

        var formData = new FormData();

        const element = document.getElementById('arquivo')
        const file = element.files[0]
        formData.append('arquivo', file, file.name)

        formData.append('placa', Placa);
        formData.append('idMarca', Marca);
        formData.append('dataAquisicao', Data);
        formData.append('idStatus', Status);
        formData.append('idTipoVeiculo', TipoVeiculo);
        formData.append('idCarroceria', Carroceria);
        formData.append('idTipoCarga', Carga);

        axios({
            method: "post",
            url: "http://backend-saf-api.azurewebsites.net/api/Veiculos",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
    }

    function BuscarFroms() {
        axios.get("http://backend-saf-api.azurewebsites.net/api/TipoCarroceria")
            .then((response) => {
                if (response.status == 200) {
                    setTiposCarrocerias(response.data)
                }
            })
        axios.get("http://backend-saf-api.azurewebsites.net/api/TiposCargas")
            .then((response) => {
                if (response.status == 200) {
                    setTiposCargas(response.data)
                }
            })
        axios.get("http://backend-saf-api.azurewebsites.net/api/TiposCargas")
            .then((response) => {
                if (response.status == 200) {
                    setMarcas(response.data)
                }
            })
    }


    useEffect(BuscarFroms, []);

    return (
        <div className="modal">
            <div className="wrapperModal">
                <div className="headerModal">
                    <p className="pHeaderModal">CADASTRO DE VEÍCULO</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudos">
                    <div className="conteudo">
                        <div className='imgCadastrar'><FontAwesomeIcon icon={faImage} color="white" size="5x" /></div>

                        <form className='formularioCadastro' onSubmit={AdicionarVeiculo}>
                            <div className='juntaInputs'>
                                <div className='inputs-esq'>
                                    <input className='inputVeiculo' type='text' placeholder="ABC-1234" name='placa' maxlength="8" onChange={(e) => setPlaca(e.target.value)} />
                                    <select className='inputVeiculo selects' type='text' name='Marcas' placeholder='Marca' onChange={(e) => setMarca(e.target.value)}>
                                        <option value='' disabled selected>Marca</option>
                                    </select>
                                    <input className='inputVeiculo' type='date' name='data' placeholder='Data de aquisição' onChange={(e) => setData(e.target.value)} />
                                    <select className='inputVeiculo selects' type='text' name='status' placeholder='Status' required onChange={(e) => setStatus(e.target.value)}>
                                        <option value='' disabled selected>Status</option>
                                    </select>
                                </div>
                                <div className='inputs-dir'>
                                    <select className='inputVeiculo selects' type='text' name='tipoVeiculo' required onChange={(e) => setTipoVeiculo(e.target.value)}>
                                        <option value='' disabled selected>Tipo de veículo</option>
                                    </select>
                                    <select className='inputVeiculo selects' type='text' name='carroceria' required onChange={(e) => setCarroceria(e.target.value)}>
                                        <option value='' disabled selected>Carroceria</option>
                                    </select>
                                    <select className='inputVeiculo selects' type='text' name='carga' required onChange={(e) => setCarga(e.target.value)}>
                                        <option value='' disabled selected>Carga</option>
                                    </select>
                                    <button className='btn_cadastro' type='submit'><p className='pCadastro'>Cadastrar</p></button>
                                </div>
                            </div>
                        </form>
                    </div >
                </div >
            </div >
        </div >
    )
}