import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/headers/header';
import Sidebar1 from '../../components/sidebars/sidebar1';
import Footer from '../../components/footer';

import { Link } from 'react-router-dom';

import '../../assets/css/veiculos.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function listarVeiculos() {
    // const [listaMeusVeiculos, setListaMeusVeiculos] = useState([]);

    // function buscarMeusVeiculos() {
    //     axios('http://localhost:5000/api/Veiculos', {
    //         headers: {
    //             'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
    //         }
    //     })
    //         .then(response => {
    //             if (response.status === 200) {
    //                 setListaMeusVeiculos(response.data);
    //             }
    //         })
    //         .catch(erro => console.log(erro));
    // };

    // useEffect(buscarMeusVeiculos, []);

    return (
        <div>
            <Header />
            <Sidebar1 />

            <main>
                <div className="wrapperVeiculos">
                    <p className="pVeiculo">Veículos</p>

                    <div className="input-e-btn">
                        <button className="addVeiculo" type='submit'><Link className='removerLink' to="/veiculos/cadastro/veiculo"><FontAwesomeIcon className="iconPlus" icon={faPlus} color="#fff" size="lg" />Novo veículo</Link></button>
                        <div className="input-e-btn-2">
                            <input className='inputBusca' type="text" placeholder="Pesquisar" />
                            <button className='btnBuscar' type='submit'>Buscar</button>
                        </div>
                    </div>


                    <div className="cardVeiculo">
                        <div className="alinharEtiquetas">
                            <div className="imgVeiculo">
                                <img src="" alt="" />
                            </div>
                            <div className="etiquetas">
                                <div className="etiqueta">
                                    <p className="nomeEtiqueta alinhar">[nome-placa]</p>
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
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};