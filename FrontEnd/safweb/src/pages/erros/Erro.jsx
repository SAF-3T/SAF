import { useState, useEffect } from 'react';

import { Component } from "react";
import axios from 'axios';

import Header from '../../components/headers/header';
import Sidebar1 from '../../components/sidebars/sidebar1';
import Footer from '../../components/footer';

import { Link } from 'react-router-dom';

import '../../assets/css/erros.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default class Erros extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         idChecklist: 0,
    //         listaErros: [],
    //         listaCorrecoes: []
    //     }
    // };

    render() {
        return (
            <div>
                <Header />
                <Sidebar1 />

                <main>
                    <div className="wrapperVeiculos">
                        <h1 className="pVeiculo">Comparativo de erros</h1>

                        <div className="input-e-btn">
                            <button className="addVeiculo" type='submit'><Link className='removerLink' to="/veiculos/cadastro/veiculo"><FontAwesomeIcon className="iconPlus" icon={faPlus} color="#fff" size="lg" />Corretiva</Link></button>
                            <div className="input-e-btn-2">
                                <input className='inputBusca' type="text" placeholder="idChecklist" />
                                <button className='btnBuscar' type='submit'>Buscar</button>
                            </div>
                        </div>

                        <section className="apoioConteudo">
                            <div className="blocoConteudo" id="blocoErros">
                                <h2>Erros</h2>
                                {/* <table class="awd">
                                    <thead class="awd">
                                        <tr>
                                            <td>idErro</td>
                                            <td>Tipo Erro</td>
                                            <td>Descrição</td>
                                            <td>Data</td>
                                        </tr>
                                    </thead>

                                    <tbody class="awd">
                                        {
                                            this.listarConsultas.map((Erro) => {
                                                return (
                                                    <tr key={Erro.idErro}>
                                                        <td>{Erro.idErro}</td>
                                                        <td>{Erro.idTipoErroNavigation.TipoErro}</td>
                                                        <td>{Erro.Descricao}</td>
                                                        <td>{Erro.Data}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table> */}

                                <table class="corpoTabela">
                                    <thead class="cabecalho">
                                        <tr>    
                                            <td id="tipoErro">Tipo Erro</td>
                                            <td id="desc">Descrição</td>
                                            <td id="data">Data</td>
                                        </tr>
                                    </thead>

                                    <tbody class="conteudoTabela">
                                        <tr>
                                            <td>Pneus furados</td>
                                            <td>Foi verificada uma avaria nas condições do veículo após a conclusão de um frete.</td>
                                            <td>20/10/2020 13:10</td>
                                        </tr>
                                    </tbody>
                                </table>


                            </div>

                            <div className="blocoConteudo">
                                <h2>Correções</h2>

                            </div>
                        </section>
                    </div>
                </main>

                <Footer />
            </div>
        )
    }
};