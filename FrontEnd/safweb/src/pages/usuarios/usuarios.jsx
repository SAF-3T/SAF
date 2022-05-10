import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/headers/header';
import Sidebar4 from '../../components/sidebars/sidebar4';
import Footer from '../../components/footer';

import ModalAddUsuario from '../usuarios/modal/modalUsuario';
// import ModalEditUsuario from '../usuarios/modalEdit/modaEditUsuario';

import './usuarios.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function ListarUsuarios() {
    const [ListaUsuarios, setListaUsuarios] = useState([]);
    // const [Imagem, setImagem] = useState('');
    // const [Nome, setNome] = useState('');
    // const [CPF, setCPF] = useState('');
    // const [Tel, setTel] = useState('');

    function buscarUsuarios() {

        axios('http://backend-saf-api.azurewebsites.net/api/Usuarios')
            .then(response => {
                if (response.status === 200) {
                    setListaUsuarios(response.data)
                }
            })
            .catch(erro => console.log(erro));
    };
    

    const notyf = new Notyf();

    function DeletarUsuario(idUsuario) {
        axios.delete('http://backend-saf-api.azurewebsites.net/api/Usuarios/Deletar/' + idUsuario)
            .then(resposta => {
                if (resposta.status === 204) {
                    notyf.success(
                        {
                            message: 'Usuário excluída com êxito',
                            duration: 1000,
                            position: {
                                x: 'right',
                                y: 'top',
                            }
                        }
                    );
                }
            })
            .catch(erro => console.log(erro))
    };

    useEffect(buscarUsuarios, [ListaUsuarios]);
    
    const [isModalAddUsuarioVisible, setIsModalAddUsuarioVisible] = useState(false);
    // const [isModalEditUsuarioVisible, setIsModalEditUsuarioVisible] = useState(false);

    return (
        <div>
            <Sidebar4 />
            <Header />

            <main>
                <div className="wrapperUsuarios">
                    <p className="pUsuario">Usuários</p>

                    <div className="input-e-btn">
                        <button className='btnAddUsuario' type='submit' onClick={() => setIsModalAddUsuarioVisible(true)}>
                            <div className="conteudoBtnAddUsuario">
                                <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" />
                                <p className="pAddUsuario">Novo usuário</p>
                            </div>
                        </button>
                        <div className="input-e-btn-2">
                            <input className='inputBusca' type="text" />
                            <button className='btnBuscar' type='submit'><p>Buscar</p></button>
                        </div>
                    </div>
                    <div className="cardCabecalhoUsuario">
                        <div className="conteudoCabecalhoUsuario">
                            <div className="alinharEtiquetasUsuariosCabecalho">
                                <div className="imgCabecalhoUsuario" />
                                <div className="etiquetasCabecalhoUsuarios">
                                    <div className="etiquetaCabecalhoUsuario">
                                        <p className="nomeCabecalhoEtiquetaUsuario">Nome</p>
                                    </div>
                                    <div className="etiquetaCabecalhoUsuario">
                                        <p className="nomeCabecalhoEtiquetaUsuario">Telefone</p>
                                    </div>
                                    <div className="etiquetaCabecalhoUsuario">
                                        <p className="nomeCabecalhoEtiquetaUsuario">CPF</p>
                                    </div>
                                </div>
                            </div>
                            <div className="iconesEtiquetaUsuarios" />
                        </div>
                    </div>
                   {isModalAddUsuarioVisible ? (<ModalAddUsuario onClose={() => setIsModalAddUsuarioVisible(false)}></ModalAddUsuario>) : null}

                    {
                        ListaUsuarios.map((usuario => {
                            return (
                                <div className="cardUsuario">
                                    <div className="conteudoUsuario">
                                        <div className="alinharEtiquetasUsuarios">
                                            {
                                                usuario.imagemUsuario != null ?
                                                    <img src={"http://backend-saf-api.azurewebsites.net/Img/" + usuario.imagemUsuario} className="imgUsuario" />
                                                    :
                                                    <img src={"http://backend-saf-api.azurewebsites.net/Img/Perfilpadrao.jpg"} className="imgUsuario" />
                                            }

                                            <div className="etiquetasUsuarios">
                                                <div className="etiquetaUsuario">
                                                    <p className="nomeEtiquetaUsuario">{usuario.nome}</p>
                                                </div>
                                                <div className="etiquetaUsuario">
                                                    <p className="nomeEtiquetaUsuario">{usuario.telefone}</p>
                                                </div>
                                                <div className="etiquetaUsuario">
                                                    <p className="nomeEtiquetaUsuario ">{usuario.cpf}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="iconesEtiquetaUsuarios">
                                            <FontAwesomeIcon className="iconPenToSquare" icon={faPenToSquare} style={{ cursor: 'pointer' }} size="2x" />
                                            <FontAwesomeIcon className="iconTrashCan" style={{ cursor: 'pointer' }} icon={faTrashCan} size="2x"
                                                onClick={() => DeletarUsuario(usuario.idUsuario)} />
                                        </div>
                                    </div>
                                </div>
                            )
                        }))}
                </div>
            </main >
            <Footer />
        </div >
    );
};