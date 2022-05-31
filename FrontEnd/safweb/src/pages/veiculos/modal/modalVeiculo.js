import React, { useEffect, useState } from 'react';

import './modalVeiculo.css';

import axios from 'axios';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import MaskedInputPlaca from '../MaskedInputPlaca';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons'

export default function Modal({ onClose = () => { } }) {

    const notyf = new Notyf();

    //Cadastrar
    const [Placa, setPlaca] = useState('');
    const [Marca, setMarca] = useState('');
    const [Data, setData] = useState('');
    const [IdCarroceria, setIdCarroceria] = useState('');
    const [Status, setStatus] = useState('');
    const [TipoVeiculo, setTipoVeiculo] = useState('');

    //Listar
    const [Marcas, setMarcas] = useState([]);
    const [TipoStatus, setTipoStatus] = useState([]);
    const [TipoVeiculos, setTipoVeiculos] = useState([]);
    const [Carrocerias, setCarrocerias] = useState([]);

    function BuscarForms() {

        axios.get("https://backend-saf-api.azurewebsites.net/api/Status")
            .then((response) => {
                if (response.status === 200) {
                    setTipoStatus(response.data)
                }
            })

        axios.get("https://backend-saf-api.azurewebsites.net/api/TipoVeiculos")
            .then((response) => {
                if (response.status === 200) {
                    setTipoVeiculos(response.data)
                }
            })

        axios.get("https://backend-saf-api.azurewebsites.net/api/Carroceria")
            .then((response) => {
                if (response.status === 200) {
                    setCarrocerias(response.data)
                }
            })

        axios.get("https://backend-saf-api.azurewebsites.net/api/Marca")
            .then((response) => {
                if (response.status === 200) {
                    setMarcas(response.data)
                }
            })
    }

    const AdicionarVeiculo = (event) => {

        event.preventDefault();

        var formData = new FormData();
        const element = document.getElementById('arquivo')
        const file = element.files[0]
        formData.append('arquivo', file, file.name)
        formData.append('idUsuario', 33);
        formData.append('idMarca', Marca);
        formData.append('idTipoVeiculo', TipoVeiculo);
        formData.append('idStatus', Status);
        formData.append('placa', Placa);
        formData.append('dataAquisicao', Data);
        formData.append('idCarroceria', IdCarroceria);

        try {
            axios({
                method: "post",
                url: "https://backend-saf-api.azurewebsites.net/api/Veiculos",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((resposta) => {
                    if (resposta.status === 200) {
                        onClose()
                        notyf.success(
                            {
                                message: 'Veículo cadastrado com êxito',
                                duration: 3000,
                                position: {
                                    x: 'right',
                                    y: 'top',
                                }
                            }
                        );
                    }
                    if (resposta.status === 204) {
                        notyf.error(
                            {
                                message: 'Placa já cadastrada',
                                duration: 3000,
                                position: {
                                    x: 'right',
                                    y: 'top',
                                }
                            }
                        );
                    }
                });
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { BuscarForms() }, []);

    function log() {
        console.log(Placa)
    }

    useEffect(log, [Placa])

    return (
        <div className="modalVeiculoDashboard">
            <div className="wrapperModalVeiculoDashboard">
                <div className="headerModal">
                    <p className="pHeaderModal">CADASTRO DE VEÍCULO</p>
                    <FontAwesomeIcon onClick={onClose} className="iconClose" icon={faClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudos">
                    <div className="conteudo">
                        <form form encType="multipart/form-data" className='formularioCadastroVeiculoDashboard'>
                            <div className='juntaInputs'>
                                <input type="file" id="arquivo" className="imgCadastrarVeiculoDashboard" style={{ cursor: 'pointer' }} accept="image/png; image/jpeg">
                                    {/* <FontAwesomeIcon icon={faImage} color="white" size="5x" /> */}
                                </input>
                                <div className='inputs-esq'>
                                    <MaskedInputPlaca className='inputVeiculoDashboard' mask="aaa-9999" placeholder='Placa' name='placa' onChange={(e) => setPlaca(e.target.value.toUpperCase())} />
                                    <select className='inputVeiculoDashboard selects' type='text' name='Marcas' placeholder='Marca' onChange={(e) => setMarca(e.target.value)}>
                                        <option value='0' disabled selected >Marca</option>
                                        {Marcas.map((marca) => {
                                            return (
                                                <option key={marca.idMarca} value={marca.idMarca}>
                                                    {marca.nomeMarca}
                                                </option>
                                            )
                                        })}
                                    </select>
                                    <input className='inputVeiculoDashboard' type='date' name='data' placeholder='Data de aquisição' onChange={(e) => setData(e.target.value)} />
                                    <select className='inputVeiculoDashboard selects' type='text' name='Status' placeholder='Status' required onChange={(e) => setStatus(e.target.value)}>
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
                                    <select className='inputVeiculoDashboard selects' type='text' name='TipoVeiculo' required onChange={(e) => setTipoVeiculo(e.target.value)}>
                                        <option value='0' disabled selected>Tipo de veículo</option>
                                        {TipoVeiculos.map((tipoVeiculo) => {
                                            return (
                                                <option key={tipoVeiculo.idTipoVeiculo} value={tipoVeiculo.idTipoVeiculo}>
                                                    {tipoVeiculo.nomeTipoVeiculo}
                                                </option>
                                            )
                                        })}
                                    </select>
                                    <select className='inputVeiculoDashboard selects' type='text' name='carroceria' required onChange={(e) => setIdCarroceria(e.target.value)}>
                                        <option value='0' disabled selected>Carroceria</option>
                                        {Carrocerias.map((carroceria) => {
                                            return (
                                                <option key={carroceria.idCarroceria} value={carroceria.idCarroceria}>
                                                    {carroceria.idCarroceria}
                                                </option>
                                            )
                                        })}
                                    </select>
                                    {/* <select className='inputVeiculoDashboard selects' type='text' name='TipoCargas' required onChange={(e) => setCarga(e.target.value)}>
                                        <option value='0' disabled selected>Carga</option>
                                        {TiposCargas.map((tipo) => {
                                            return (
                                                <option key={tipo.idTipoCarga} value={tipo.idTipoCarga}>
                                                    {tipo.nomeTipoCarga}
                                                </option>
                                            )
                                        })}
                                    </select> */}
                                    <button onClick={(e) => AdicionarVeiculo(e)} className='btn_cadastro_Dashboard' type="submit"><p className='pCadastro'>Cadastrar</p></button>
                                </div>
                            </div>
                        </form>
                    </div >
                </div >
            </div >
        </div >
    )

}