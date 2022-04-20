import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/headers/header';
import Sidebar4 from '../../components/sidebars/sidebar4';
import Footer from '../../components/footer';

// import Modal from '../../components/modal';

import { Link } from 'react-router-dom';

import '../../assets/css/usuarios.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function ListarUsuarios() {
    const [listaUsuarios, setListaUsuarios] = useState([]);

    function buscarUsuarios() {
        axios('http://localhost:5000/api/Usuarios',)
            .then(response => {
                if (response.status === 200) {
                    setListaUsuarios(response.data);
                    console.log(listaUsuarios)
                }
            })
            .catch(erro => console.log(erro));
    };

    useEffect(buscarUsuarios, []);

    // const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <div>
            <Sidebar4 />
            <Header />

            <main>
                <div className="wrapperUsuarios">
                    <p className="pUsuario">Usuários</p>

                    <div className="input-e-btn">
                        {/* <button className="addUsuario" type='submit' onClick={() => setIsModalVisible(true)}><FontAwesomeIcon className="iconPlus" icon={faPlus} color="#fff" size="lg" />Novo usuário</button>{isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}></Modal>) : null} */}
                        <div className="input-e-btn-2">
                            <input className='inputBusca' type="text" placeholder="Pesquisar" />
                            <button className='btnBuscar' type='submit'><p>Buscar</p></button>
                        </div>
                    </div>

                    <div className="cardCabecalhoUsuario">
                        <div className="alinharEtiquetasUsuariosCabecalho">
                            <div className="imgUsuario" />
                            <div className="etiquetasCabecalhoUsuarios">
                                <div className="etiquetaCabecalhoUsuario">
                                    <p className="nomeEtiquetaCabecalhoUsuario">Nome</p>
                                </div>
                                <div className="etiquetaCabecalhoUsuario">
                                    <p className="nomeEtiquetaCabecalhoUsuario">Telefone</p>
                                </div>
                                <div className="etiquetaCabecalhoUsuario">
                                    <p className="nomeEtiquetaCabecalhoUsuario">CPF</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        listaUsuarios.map((usuario) => {
                            return (
                                <div className="cardUsuario">
                                    <div className="alinharEtiquetasUsuarios">
                                        <div className="imgUsuario">
                                            <img src={usuario.imagemUsuario} alt="" />
                                        </div>
                                        <div className="etiquetasUsuarios">
                                            <div className="etiqueta">
                                                <p className="nomeEtiqueta">{usuario.nome}</p>
                                            </div>
                                            <div className="etiqueta">
                                                <p className="nomeEtiqueta">{usuario.telefone}</p>
                                            </div>
                                            <div className="etiqueta">
                                                <p className="nomeEtiqueta">{usuario.cpf}</p>
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
        </div>
    );
};