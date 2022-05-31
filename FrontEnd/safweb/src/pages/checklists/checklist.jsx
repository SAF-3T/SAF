import React, { useState, useEffect } from 'react';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import Header from '../../components/headers/header';
import Sidebar5 from '../../components/sidebars/sidebar5';
import Footer from '../../components/footer';

import ModalErro from '../checklists/modalChecklistErros/modalChecklistErro';
import ModalCorrecao from '../checklists/modalChecklistCorrecao/modalChecklistCorrecao';

import axios from 'axios';

import './checklist.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import { useUpdateEffect } from 'rsuite/esm/utils';


export default function Checklists() {

    const notyf = new Notyf();

    const [ListaCheckList, setListaChecklist] = useState([]);
    const [ListaChecklistErro, setListaChecklistErro] = useState(false);
    const [ListaChecklistCorrecao, setListaChecklistCorrecao] = useState(false);
    const [QntdErros, setQntdErros] = useState([]);
    const [QntdCorrecoes, setQntdCorrecoes] = useState([]);

    const [Pesquisa, setPesquisa] = useState('');
    const [ListaPlacas] = useState([]);
    const [ListaVeiculos, setListaVeiculos] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    function PesquisaPlaca() {

        if (isSearch === false) {
            //Para criar a lista de placas
            for (let i = 0; i < ListaVeiculos.length; i++) {

                //Para puxar cada veiculo da lista
                const objetoVeiculo = ListaVeiculos[i]

                //Para transformar a lista de atributos em string
                let veiculoString = JSON.stringify(objetoVeiculo);

                //Para verificarmos a quantidade de campos da string
                let tamanhoArray = veiculoString.split(',').length

                //Verificar se a quantidade é igual a 30(Sem imagem)
                if (tamanhoArray === 30) {
                    //Pega a placa da string e coloca ela na lista de placas
                    ListaPlacas.push(veiculoString.split(',')[6].split(':')[1].replace('"', "").split('"')[0])
                }

                //Com imagem
                else {
                    //Pega a placa da string e coloca ela na lista de placas
                    ListaPlacas.push(veiculoString.split(',')[7].split(':')[1].replace('"', "").split('"')[0])
                }
            }
            setIsSearch(true);
        }

        //Verifica se as letras digitadas correspondem a alguma placa da lista de placas
        for (let i = 0; i < ListaPlacas.length; i++) {
            //Se Corresponde
            if (ListaPlacas[i].match(Pesquisa)) {
                //Torna o item visivel
                var elemst = document.getElementsByClassName(ListaPlacas[i]);
                for (var b = 0; b < elemst.length; b += 1) {
                    elemst[b].style.display = 'initial';
                }
            }
            //Se não corresponde, torna o item oculto
            else {
                var elems = document.getElementsByClassName(ListaPlacas[i]);
                for (var a = 0; a < elems.length; a += 1) {
                    elems[a].style.display = 'none';
                }
            }
        }
    }

    function buscarChecklists() {
        axios('https://backend-saf-api.azurewebsites.net/api/CheckList',)
            .then(response => {
                if (response.status === 200) {
                    setListaChecklist(response.data);
                }
            })
            .catch(erro => console.log(erro));

        axios.get('https://backend-saf-api.azurewebsites.net/api/Veiculos')
            .then(response => {
                if (response.status === 200) {
                    setListaVeiculos(response.data)
                }
            })
    };

    function buscarContagemErros() {
        axios('https://backend-saf-api.azurewebsites.net/api/Erro/Contagem/1?idChecklsist=1')
            .then(response => {
                if (response.status === 200) {
                    setQntdErros(response.data);
                }
            })
            .catch(erro => console.log(erro));
    }

    function buscarContagemCorrecoes() {
        axios('https://backend-saf-api.azurewebsites.net/api/Correcao/Contagem/1')
            .then(response => {
                if (response.status === 200) {
                    setQntdCorrecoes(response.data);
                }
            })
            .catch(erro => console.log(erro));
    }

    function deletar(idChecklist) {
        axios.delete('https://backend-saf-api.azurewebsites.net/api/CheckList/' + idChecklist)
            .then(resposta => {
                if (resposta.status === 204) {
                    notyf.success(
                        {
                            message: 'Carroceria excluída com êxito',
                            duration: 3000,
                            position: {
                                x: 'right',
                                y: 'top',
                            }
                        }
                    );
                }
            }
            )
    }



    useEffect(buscarContagemErros, []);
    useEffect(buscarContagemCorrecoes, []);
    useEffect(buscarChecklists, [ListaCheckList]);
    useUpdateEffect(PesquisaPlaca, [Pesquisa]);

    return (
        <div>
            <Sidebar5 />
            <Header />

            <main>
                <div className="wrapperChecklist">
                    <p className="pChecklist">Checklists</p>

                    <div className="input-e-btn">
                        <div className="input-e-btn-2">
                            <input onSubmit={PesquisaPlaca} onChange={(e) => setPesquisa(e.target.value.toUpperCase())} className='inputBusca' type="text" placeholder="Pesquisar" />
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
                                <div className={checklist.idVeiculoNavigation.placa}>
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
                                                            year: 'numeric', month: 'numeric', day: 'numeric'
                                                        }).format(new Date(checklist.dataCheckList))}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="iconesEtiquetaChecklist">
                                                <FontAwesomeIcon className="iconTrashCan" icon={faTrashCan} style={{ cursor: 'pointer' }} size="2x" onClick={() => deletar(checklist.idCheckList)} />
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