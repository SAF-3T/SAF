import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/headers/header';
import Sidebar3 from '../../components/sidebars/sidebar3';
import Footer from '../../components/footer';

// import Modal from '../../components/modal';

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

    // const [isModalVisible, setIsModalVisible] = useState(false);


    return (
        <div>
            <Sidebar3 />
            <Header />

            <main>
                <div className="wrapperCargas">
                    <p className="pCarga">Cargas</p>

                    <div className="input-e-btn">
                        {/* <button className="addCarga" type='submit' onClick={() => setIsModalVisible(true)}><FontAwesomeIcon className="iconPlus" icon={faPlus} color="#fff" size="lg" />Nova carga</button>{isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}></Modal>) : null} */}
                        <div className="input-e-btn-2">
                            <input className='inputBusca' type="text" placeholder="Pesquisar" />
                            <button className='btnBuscar' type='submit'><p>Buscar</p></button>
                        </div>
                    </div>

                    {
                        ListaCarga.map((carga) => {
                            return (
                                <div className="cardCargas">
                                    <div className="alinharEtiquetasCargas">
                                        <div className="etiquetaCargas">
                                            <p className="nomeEtiqueta">{carga.nomeTipoCarga}</p>
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
                </div>
            </main>

            <Footer />
        </div>
    );
};