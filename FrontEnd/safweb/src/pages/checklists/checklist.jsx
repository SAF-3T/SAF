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

export default function Checklists() {

    const [ListaCheckList, setListaChecklist] = useState([]);
    const [ListaChecklistErro, setListaChecklistErro] = useState([]);
    const [ListaChecklistCorrecao, setListaChecklistCorrecao] = useState([]);
    const [QntdErros, setQntdErros] = useState([]);

    function buscarChecklists() {
        axios('http://backend-saf-api.azurewebsites.net/api/CheckList',)
            .then(response => {
                if (response.status === 200) {
                    setListaChecklist(response.data);
                    console.log(response.data)
                }
            })
            .catch(erro => console.log(erro));
    };

    function buscarContagemErros() {
        axios('http://backend-saf-api.azurewebsites.net/api/Erro/Contagem/1?idChecklsist=1')
            .then(response => {
                if (response.status === 200) {
                    setQntdErros(response.data);
                    console.log(response.data)
                }
            })
            .catch(erro => console.log(erro));
    }
    
    useEffect(buscarContagemErros, []);
    useEffect(buscarChecklists, []);

    return (
        <div>
            <Sidebar5 />
            <Header />

            <main>
                <div className="wrapperChecklist">
                    <p className="pChecklist">Checklists</p>

                    <div className="input-e-btn">
                        <div className="input-e-btn-2">
                            <input className='inputBusca' type="text" placeholder="Pesquisar" />
                            <button className='btnBuscar' type='submit'><p>Buscar</p></button>
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
                                                </div>
                                                <div className="etiquetaChecklist" style={{ cursor: 'pointer' }}  onClick={() => setListaChecklistCorrecao(true)}>
                                                    <div className="nomeEtiqueta">3</div>
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
                                            <FontAwesomeIcon className="iconPenToSquare" icon={faPenToSquare} style={{ cursor: 'pointer' }} size="2x" />
                                            <FontAwesomeIcon className="iconTrashCan" icon={faTrashCan} style={{ cursor: 'pointer' }} size="2x" />
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