import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/headers/header';
import Sidebar3 from '../../components/sidebars/sidebar3';
import Footer from '../../components/footer';

import Modal from '../cargas/modal/modalCargas';

import './cargas.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

export default function ListarCarga() {
    const [ListaCarga, setListaCarga] = useState([]);

    function buscarCarga() {
        axios('http://backend-saf-api.azurewebsites.net/api/TipoCargas', {
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

    const [isModalVisible, setIsModalVisible] = useState(false);


    return (
        <div>
            <Sidebar3 />
            <Header />

            <main>
                <div className="wrapperCargas">
                    <p className="pCarga">Cargas</p>

                    <div className="input-e-btn">
                        <button className='btnAddCarga' type='submit' onClick={() => setIsModalVisible(true)}>
                            <div className="conteudoBtnAddCarga">
                                <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" />
                                <p className="pAddCarga">Nova carga</p>
                            </div>
                        </button>{isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}></Modal>) : null}

                        <div className="input-e-btn-2">
                            <input className='inputBusca' type="text" placeholder="Pesquisar" />
                            <button className='btnBuscar' type='submit'><p>Buscar</p></button>
                        </div>
                    </div>

                    <div className="cardCabecalhoCargas">
                        <div className="alinharCabecalhoEtiquetasCargas">
                            <div className="etiquetaCabecalhoCargas">
                                <p className="nomeEtiquetaCabecalhoCarga">Carga</p>
                            </div>
                            <div className="iconesCabecalhoEtiquetaCargas" />
                        </div>
                    </div>

                    {
                        ListaCarga.map((carga) => {
                            return (
                                <div className="cardCargas">
                                    <div className="alinharEtiquetasCargas">
                                        <div className="etiquetaCargas">
                                            <p className="nomeEtiquetaCarga">{carga.nomeTipoCarga}</p>
                                        </div>
                                        <div className="iconesEtiquetaCargas">
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
        </div>
    );
};