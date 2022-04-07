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

export default function ListarCargas() {
    const [ListaCargas, setListaCargas] = useState([]);

    function buscarCargas() {
        axios('http://localhost:5000/api/Cargas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setListaCargas(response.data);
                }
            })
            .catch(erro => console.log(erro));
    };

    useEffect(buscarCargas, []);

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


                    <div className="cardVeiculoCargas1">
                        <div className="alinharEtiquetasCargas">
                            <div className="etiquetaCargas">
                                <div className="etiquetaCargas">
                                    {
                                        ListarCargas.map((cargas) => {
                                            <p className="nomeEtiquetaCargas">{cargas.nome}</p>
                                        })
                                    }
                                </div>
                            </div>
<<<<<<< HEAD

=======
>>>>>>> b7481f4eeb07bc857261d64e2a86a559ab4f9071
                            <div className="iconesEtiquetaCargas">
                                <Link className='removerLink' to="/veiculos/atualizar/carroceria"><FontAwesomeIcon className="iconPenToSquare" icon={faPenToSquare} size="2x" /></Link>
                                <FontAwesomeIcon className="iconTrashCan" icon={faTrashCan} size="2x" />
                            </div>
                        </div>
                    </div>

                    <div className="cardVeiculoCargas2">
                        <div className="alinharEtiquetasCargas">
                            <div className="etiquetaCargas">
                                <div className="etiquetaCargas">
                                    {
                                        ListarCargas.map((cargas) => {
                                            <p className="nomeEtiquetaCargas">{cargas.nome}</p>
                                        })
                                    }
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
                                    {
                                        ListarCargas.map((cargas) => {
                                            <p className="nomeEtiquetaCargas">{cargas.nome}</p>
                                        })
                                    }
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
                                    {
                                        ListarCargas.map((cargas) => {
                                            <p className="nomeEtiquetaCargas">{cargas.nome}</p>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="iconesEtiquetaCargas">
                                <Link className='removerLink' to="/veiculos/atualizar/carroceria"><FontAwesomeIcon className="iconPenToSquare" icon={faPenToSquare} size="2x" /></Link>
                                <FontAwesomeIcon className="iconTrashCan" icon={faTrashCan} size="2x" />
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};