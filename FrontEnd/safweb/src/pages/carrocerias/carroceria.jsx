import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/headers/header';
import Sidebar2 from '../../components/sidebars/sidebar2';
import Footer from '../../components/footer';

import Modal from './modal/modalCarrocerias';

import './carroceria.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

export default function ListarCarroceria() {
    const [ListaCarroceria, setListaCarroceria] = useState([]);

    function buscarCarroceria() {
        axios('http://backend-saf-api.azurewebsites.net/api/Carroceria', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setListaCarroceria(response.data);
                }
            })
            .catch(erro => console.log(erro));
    };

    useEffect(buscarCarroceria, []);

    const [isModalVisible, setIsModalVisible] = useState(false);


    return (
        <div>
            <Sidebar2 />
            <Header />

            <main>
                <div className="wrapperCarrocerias">
                    <p className="pCarroceria">Carrocerias</p>

                    <div className="input-e-btn">
                        <button className='btnAddCarroceria' type='submit' onClick={() => setIsModalVisible(true)}>
                            <div className="conteudoBtnAddCarroceria">
                                <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" />
                                <p className="pAddCarroceria">Nova carroceria</p>
                            </div>
                        </button>{isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}></Modal>) : null}

                        <div className="input-e-btn-2">
                            <input className='inputBusca' type="text" placeholder="Pesquisar" />
                            <button className='btnBuscar' type='submit'><p>Buscar</p></button>
                        </div>
                    </div>

                    <div className="cardCabecalhoCarroceria">
                        <div className="conteudoCabecalhoCarroceria">
                            <div className="alinharEtiquetasCabecalhoCarroceria">
                                <div className="etiquetasCabecalhoCarrocerias">
                                    <div className="etiquetaCabecalhoCarroceria">
                                        <div className="nomeCabecalhoEtiquetaCarrocerias">Carroceria</div>
                                    </div>
                                    <div className="etiquetaCabecalhoCarroceria">
                                        <div className="nomeCabecalhoEtiquetaCarrocerias">Cubagem</div>
                                    </div>
                                    <div className="etiquetaCabecalhoCarroceria">
                                        <div className="nomeCabecalhoEtiquetaCarrocerias">Peso</div>
                                    </div>
                                </div>
                            </div>
                            <div className="iconesEtiquetaCarrocerias" />
                        </div>
                    </div>

                    {
                        ListaCarroceria.map((carroceria) => {
                            return (
                                <div className="cardCarrocerias">
                                    <div className="conteudoCarroceria">
                                        <div className="alinharEtiquetasCarrocerias">
                                            <div className="etiquetasCarrocerias">
                                                <div className="etiquetaCarrocerias">
                                                    <p className="nomeEtiquetaCarrocerias">{carroceria.idTipoCarroceriaNavigation.nomeTipoCarroceria}</p>
                                                </div>
                                                <div className="etiquetaCarrocerias">
                                                    <p className="nomeEtiquetaCarrocerias">{carroceria.cubagem}</p>
                                                </div>
                                                <div className="etiquetaCarrocerias">
                                                    <p className="nomeEtiquetaCarrocerias">{carroceria.peso}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="iconesEtiquetaCarrocerias">
                                            <FontAwesomeIcon className="iconPenToSquare" icon={faPenToSquare} size="2x" />
                                            <FontAwesomeIcon className="iconTrashCan" icon={faTrashCan} size="2x" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </main >
            <Footer />
        </div >
    );
};