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
import { useUpdateEffect } from 'rsuite/esm/utils';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function ListarUsuarios() {
    const [ListaUsuarios, setListaUsuarios] = useState([]);
    const [ListaCPF] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [Pesquisa, setPesquisa] = useState('');

    function buscarUsuarios() {

        axios('http://backend-saf-api.azurewebsites.net/api/Usuarios')
            .then(response => {
                if (response.status === 200) {
                    setListaUsuarios(response.data)
                }
            })
            .catch(erro => console.log(erro));
    };

    function PesquisaCPF() {

        if (isSearch === false) {
            //Para criar a lista de placas
            for (let i = 0; i < ListaUsuarios.length; i++) {

                //Para puxar cada veiculo da lista
                const objetoUsuario = ListaUsuarios[i];

                //Para transformar a lista de atributos em string
                let usuarioString = JSON.stringify(objetoUsuario);

                //Para verificarmos a quantidade de campos da string
                let tamanhoArray = usuarioString.split(',').length;

                //Verificar se a quantidade é igual a 13(Sem imagem)
                if (tamanhoArray === 13) {
                    //Pega a placa da string e coloca ela na lista de placas
                    ListaCPF.push(usuarioString.split(',')[6].split(':')[1].replace('"', "").split('"')[0]);
                }

                //Com imagem
                else {
                    //Pega a placa da string e coloca ela na lista de placas
                    ListaCPF.push(usuarioString.split(',')[7].split(':')[1].replace('"', "").split('"')[0]);
                }
            }
            //Pra buscar a lista de CPFs apenas uma vez
            setIsSearch(true);
        }

        //Verifica se as letras digitadas correspondem a alguma placa da lista de placas
        for (let i = 0; i < ListaCPF.length; i++) {
            //Se Corresponde
            if (ListaCPF[i].match(Pesquisa)) {
                //Torna o item visivel
                document.getElementById(ListaCPF[i]).style.display = "initial";
            }
            //Se não corresponde, torna o item oculto
            else {
                document.getElementById(ListaCPF[i]).style.display = "none";
            }
        }
    }

    function FormatarCPF(cpf) {
        let ListaCPF = JSON.stringify(cpf).slice().replace('"', "").split('"')[0]
        let CPFFormatado = "";

        for (let i = 0; i < ListaCPF.length; i++) {
            CPFFormatado += ListaCPF[i];
            if (i / 2 === 1 || i / 5 === 1) {
                CPFFormatado += ".";
            }

            if (i / 8 === 1) {
                CPFFormatado += "-";
            }
        }
        return CPFFormatado;
    }

    function FormatarTelefone(DDD, telefone) {
        let ListaTelefone = JSON.stringify(telefone).slice().replace('"', "").split('"')[0];
        let DDDeTelefone = DDD + " ";

        for (let i = 0; i < ListaTelefone.length; i++) {
            DDDeTelefone += ListaTelefone[i];
            if (i / 3 === 1) {
                DDDeTelefone += "-";
            }
        }
        return DDDeTelefone;
    }


    const notyf = new Notyf();

    function DeletarUsuario(idUsuario) {
        axios.delete('http://backend-saf-api.azurewebsites.net/api/Usuarios/Deletar/' + idUsuario)
            .then(resposta => {
                if (resposta.status === 204) {
                    notyf.success(
                        {
                            message: 'Usuário excluído com êxito',
                            duration: 3000,
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
    useUpdateEffect(PesquisaCPF,[Pesquisa]);

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
                            <input onChange={(e) => setPesquisa(e.target.value)} className='inputBusca' type="text" />
                            <button onClick={PesquisaCPF} className='btnBuscar' type='submit'><p>Buscar</p></button>
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
                                <div id={usuario.cpf}>
                                    <div className="cardUsuario">
                                        <div className="conteudoUsuario">
                                            <div className="alinharEtiquetasUsuarios">
                                                {
                                                    usuario.imagemUsuario != null ?
                                                        <img alt="Imagem do Usuário" src={"http://backend-saf-api.azurewebsites.net/Img/" + usuario.imagemUsuario} className="imgUsuario" />
                                                        :
                                                        <img alt="Imagem do Usuário" src={"http://backend-saf-api.azurewebsites.net/Img/Perfilpadrao.jpg"} className="imgUsuario" />
                                                }

                                                <div className="etiquetasUsuarios">
                                                    <div className="etiquetaUsuario">
                                                        <p className="nomeEtiquetaUsuario">{usuario.nome}</p>
                                                    </div>
                                                    <div className="etiquetaUsuario">
                                                        <p className="nomeEtiquetaUsuario">{FormatarTelefone(usuario.ddd, usuario.telefone)}</p>
                                                    </div>
                                                    <div className="etiquetaUsuario">
                                                        <p className="nomeEtiquetaUsuario ">{FormatarCPF(usuario.cpf)}</p>
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
                                </div>
                            )
                        }))}
                </div>
            </main >
            <Footer />
        </div >
    );
};