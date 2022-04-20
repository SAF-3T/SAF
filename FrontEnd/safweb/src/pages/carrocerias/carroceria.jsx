import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/headers/header';
import Sidebar2 from '../../components/sidebars/sidebar2';
import Footer from '../../components/footer';

import Modal from '../../components/modals/carrocerias/modalCarrocerias';

import { Link } from 'react-router-dom';

import '../../assets/css/carroceria.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

export default function ListarCarroceria() {
    const [ListaCarroceria, setListaCarroceria] = useState([]);

    function buscarCarroceria() {
        axios('http://localhost:5000/api/Carroceria', {
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
                        <button className="addCarroceria" type='submit' onClick={() => setIsModalVisible(true)}><FontAwesomeIcon className="iconPlus" icon={faPlus} color="#fff" size="lg" />Nova carroceria</button>{isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}></Modal>) : null}
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
                            <div className="iconesEtiquetaCarrocerias"/>
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
            </main >
            <Footer />
        </div >
    );
};