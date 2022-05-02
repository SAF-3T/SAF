import React, { useEffect, useState } from 'react';

import './modalVeiculo.css';

import axios from 'axios';

import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons'

export default function Modal({ onClose = () => { } }) {

    const [Placa, setPlaca] = useState('');
    const [Marca, setMarca] = useState('');
    const [Data, setData] = useState('');
    const [IdCarroceria, setIdCarroceria] = useState('');
    const [Status, setStatus] = useState('');
    const [Carga, setCarga] = useState('');
    const [TipoVeiculo, setTipoVeiculo] = useState('');
    const [IdUsuario, setIdUsuario] = useState('');


    const [Marcas, setMarcas] = useState([]);
    const [TipoStatus, setTipoStatus] = useState([]);
    const [TipoVeiculos, setTipoVeiculos] = useState([]);
    const [Carrocerias, setCarrocerias] = useState([]);
    const [TiposCargas, setTiposCargas] = useState([]);

    function BuscarUsuario() {
        // Armazena token do usuário
        const armazenaToken = localStorage.getItem('usuario-login').split('.')[1]
        // Descriptografa token
        const tokenDescriptografado = window.atob(armazenaToken).split(',')[2].split('"')[3];
        setIdUsuario(armazenaToken);
    }

function AdicionarVeiculo() {

        var formData = new FormData();

        const element = document.getElementById('arquivo')
        if (element != null) {
            const file = element.files[0]
            formData.append('arquivo', file, file.name)
        }


        formData.append('idUsuario', Placa);
        formData.append('idMarca', Marca);
        formData.append('idTipoVeiculo', TipoVeiculo);
        formData.append('idStatus', Status);
        formData.append('placa', Placa);
        formData.append('dataAquisicao', Data);
        formData.append('idCarroceria', IdCarroceria);
        //formData.append('idTipoCarga', Carga);

        try {
            axios({
                method: "post",
                url: "http://backend-saf-api.azurewebsites.net/api/Veiculos",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((resposta) => {
                    if (resposta.status === 200) {
                        console.log('Cadastrado');
                    }
                });

            //await axios.post('http://backend-saf-api.azurewebsites.net/api/Veiculos', {
            //    headers: { "Content-Type": "multipart/form-data" },
            //    data: formData,
            //}).then((resposta =>
            //    console.log(resposta.status)
            // ))
        } catch (error) {
            console.log(error)
        }
    }


    function BuscarForms() {

        axios.get("http://backend-saf-api.azurewebsites.net/api/Status")
            .then((response) => {
                if (response.status === 200) {
                    setTipoStatus(response.data)
                    console.log(TipoStatus)
                }
            })

        axios.get("http://backend-saf-api.azurewebsites.net/api/TipoVeiculos")
            .then((response) => {
                if (response.status === 200) {
                    setTipoVeiculos(response.data)
                    console.log(TipoVeiculos)
                }
            })

        axios.get("http://backend-saf-api.azurewebsites.net/api/Carroceria")
            .then((response) => {
                if (response.status === 200) {
                    setCarrocerias(response.data)
                    console.log(Carrocerias)
                }
            })

        axios.get("http://backend-saf-api.azurewebsites.net/api/TipoCargas")
            .then((response) => {
                if (response.status === 200) {
                    setTiposCargas(response.data)
                    console.log(TiposCargas);
                }
            })

        axios.get("http://backend-saf-api.azurewebsites.net/api/Marca")
            .then((response) => {
                if (response.status === 200) {
                    setMarcas(response.data)
                    console.log(Marcas);
                }
            })
    }

    useEffect(BuscarForms, BuscarUsuario, []);

    return (
        <div className="modal">
            <div className="wrapperModal">
                <div className="headerModal">
                    <p className="pHeaderModal">CADASTRO DE VEÍCULO</p>
                    <FontAwesomeIcon onClick={onClose} className="iconClose" icon={faClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudos">
                    <div className="conteudo">
                        <div className='imgCadastrar'><FontAwesomeIcon icon={faImage} color="white" size="5x" /></div>

                        <form method="post" encType="multipart/form-data" className='formularioCadastro' onSubmit={AdicionarVeiculo}>
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
                                    <select className='inputVeiculo selects' type='text' name='TipoVeiculo' required onChange={(e) => setTipoVeiculo(e.target.value)}>
                                        <option value='0' disabled selected>Tipo de veículo</option>
                                        {TipoVeiculos.map((tipoVeiculo) => {
                                            return (
                                                <option key={tipoVeiculo.idTipoVeiculo} value={tipoVeiculo.idTipoVeiculo}>
                                                    {tipoVeiculo.nomeTipoVeiculo}
                                                </option>
                                            )
                                        })}
                                    </select>
                                    <select className='inputVeiculo selects' type='text' name='carroceria' required onChange={(e) => setIdCarroceria(e.target.value)}>
                                        <option value='0' disabled selected>Carroceria</option>
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
                                    <button onClick={(e) => AdicionarVeiculo(e)} className='btn_cadastro' type='submit'><p className='pCadastro'>Cadastrar</p></button>
                                </div>
                            </div>
                        </form>
                    </div >
                </div >
            </div >
        </div >
    )

}