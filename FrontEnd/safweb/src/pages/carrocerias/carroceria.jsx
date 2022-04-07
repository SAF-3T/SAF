import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/headers/header';
import Sidebar2 from '../../components/sidebars/sidebar2';
import Footer from '../../components/footer';

import { Link } from 'react-router-dom';

import '../../assets/css/carroceria.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

export default function ListarCarrocerias() {
    const [ListaCarrocerias, setListaCarrocerias] = useState([]);

    function buscarCarrocerias() {
        axios('http://localhost:5000/api/Carrocerias', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setListaCarrocerias(response.data);
                }
            })
            .catch(erro => console.log(erro));
    };

    useEffect(buscarCarrocerias, []);


    // excluirCarroceria = (carroceria) => {

    //     axios.delete('http://localhost:5000/api/Carrocerias/' + TipoCarroceria.idTipoCarroceria, {
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
    //         },
    //     })
    //         .then((resposta) => {
    //             if (resposta.status === 204) {
    //                 // console.log(
    //                 //     'Tipo de Evento ' + tipoEvento.idTipoEvento + ' foi excluído!',
    //                 // );
    //             }
    //         })

    //         .catch((erro) => console.log(erro))

    //         .then(this.buscarCarrocerias);
    // };

    return (
        <div>
            <Header />
            <Sidebar2 />

            <main>
                <div className="wrapperVeiculos">
                    <p className="pVeiculo">Carrocerias</p>

                    <div className="input-e-btn">
                        <button className="addVeiculo" type='submit'><Link className='removerLink' to="/veiculos/cadastro/usuario"><FontAwesomeIcon className="iconPlus" icon={faPlus} color="#fff" size="lg" />Nova carroceria</Link></button>
                        <div className="input-e-btn-2">
                            <input className='inputBusca' type="text" placeholder="Pesquisar" />
                            <button className='btnBuscar' type='submit'><p>Buscar</p></button>
                        </div>
                    </div>

                    <div className="cardVeiculoCarrocerias">
                        <div className="alinharEtiquetasCarrocerias">
                            <div className="etiquetasCarrocerias">
                                <div className="etiquetaCarrocerias">
                                    <div className="etiquetaCarrocerias">
<<<<<<< HEAD
                                        {
                                            ListarCarrocerias.map((carroceria) => {
                                                <p className="nomeEtiquetaCargas">{carroceria.nome}</p>
                                            })
                                        }
=======
                                        <p className="nomeEtiquetaCarrocerias">[nome-carroceria] </p>
>>>>>>> b7481f4eeb07bc857261d64e2a86a559ab4f9071
                                    </div>
                                </div>
                                <div className="etiquetaCarrocerias">
                                    <div className="etiquetaCarrocerias">
                                        {
                                            ListarCarrocerias.map((carroceria) => {
                                                <p className="nomeEtiquetaCargas">{carroceria.cubagem}</p>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="etiquetaCarrocerias">
                                    <div className="etiquetaCarrocerias">
                                        {
                                            ListarCarrocerias.map((carroceria) => {
                                                <p className="nomeEtiquetaCargas">{carroceria.peso}</p>
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

                    <div className="cardVeiculoCarrocerias">
                        <div className="alinharEtiquetasCarrocerias">
                            <div className="etiquetasCarrocerias">
                                <div className="etiquetaCarrocerias">
                                    <div className="etiquetaCarrocerias">
<<<<<<< HEAD
                                        {
                                            ListarCarrocerias.map((carroceria) => {
                                                <p className="nomeEtiquetaCargas">{carroceria.nome}</p>
                                            })
                                        }
=======
                                        <p className="nomeEtiquetaCarrocerias">[nome-carroceria] </p>
>>>>>>> b7481f4eeb07bc857261d64e2a86a559ab4f9071
                                    </div>
                                </div>
                                <div className="etiquetaCarrocerias">
                                    <div className="etiquetaCarrocerias">
                                        {
                                            ListarCarrocerias.map((carroceria) => {
                                                <p className="nomeEtiquetaCargas">{carroceria.cubagem}</p>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="etiquetaCarrocerias">
                                    <div className="etiquetaCarrocerias">
                                        {
                                            ListarCarrocerias.map((carroceria) => {
                                                <p className="nomeEtiquetaCargas">{carroceria.peso}</p>
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

                    <div className="cardVeiculoCarrocerias">
                        <div className="alinharEtiquetasCarrocerias">
                            <div className="etiquetasCarrocerias">
                                <div className="etiquetaCarrocerias">
                                    <div className="etiquetaCarrocerias">
<<<<<<< HEAD
                                        {
                                            ListarCarrocerias.map((carroceria) => {
                                                <p className="nomeEtiquetaCargas">{carroceria.nome}</p>
                                            })
                                        }
=======
                                        <p className="nomeEtiquetaCarrocerias">[nome-carroceria] </p>
>>>>>>> b7481f4eeb07bc857261d64e2a86a559ab4f9071
                                    </div>
                                </div>
                                <div className="etiquetaCarrocerias">
                                    <div className="etiquetaCarrocerias">
                                        {
                                            ListarCarrocerias.map((carroceria) => {
                                                <p className="nomeEtiquetaCargas">{carroceria.cubagem}</p>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="etiquetaCarrocerias">
                                    <div className="etiquetaCarrocerias">
                                        {
                                            ListarCarrocerias.map((carroceria) => {
                                                <p className="nomeEtiquetaCargas">{carroceria.peso}</p>
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
                </div>
            </main >
            <Footer />
        </div >
    );
};