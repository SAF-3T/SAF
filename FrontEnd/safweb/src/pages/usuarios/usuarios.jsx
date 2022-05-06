import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/headers/header';
import Sidebar4 from '../../components/sidebars/sidebar4';
import Footer from '../../components/footer';

// import ModalAddUsuario from '../usuarios/modal/modalUsuario';
// import ModalEditUsuario from '../usuarios/modalEdit/modaEditUsuario';

import './usuarios.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

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
                    // Busca o array de usuários
                    const listaDeUsuarios = response.data;
                    console.log(response.data)

                    //Mapeia parametros
                    const mapearArrayResponse = listaDeUsuarios.map((parametro => { return (parametro.imagemUsuario) }))
                    console.log(mapearArrayResponse)

                    //Armazena response data em um array
                    // const armazenarArray = [mapearArrayResponse]
                    // console.log(armazenarArray) 

                    //Transforma em objeto JSON e mostra um array do parametro de imagens  
                    const armazenarParametroImg = JSON.stringify(mapearArrayResponse).split('[]')[0]
                    console.log(armazenarParametroImg)

                    //Função de filtro de imagem
                    function filtrarPorImagem(armazenarParametroImg) {
                        if (armazenarParametroImg === null)
                            return true
                        else
                            return false
                    }

                    //Filtra se tem ou não imagem dentro do array
                    const teste = armazenarParametroImg.filter((item,i) => item === null)
                    console.log(teste) 





                    //Caso não tenha foto 
                    // if (tamanhoArray.length == 11) { 
                    // console.log('não tem foto') 
                    //ImagemUsuario
                    // setImagem('Perfilpadrao.jpg')

                    //Caso tenha foto
                    // else {
                    //Identificar Nome do usuário
                    // console.log('tem foto')
                    // const nomeUsuario = tamanhoArray.filter(( imagem => "imagemUsuario"))
                    // console.log(nomeUsuario)
                    // setNome(nomeUsuario); 

                    // //Identificar Tel do usuario
                    // const telUsuario = formatoEmJSON.split(',')[5].split(':')[1].replace('"', "").split('"')[0] + ' ' + formatoEmJSON.split(',')[6].split(':')[1].replace('"', "").split('"')[0];
                    // // console.log(telUsuario)
                    // setTel(telUsuario);

                    // //Identificar CPF do usuario
                    // const cpfUsuario = formatoEmJSON.split(',')[7].split(':')[1].replace('"', "").split('"')[0]
                    // // console.log(cpfUsuario)
                    // setCPF(cpfUsuario);

                    // //Identificar Imagem usuario
                    // const Imagem = formatoEmJSON.split(',')[2].split(':')[1].replace('"', "").split('"')[0];
                    // // console.log(Imagem);
                    // setImagem(Imagem);

                }
            })
            .catch(erro => console.log(erro));
    };


    function deletar(id) {
        axios.delete('https://backend-saf-api.azurewebsites.net/api/Usuarios/Deletar' + id)
            .then(resposta => {
                if (resposta.status === 204) {
                    setListaUsuarios(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    };


    useEffect(buscarUsuarios, []);


    // const [isModalAddUsuarioVisible, setIsModalAddUsuarioVisible] = useState(false);
    // const [isModalEditUsuarioVisible, setIsModalEditUsuarioVisible] = useState(false);

    return (
        <div>
            <Sidebar4 />
            <Header />

            <main>
                <div className="wrapperUsuarios">
                    <p className="pUsuario">Usuários</p>

                    <div className="input-e-btn">
                        <button className='btnAddUsuario' type='submit' >
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

                    {
                        ListaUsuarios.map((usuario => {
                            return (
                                <div className="cardUsuario">
                                    <div className="conteudoUsuario">
                                        <div className="alinharEtiquetasUsuarios">
                                            <img src={usuario.imagemUsuario} className="imgUsuario" />
                                            <div className="etiquetasUsuarios">
                                                <div className="etiquetaUsuario">
                                                    <p className="nomeEtiquetaUsuario">{usuario.nome}</p>
                                                </div>
                                                <div className="etiquetaUsuario">
                                                    <p className="nomeEtiquetaUsuario">{usuario.telefone}</p>
                                                </div>
                                                <div className="etiquetaUsuario">
                                                    <p className="nomeEtiquetaUsuario">{usuario.cpf}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="iconesEtiquetaUsuarios">
                                            <FontAwesomeIcon className="iconPenToSquare" icon={faPenToSquare} style={{ cursor: 'pointer' }} size="2x" />
                                            <FontAwesomeIcon className="iconTrashCan" icon={faTrashCan} size="2x" />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )
                        )
                    }
                </div>
            </main >
            <Footer />
        </div >
    );
};