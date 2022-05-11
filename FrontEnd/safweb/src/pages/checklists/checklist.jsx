import React, { useState, useEffect } from 'react';

import Header from '../../components/headers/header';
import Sidebar5 from '../../components/sidebars/sidebar5';
import Footer from '../../components/footer';

import ModalErro from '../checklists/modalChecklistErros/modalChecklistErro';
import ModalCorrecao from '../checklists/modalChecklistCorrecao/modalChecklistCorrecao';

import axios from 'axios';

import './checklist.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';

export default function Checklists() {

    const [ListaCheckList, setListaChecklist] = useState([]);
    const [ListaChecklistErro, setListaChecklistErro] = useState(false);
    const [ListaChecklistCorrecao, setListaChecklistCorrecao] = useState(false);
    const [QntdErros, setQntdErros] = useState([]);
    const [QntdCorrecoes, setQntdCorrecoes] = useState([]);

    const [Pesquisa, setPesquisa] = useState('');
    const [ListaPlacas, setListaPlacas] = useState([]);

    function PesquisaPlaca() {

        //Verifica se as letras digitadas correspondem a alguma placa da lista de placas
        for (let i = 0; i < ListaPlacas.length; i++) {

            //Se Corresponde
            if (ListaPlacas[i].match(Pesquisa)) {
                //Torna o item visivel
                document.getElementById(ListaPlacas[i]).style.display = "initial"
            }
            //Se não corresponde, torna o item oculto
            else {
                document.getElementById(ListaPlacas[i]).style.display = "none"
            }
        }
    }

    function buscarChecklists() {
        axios('http://backend-saf-api.azurewebsites.net/api/CheckList',)
            .then(response => {
                if (response.status === 200) {
                    setListaChecklist(response.data);
                    
                    for (let i = 0; i < response.data.length; i++) {
                        let checklists = response.data[i]
                        let checklistString = JSON.stringify(checklists)

                    }
                }
            })
            .catch(erro => console.log(erro));
    };

    function buscarContagemErros() {
        axios('http://backend-saf-api.azurewebsites.net/api/Erro/Contagem/1?idChecklsist=1')
            .then(response => {
                if (response.status === 200) {
                    setQntdErros(response.data);
                }
            })
            .catch(erro => console.log(erro));
    }

    function buscarContagemCorrecoes() {
        axios('http://backend-saf-api.azurewebsites.net/api/Correcao/Contagem/1')
            .then(response => {
                if (response.status === 200) {
                    setQntdCorrecoes(response.data);
                }
            })
            .catch(erro => console.log(erro));
    }

    function deletar(idChecklist) {
        axios.delete('https://backend-saf-api.azurewebsites.net/CheckList/' + idChecklist)
            .then(resposta => {
                if (resposta.status === 204) {
                    setListaChecklist(resposta.data)
                        .then(buscarChecklists());
                }
            })
            .catch(erro => console.log(erro));
    };

    function Log() {
        console.log(Pesquisa)
    }

    useEffect(buscarContagemErros, []);
    useEffect(buscarChecklists, []);
    useEffect(buscarContagemCorrecoes, []);
    useEffect(Log, [Pesquisa])

    return (
        <div>
            <Sidebar5 />
            <Header />

            <main>
                <div className="wrapperChecklist">
                    <p className="pChecklist">Checklists</p>

                    <div className="input-e-btn">
                        <div className="input-e-btn-2">
                            <input onChange={(e) => setPesquisa(e.target.value.toUpperCase())} className='inputBusca' type="text" placeholder="Pesquisar" />
                            <button onClick={PesquisaPlaca} className='btnBuscar' type='submit'><p>Buscar</p></button>
                        </div>
                    </div>

                    <div className="cardCabecalhoChecklists">
                        <div className="conteudoCabecalhoChecklist">
                            <div className="alinharEtiquetasCabecalhoChecklists">
                                <div className="etiquetasCabecalhoChecklists">
                                    <div className="etiquetaCabecalhoChecklist">
                                        <div className="nomeCabecalhoEtiquetaChecklist">Checklist</div>
                                    </div>
                                    <div className="etiquetaCabecalhoChecklist">
                                        <p className="nomeCabecalhoEtiquetaChecklist">Usuário</p>
                                    </div>
                                    <div className="etiquetaCabecalhoChecklist">
                                        <div className="nomeCabecalhoEtiquetaChecklist">Placa</div>
                                    </div>
                                    <div className="etiquetaCabecalhoChecklist" onClick={() => setListaChecklistErro()}>
                                        <p className="nomeCabecalhoEtiquetaChecklist">Erros</p>
                                    </div>

                                    <div className="etiquetaCabecalhoChecklist" >
                                        <p className="nomeCabecalhoEtiquetaChecklist">Correções</p>
                                    </div>

                                    <div className="etiquetaCabecalhoChecklist">
                                        <p className="nomeCabecalhoEtiquetaChecklist">Data</p>
                                    </div>
                                </div>
                                <div className="iconesEtiquetaChecklist" />
                            </div>
                        </div>
                    </div>

                    {
                        ListaCheckList.map((checklist) => {
                            return (
                                <div id={checklist.idVeiculoNavigation.placa}>
                                    <div className="cardChecklist">
                                        <div className="conteudoChecklist">
                                            <div className="alinharEtiquetasChecklist">
                                                <div className="etiquetasChecklists">
                                                    <div className="etiquetaChecklist">
                                                        <div className="nomeEtiquetaChecklist">{checklist.idTipoCheckListNavigation.nomeTipoCheckList}</div>
                                                    </div>
                                                    <div className="etiquetaChecklist">
                                                        <div className="nomeEtiquetaChecklist">{checklist.idUsuarioNavigation.nome}</div>
                                                    </div>
                                                    <div className="etiquetaChecklist">
                                                        <div className="nomeEtiquetaChecklist">{checklist.idVeiculoNavigation.placa}</div>
                                                    </div>
                                                    <div className="etiquetaChecklist" style={{ cursor: 'pointer' }} onClick={() => setListaChecklistErro(true)}>
                                                        <p className="nomeEtiquetaChecklist">{QntdErros}</p>
                                                        <FontAwesomeIcon className="iconLupa" icon={faMagnifyingGlassPlus} style={{ cursor: 'pointer', color: '#FFF' }} size="lg" />
                                                    </div>
                                                    <div className="etiquetaChecklist campoCorrecao" style={{ cursor: 'pointer' }} onClick={() => setListaChecklistCorrecao(true)}>
                                                        <div className="nomeEtiqueta">{QntdCorrecoes}</div>
                                                        <FontAwesomeIcon className="iconLupa" icon={faMagnifyingGlassPlus} style={{ cursor: 'pointer', color: '#FFF' }} size="lg" />
                                                    </div>
                                                    <div className="etiquetaChecklist">
                                                        <p className="nomeEtiquetaChecklist">{Intl.DateTimeFormat("pt-BR", {
                                                            year: 'numeric', month: 'numeric', day: 'numeric',
                                                            hour: 'numeric', minute: 'numeric', hour12: false
                                                        }).format(new Date(checklist.dataCheckList))}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="iconesEtiquetaChecklist">
                                                <FontAwesomeIcon className="iconTrashCan" icon={faTrashCan} style={{ cursor: 'pointer' }} size="2x" onClick={() => deletar(checklist.idChecklist)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {ListaChecklistErro ? (<ModalErro onClose={() => setListaChecklistErro(false)}></ModalErro>) : null}
                {ListaChecklistCorrecao ? (<ModalCorrecao onClose={() => setListaChecklistCorrecao(false)}></ModalCorrecao>) : null}

            </main>
            <Footer />
        </div >
    );
};