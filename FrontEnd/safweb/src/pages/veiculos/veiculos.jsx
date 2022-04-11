import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/headers/header';
import Sidebar1 from '../../components/sidebars/sidebar1';
import Footer from '../../components/footer';

import Modal from '../../components/modal';

import { Link } from 'react-router-dom';

import '../../assets/css/veiculos.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function ListarVeiculos() {
    const [ListaVeiculos, setListaVeiculos] = useState([]);

    function buscarVeiculos() {
        axios('http://localhost:5000/api/Veiculos', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setListaVeiculos(response.data);
                }
            })
            .catch(erro => console.log(erro));
    };

    useEffect(buscarVeiculos, []);

    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <div>
            <Header />
            <Sidebar1 />

            <main>
                <div className="wrapperVeiculos">
                    <p className="pVeiculo">Veículos</p>

                    <div className="input-e-btn">
                        <button className="addVeiculo" type='submit' onClick={() => setIsModalVisible(true)}><Link className='removerLink' to="/veiculos/cadastro/veiculo"><FontAwesomeIcon className="iconPlus" icon={faPlus} color="#fff" size="lg" />Novo veículo</Link></button>{isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}></Modal>) : null}
                        <div className="input-e-btn-2">
                            <input className='inputBusca' type="text" placeholder="Pesquisar" />
                            <button className='btnBuscar' type='submit'>Buscar</button>
                        </div>
                    </div>


                    {
                        ListaVeiculos.map((veiculo) => {
                            return (
                                <div className="cardVeiculo">
                                    <div className="alinharEtiquetas">
                                        <div className="imgVeiculo">
                                            <img src="" alt="" />
                                        </div>
                                        <div className="etiquetas">
                                            <div className="etiqueta">
                                                <p className="nomeEtiqueta">{veiculo.placa}</p>
                                            </div>
                                            <div className="etiqueta">
                                                <p className="nomeEtiqueta">Scania</p>
                                            </div>
                                            <div className="etiqueta">
                                                <p className="nomeEtiqueta">{Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: false
                                                }).format(new Date(veiculo.dataAquisicao))}</p>
                                            </div>
                                            <div className="etiqueta">
                                                <p className="nomeEtiqueta">Na garagem</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {/* <div className="cardVeiculo">
                        <div className="alinharEtiquetas">
                            <div className="imgVeiculo">
                                <img src="" alt="" />
                            </div>
                            <div className="etiquetas">
                                <div className="etiqueta">
                                    <p className="nomeEtiqueta">[nome-placa]</p>
                                </div>
                                <div className="etiqueta">
                                    <p className="nomeEtiqueta">[marca-veiculo]</p>
                                </div>
                                <div className="etiqueta">
                                    <p className="nomeEtiqueta">[data-aquisicao]</p>
                                </div>
                                <div className="etiqueta">
                                    <p className="nomeEtiqueta">[status-veiculo]</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cardVeiculo">
                        <div className="alinharEtiquetas">
                            <div className="imgVeiculo">
                                <img src="" alt="" />
                            </div>
                            <div className="etiquetas">
                                <div className="etiqueta">
                                    <p className="nomeEtiqueta">[nome-placa]</p>
                                </div>
                                <div className="etiqueta">
                                    <p className="nomeEtiqueta">[marca-veiculo]</p>
                                </div>
                                <div className="etiqueta">
                                    <p className="nomeEtiqueta">[data-aquisicao]</p>
                                </div>
                                <div className="etiqueta">
                                    <p className="nomeEtiqueta">[status-veiculo]</p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </main>

            <Footer />
        </div>
    );
};