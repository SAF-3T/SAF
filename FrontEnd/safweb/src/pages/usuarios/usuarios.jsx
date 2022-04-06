import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/headers/header';
import Sidebar4 from '../../components/sidebars/sidebar4';
import Footer from '../../components/footer';

import { Link } from 'react-router-dom';

import '../../assets/css/usuarios.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function ListarUsuarios() {
     const [listaUsuarios, setListaUsuarios] = useState([]);

     function buscarUsuarios() {
         axios('http://localhost:5000/api/Usuarios', )
            .then(response => {
                if (response.status === 200) {
                    setListaUsuarios(response.data);
                    console.log(listaUsuarios)
                 }
             })
             .catch(erro => console.log(erro));
    };

    useEffect(buscarUsuarios, []);

    return (
        <div>
            <Header />
            <Sidebar4 />

            <main>
                <div className="wrapperVeiculos">
                    <p className="pVeiculo">Usuários</p>

                    <div className="input-e-btn">
                        <button className="addVeiculo" type='submit'><Link className='removerLink' to="/veiculos/cadastro/usuario"><FontAwesomeIcon className="iconPlus" icon={faPlus} color="#fff" size="lg" />Novo usuário</Link></button>
                        <div className="input-e-btn-2">
                            <input className='inputBusca' type="text" placeholder="Pesquisar" />
                            <button className='btnBuscar' type='submit'><p>Buscar</p></button>
                        </div>
                    </div>

                    {
                        listaUsuarios.map((usuario) => {
                            return(
                                <div className="cardVeiculo">
                        <div className="alinharEtiquetas">
                            <div className="imgVeiculo">
                                <img src={usuario.imagemUsuario} alt="" />
                            </div>
                            <div className="etiquetas">
                                <div className="etiqueta">
                                    <p className="nomeEtiqueta alinhar">{usuario.nome}</p>
                                </div>
                                <div className="etiqueta">
                                    <p className="nomeEtiqueta">{usuario.telefone}</p>
                                </div>
                                <div className="etiqueta">
                                    <p className="nomeEtiqueta">{usuario.cpf}</p>
                                </div>
                                {/* <div className="etiqueta">
                                    <p className="nomeEtiqueta">[status-veiculo]</p>
                                </div> */}
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