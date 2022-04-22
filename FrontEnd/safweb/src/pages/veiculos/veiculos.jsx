import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/headers/header';
import Sidebar1 from '../../components/sidebars/sidebar1';
import Footer from '../../components/footer';

import Modal from '../veiculos/modal/modalVeiculo';

import './veiculos.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

export default function ListarVeiculos() {
    const [ListaVeiculos, setListaVeiculos] = useState([]);

    function buscarVeiculos() {
        axios('https://backend-saf-api.azurewebsites.net/api/Veiculos', {
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
            <Sidebar1 />
            <Header />

            <main>
                <div className="wrapperVeiculos">
                    <p className="pVeiculo">Veículos</p>

                    <div className="input-e-btn">
                        <button className='btnAddVeiculo' type='submit' onClick={() => setIsModalVisible(true)}>
                            <div className="conteudoBtnAddVeiculo">
                                <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" />
                                <p className="pAddVeiculo">Novo veículo</p>
                            </div>
                        </button>{isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}></Modal>) : null}

                        <div className="input-e-btn-2">
                            <input className='inputBusca' type="text" placeholder="Pesquisar" />
                            <button className='btnBuscar' type='submit'>Buscar</button>
                        </div>
                    </div>

                    <div className="cardCabecalhoVeiculo">
                        <div className="conteudoCabecalhoVeiculo">
                            <div className="alinharEtiquetasCabecalho">
                                <div className="imgCabecalhoVeiculo" />
                                <div className="etiquetasCabecalhoVeiculos">
                                    <div className="etiquetaCabecalhoVeiculo">
                                        <div className="nomeCabecalhoEtiqueta">Placa</div>
                                    </div>
                                    <div className="etiquetaCabecalhoVeiculo">
                                        <p className="nomeCabecalhoEtiqueta">Marca</p>
                                    </div>
                                    <div className="etiquetaCabecalhoVeiculo">
                                        <div className="nomeCabecalhoEtiqueta">Data aquisição</div>
                                    </div>
                                    <div className="etiquetaCabecalhoVeiculo">
                                        <p className="nomeCabecalhoEtiqueta">Status</p>
                                    </div>
                                </div>
                                <div className="iconesEtiquetaVeiculos" />
                            </div>
                        </div>
                    </div>
                    {
                        ListaVeiculos.map((veiculo) => {
                            return (
                                <div className="cardVeiculo">
                                    <div className="conteudoVeiculo">
                                        <div className="alinharEtiquetas">
                                            <div className="imgVeiculo" />
                                            <div className="etiquetasVeiculos">
                                                <div className="etiquetaVeiculo">
                                                    <div className="nomeEtiqueta">{veiculo.placa}</div>
                                                </div>
                                                <div className="etiquetaVeiculo">
                                                    <p className="nomeEtiqueta">Scania</p>
                                                </div>
                                                <div className="etiquetaVeiculo">
                                                    <div className="nomeEtiqueta">{Intl.DateTimeFormat("pt-BR", {
                                                        year: 'numeric', month: 'numeric', day: 'numeric',
                                                        hour: 'numeric', minute: 'numeric', hour12: false
                                                    }).format(new Date(veiculo.dataAquisicao))}</div>
                                                </div>
                                                <div className="etiquetaVeiculo">
                                                    <p className="nomeEtiqueta">Na garagem</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="iconesEtiquetaVeiculos">
                                            <FontAwesomeIcon className="iconPenToSquare" icon={faPenToSquare} size="2x" />
                                            <FontAwesomeIcon className="iconTrashCan" icon={faTrashCan} size="2x" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </main>
            <Footer />
        </div >
    );
};