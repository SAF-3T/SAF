import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';

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
            <Sidebar />

            <main>
                <div className="wrapperVeiculos">
                    <p className="pVeiculo">Veículos</p>

                    <button className="addVeiculo" type='submit'><FontAwesomeIcon className="iconPlus" icon={faPlus} color="#fff" size="lg" />Novo veículo</button>

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
                                    <p className="nomeEtiqueta">[nome-placa]</p>
                                </div>
                                <div className="etiqueta">
                                    <p className="nomeEtiqueta">[nome-placa]</p>
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