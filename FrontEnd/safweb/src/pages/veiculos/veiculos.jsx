import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/headers/header';
import Sidebar1 from '../../components/sidebars/sidebar1';
import Footer from '../../components/footer';

import Modal from '../../components/modals/veiculos/modalVeiculo';

import { Link } from 'react-router-dom';

import '../../assets/css/veiculos.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

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
            <Sidebar1 />
            <Header />

            <main>
                <div className="wrapperVeiculos">
                    <p className="pVeiculo">Veículos</p>

                    <div className="input-e-btn">
                        <button className="addVeiculo" type='submit' onClick={() => setIsModalVisible(true)}><FontAwesomeIcon className="iconPlus" icon={faPlus} color="#fff" size="lg" />Novo veículo</button>{isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}></Modal>) : null}
                        <div className="input-e-btn-2">
                            <input className='inputBusca' type="text" placeholder="Pesquisar" />
                            <button className='btnBuscar' type='submit'>Buscar</button>
                        </div>
                    </div>


                    <div className="cabecalhoVeiculo">
                        <div className="imgCabecalhoVeiculo" />
                        <div className="alinharEtiquetasCabecalho">
                            <div className="etiquetasVeiculos">
                                <div className="etiquetaCabecalhoVeiculo">
                                    <div className="nomeCabecalhoEtiqueta">Placa</div>
                                </div>
                                <div className="etiquetaCabecalhoVeiculo">
                                    <div className="nomeCabecalhoEtiqueta">Marca</div>
                                </div>
                                <div className="etiquetaCabecalhoVeiculo">
                                    <div className="nomeCabecalhoEtiqueta">Data de Aquisição</div>
                                </div>
                                <div className="etiquetaCabecalhoVeiculo">
                                    <div className="nomeCabecalhoEtiqueta">Status</div>
                                </div>
                                <div className="iconesCabecalhoVeiculos">
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        ListaVeiculos.map((veiculo) => {
                            return (
                                <div className="cardVeiculo">
                                    <div className="conteudoVeiculo">
                                        <div className="imgVeiculo">
                                            <img src="" alt="" />
                                        </div>
                                        <div className="alinharEtiquetas">
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
                                                <div className="iconesEtiquetaCargas">
                                                    <FontAwesomeIcon className="iconPenToSquare" icon={faPenToSquare} size="2x" />
                                                    <FontAwesomeIcon className="iconTrashCan" icon={faTrashCan} size="2x" />
                                                </div>
                                            </div>
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