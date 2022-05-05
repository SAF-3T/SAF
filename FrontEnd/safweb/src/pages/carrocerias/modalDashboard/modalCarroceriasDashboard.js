import { useState, useEffect } from 'react';

import React from 'react';

import axios from 'axios';

import '../modalDashboard/modalCarroceriasDashboard.css';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { }, children }) => {

    const [ListarCarroceria, setListarCarroceria] = useState([]);
    const [NovoIdTipoCarroceria, setNovoIdTipoCarroceria] = useState('');
    const [NovaCubagem, setNovaCubagem] = useState('');
    const [NovoPeso, setNovoPeso] = useState('');

    const notyf = new Notyf();

    function ListaCarroceria() {
        axios('http://backend-saf-api.azurewebsites.net/api/Carroceria')
            .then((response) => {
                if (response.status === 200) {
                    setListarCarroceria(response.data)
                    console.log('sla')
                }
            })
    }

    function CadastrarCarroceria(event) {

        event.preventDefault();

        axios.post('http://backend-saf-api.azurewebsites.net/api/Carroceria', {
            idTipoCarga: 6,
            idTipoCarroceria: NovoIdTipoCarroceria,
            cubagem: NovaCubagem + 'm³',
            peso: NovoPeso + 'kg'
        })
            .then((resposta) => {
                if (resposta.status === 201) {
                    console.log('cadastro porra');
                    setNovaCubagem('');
                    setNovoPeso('');
                    notyf.success(
                        {
                            message: 'Carroceria cadastrada',
                            duration: 1000,
                            position: {
                                x: 'right',
                                y: 'top',
                            }
                        }
                    );
                    onClose()
                }
            })

    }

    useEffect(ListaCarroceria, []);
    return (
        <div className="modalCarroceria">
            <div className="wrapperModalCarroceriasDashboard">
                <div className="headerModal">
                    <p className="pHeaderModal">CADASTRO DE CARROCERIA</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudosCarrocerias">
                    <form className='conteudoCarroceriaModal' onSubmit={CadastrarCarroceria}>
                        <div className="inputsCarroceria" >
                            <select className='inputSelect' type='text' placeholder="Tipo de carroceria" name='carroceria' required onChange={(e) => setNovoIdTipoCarroceria(e.target.value)}>
                                <option value='0' disabled selected >Tipo da carroceria</option>
                                {ListarCarroceria.map((tipo) => {
                                    return (
                                        <option value={tipo.idTipoCarroceria}>
                                            {tipo.idTipoCarroceriaNavigation.nomeTipoCarroceria}
                                        </option>
                                    )
                                })}
                            </select>
                            <input className='inputCarroceria1' type='number' placeholder="Cubagem (m³)" name='carroceria' required onChange={(e) => setNovaCubagem(e.target.value)} />
                            <input className='inputCarroceria1' type='number' placeholder="Peso (kg)" name='carroceria' required onChange={(e) => setNovoPeso(e.target.value)} />
                        </div>
                        <button className='btn_cadastroCarroceria' type='submit'><p className='pBtnCadastroCarroceria'>Cadastrar</p></button>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default Modal;