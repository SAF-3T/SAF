import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/headers/header';
import Sidebar3 from '../../components/sidebars/sidebar3';
import Footer from '../../components/footer';

import { Link } from 'react-router-dom';

import '../../assets/css/cargas.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

export default function ListarCarga() {
    const [ListaCarga, setListaCarga] = useState([]);

    function buscarCarga() {
        axios('http://localhost:5000/api/TipoCargas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setListaCarga(response.data);
                }
            })
            .catch(erro => console.log(erro));
    };

    useEffect(buscarCarga, []);

    return (
        <div>
            <Header />
            <Sidebar3 />

            <main>
                <div className="wrapperVeiculos">
                    <p className="pVeiculo">Cargas</p>

                    <div className="input-e-btn">
                        <button className="addVeiculo" type='submit'><Link className='removerLink' to="/veiculos/cadastro/carga"><FontAwesomeIcon className="iconPlus" icon={faPlus} color="#fff" size="lg" />Nova carga</Link></button>
                        <div className="input-e-btn-2">
                            <input className='inputBusca' type="text" placeholder="Pesquisar" />
                            <button className='btnBuscar' type='submit'><p>Buscar</p></button>
                        </div>
                    </div>

                    {
                        ListaCarga.map((carga) => {
                            return (
                                <div className="cardVeiculoCargas1">
                                    <div className="alinharEtiquetasCargas">
                                        <div className="etiquetaCargas">
                                            <div className="etiquetaCargas">
                                                <p className="nomeEtiquetaCargas">{carga.nomeTipoCarga}</p>
                                            </div>
                                        </div>
                                        <div className="iconesEtiquetaCargas">
                                            <Link className='removerLink' to="/veiculos/atualizar/carroceria"><FontAwesomeIcon className="iconPenToSquare" icon={faPenToSquare} size="2x" /></Link>
                                            <FontAwesomeIcon className="iconTrashCan" icon={faTrashCan} size="2x" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {/* <div className="cardVeiculoCargas2">
                        <div className="alinharEtiquetasCargas">
                            <div className="etiquetaCargas">
                                <div className="etiquetaCargas">
                                    <p className="nomeEtiquetaCargas">[tipo-carga]</p>
                                </div>
                            </div>
                            <div className="iconesEtiquetaCargas">
                                <Link className='removerLink' to="/veiculos/atualizar/carroceria"><FontAwesomeIcon className="iconPenToSquare" icon={faPenToSquare} size="2x" /></Link>
                                <FontAwesomeIcon className="iconTrashCan" icon={faTrashCan} size="2x" />
                            </div>
                        </div>
                    </div>

                    <div className="cardVeiculoCargas3">
                        <div className="alinharEtiquetasCargas">
                            <div className="etiquetaCargas">
                                <div className="etiquetaCargas">
                                    <p className="nomeEtiquetaCargas">[tipo-carga]</p>
                                </div>
                            </div>
                            <div className="iconesEtiquetaCargas">
                                <Link className='removerLink' to="/veiculos/atualizar/carroceria"><FontAwesomeIcon className="iconPenToSquare" icon={faPenToSquare} size="2x" /></Link>
                                <FontAwesomeIcon className="iconTrashCan" icon={faTrashCan} size="2x" />
                            </div>
                        </div>
                    </div>

                    <div className="cardVeiculoCargas4">
                        <div className="alinharEtiquetasCargas">
                            <div className="etiquetaCargas">
                                <div className="etiquetaCargas">
                                    <p className="nomeEtiquetaCargas">[tipo-carga]</p>
                                </div>
                            </div>
                            <div className="iconesEtiquetaCargas">
                                <Link className='removerLink' to="/veiculos/atualizar/carroceria"><FontAwesomeIcon className="iconPenToSquare" icon={faPenToSquare} size="2x" /></Link>
                                <FontAwesomeIcon className="iconTrashCan" icon={faTrashCan} size="2x" />
                            </div>
                        </div>
                    </div> */}

                </div>
            </main>

            <Footer />
        </div>
    );
};