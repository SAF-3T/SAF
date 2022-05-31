import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/headers/header';
import Sidebar3 from '../../components/sidebars/sidebar3';
import Footer from '../../components/footer';

import Modal from '../cargas/modal/modalCargas';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import './cargas.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useUpdateEffect } from 'rsuite/esm/utils';

export default function ListarCarga() {

    const [ListaCarga, setListaCarga] = useState([]);

    const [listaCargas] = useState([]);
    const [Pesquisa, setPesquisa] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    const notyf = new Notyf();



    function buscarCarga() {
        axios('https://backend-saf-api.azurewebsites.net/api/TipoCargas', {
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

    function PesquisarCarga() {

        if (isSearch === false) {
            for (let a = 0; a < ListaCarga.length; a++) {
                listaCargas.push(JSON.stringify(ListaCarga[a]).split(',')[1].split(':')[1].replace('"', "").split('"')[0].toUpperCase());
            }
        }
        setIsSearch(true);

        for (let i = 0; i < ListaCarga.length; i++) {
            //Se Corresponde
            if (listaCargas[i].match(Pesquisa)) {
                //Torna o item visivel
                document.getElementById(listaCargas[i]).style.display = "initial";
            }
            //Se não corresponde, torna o item oculto
            else {
                document.getElementById(listaCargas[i]).style.display = "none";
            }
        }
    }

    function deletar(idTipoCarga) {

        axios.delete('https://backend-saf-api.azurewebsites.net/' + idTipoCarga)
            .then(resposta => {
                if (resposta.status === 204) {
                    notyf.success(
                        {
                            message: 'Carga excluída com êxito',
                            duration: 3000,
                            position: {
                                x: 'right',
                                y: 'top',
                            }
                        }
                    );
                }
            })

    };

    useEffect(buscarCarga, [ListaCarga]);
    useUpdateEffect(PesquisarCarga,[Pesquisa]);


    const [isModalVisible, setIsModalVisible] = useState(false);


    return (
        <div>
            <Sidebar3 />
            <Header />

            <main>
                <div className="wrapperCargas">
                    <p className="pCarga">Cargas</p>

                    <div className="input-e-btn">
                        <button className='btnAddCarga' type='button' onClick={() => setIsModalVisible(true)}>
                            <div className="conteudoBtnAddCarga">
                                <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" />
                                <p className="pAddCarga">Nova carga</p>
                            </div>
                        </button>{isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}></Modal>) : null}

                        <div className="input-e-btn-2">
                            <input onChange={(e) => setPesquisa(e.target.value.toUpperCase())} className='inputBusca' type="text" placeholder="Pesquisar" />
                            <button onClick={PesquisarCarga} className='btnBuscar' type='button'><p>Buscar</p></button>
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
                                <div id={carga.nomeTipoCarga.toUpperCase()}>
                                    <div className="cardCargas">
                                        <div className="alinharEtiquetasCargas">
                                            <div className="etiquetaCargas">
                                                <p key={carga.nomeTipoCarga} className="nomeEtiquetaCarga">{carga.nomeTipoCarga}</p>
                                            </div>
                                            <div className="iconesEtiquetaCargas">
                                                <FontAwesomeIcon className="iconTrashCan" icon={faTrashCan} style={{ cursor: 'pointer' }} size="2x"
                                                    onClick={() => deletar(carga.idTipoCarga)} />
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