import React, { useEffect, useState } from 'react';

import './modalVeiculo.css';

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { TrackChanges } from '@material-ui/icons';

export default function Modal({ onClose = () => { } }) {

    const [Placa, setPlaca] = useState('');
    const [Marca, setMarca] = useState('');
    const [Data, setData] = useState('');
    const [IdCarroceria, setIdCarroceria] = useState('');
    const [Status, setStatus] = useState([]);
    const [Carga, setCarga] = useState('');
    const [TipoVeiculo, setTipoVeiculo] = useState('');


    const [Marcas, setMarcas] = useState([]);
    const [TipoStatus, setTipoStatus] = useState([]);
    const [TipoVeiculos, setTipoVeiculos] = useState([]);
    const [Carrocerias, setCarrocerias] = useState([]);
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
        formData.append('idTipoVeiculo', TipoVeiculos);
        formData.append('idCarroceria', IdCarroceria);
        formData.append('idTipoCarga', Carga);

        axios({
            method: "post",
            url: "http://backend-saf-api.azurewebsites.net/api/Veiculos",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
    }

    function BuscarForms() {


        axios.get("http://backend-saf-api.azurewebsites.net/api/Status")
            .then((response) => {
                if (response.status == 200) {
                    setTipoStatus(response.data)
                    console.log(TipoStatus)
                }
            })

        axios.get("http://backend-saf-api.azurewebsites.net/api/TipoVeiculos")
            .then((response) => {
                if (response.status == 200) {
                    setTipoVeiculos(response.data)
                    console.log(TipoVeiculos)
                }
            })

        axios.get("http://backend-saf-api.azurewebsites.net/api/Carroceria")
            .then((response) => {
                if (response.status == 200) {
                    setCarrocerias(response.data)
                    console.log(Carrocerias)
                }
            })

        axios.get("http://backend-saf-api.azurewebsites.net/api/TipoCargas")
            .then((response) => {
                if (response.status == 200) {
                    setTiposCargas(response.data)
                    console.log(TiposCargas);
                }
            })

        axios.get("http://backend-saf-api.azurewebsites.net/api/Marca")
            .then((response) => {
                if (response.status == 200) {
                    setMarcas(response.data)
                    console.log(Marcas);
                }
            })
    }

    useEffect(BuscarForms, []);
    //useEffect(Log, TrackChanges)

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
                                        <option value='0' disabled selected >Marca</option>
                                        {Marcas.map((marca) => {
                                            return (
                                                <option key={marca.idMarca} value={marca.idMarca}>
                                                    {marca.nomeMarca}
                                                </option>
                                            )
                                        })}
                                    </select>
                                    <input className='inputVeiculo' type='date' name='data' placeholder='Data de aquisição' onChange={(e) => setData(e.target.value)} />
                                    <select className='inputVeiculo selects' type='text' name='Status' placeholder='Status' required onChange={(e) => setStatus(e.target.value)}>
                                        <option value='0' disabled selected>Status</option>
                                        {TipoStatus.map((status) => {
                                            return (
                                                <option key={status.idStatus} value={status.idStatus}>
                                                    {status.nomeStatus}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className='inputs-dir'>
                                    <select className='inputVeiculo selects' type='text' name='Tipo' required onChange={(e) => setTipoVeiculo(e.target.value)}>
                                        <option value='0' disabled selected>Tipo de veículo</option>
                                        {TipoVeiculos.map((tipoVeiculo) => {
                                            <option key={tipoVeiculo.idTipoVeiculo} value={tipoVeiculo.idTipoVeiculo}>
                                                {tipoVeiculo.nomeTipoVeiculo}
                                            </option>
                                        })}
                                    </select>
                                    <select className='inputVeiculo selects' type='text' name='carroceria' required onChange={(e) => setIdCarroceria(e.target.value)}>
                                        <option value='' disabled selected>Carroceria</option>
                                        {Carrocerias.map((carroceria) => {
                                            return (
                                                <option key={carroceria.idCarroceria} value={carroceria.idCarroceria}>
                                                    {carroceria.idCarroceria}
                                                </option>
                                            )
                                        })}
                                    </select>
                                    <select className='inputVeiculo selects' type='text' name='TipoCargas' required onChange={(e) => setCarga(e.target.value)}>
                                        <option value='0' disabled selected>Carga</option>
                                        {TiposCargas.map((tipo) => {
                                            return (
                                                <option key={tipo.idTipoCarga} value={tipo.idTipoCarga}>
                                                    {tipo.nomeTipoCarga}
                                                </option>
                                            )
                                        })}
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