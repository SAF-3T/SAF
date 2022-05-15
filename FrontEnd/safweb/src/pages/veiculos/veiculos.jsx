import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/headers/header';
import Sidebar1 from '../../components/sidebars/sidebar1';
import Footer from '../../components/footer';

import ModalAddVeiculo from '../veiculos/modal/modalVeiculo';
import ModalEditVeiculo from '../veiculos/modalEdit/modalEditVeiculo';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import './veiculos.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useUpdateEffect } from 'rsuite/esm/utils';

export default function ListarVeiculos() {
    const [ListaVeiculos, setListaVeiculos] = useState([]);
    const [ListaPlacas] = useState([]);
    const [Pesquisa, setPesquisa] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    const notyf = new Notyf();

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
                console.log(ListaPlacas.length)
            }
            setIsSearch(true);
        }

        //Verifica se as letras digitadas correspondem a alguma placa da lista de placas
        for (let i = 0; i < ListaPlacas.length; i++) {
            //Se Corresponde
            console.log('Entrou no for '+i+' Vezes')
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


    function buscarVeiculos() {
        axios('https://backend-saf-api.azurewebsites.net/api/Veiculos', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setListaVeiculos(response.data);
                }
            })
            .catch(erro => console.log(erro));
    };

    function DeletarVeiculo(idVeiculo) {

        axios.delete('https://backend-saf-api.azurewebsites.net/Deletar/' + idVeiculo)
            .then(resposta => {
                if (resposta.status === 204) {
                    notyf.success(
                        {
                            message: 'Veículo excluída com êxito',
                            duration: 3000,
                            position: {
                                x: 'right',
                                y: 'top',
                            }
                        }
                    );
                }
            })
    }

    function AlterarLocal() {
        localStorage.setItem('att-veiculo', 1);
        console.log(localStorage.getItem('att-veiculo'))
        setIsModalEditVeiculoVisible(true);
    }

    useEffect(buscarVeiculos, [ListaVeiculos]);
    useUpdateEffect(PesquisaPlaca, [Pesquisa]);

    const [isModalAddVeiculoVisible, setIsModalAddVeiculoVisible] = useState(false);
    const [isModalEditVeiculoVisible, setIsModalEditVeiculoVisible] = useState(false);


    return (
        <div>
            <Sidebar1 />
            <Header />

            <main>
                <div className="wrapperVeiculos">
                    <p className="pVeiculo">Veículos</p>

                    <div className="input-e-btn">
                        <button className='btnAddVeiculo' type='submit' onClick={() => setIsModalAddVeiculoVisible(true)}>
                            <div className="conteudoBtnAddVeiculo">
                                <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" />
                                <p className="pAddVeiculo">Novo veículo</p>
                            </div>
                        </button>{isModalAddVeiculoVisible ? (<ModalAddVeiculo onClose={() => setIsModalAddVeiculoVisible(false)}></ModalAddVeiculo>) : null}

                        <div className="input-e-btn-2">
                            <input onChange={(e) => setPesquisa(e.target.value.toUpperCase())} className='inputBusca' type="text" placeholder="Pesquisar" />
                            <button onClick={PesquisaPlaca} className='btnBuscar' type='button'>Buscar</button>
                        </div>
                    </div>

                    <div className="cardCabecalhoVeiculo">
                        <div className="conteudoCabecalhoVeiculo">
                            <div className="alinharEtiquetasCabecalho">
                                <div className="imgCabecalhoVeiculo" />
                                <div className="etiquetasCabecalhoVeiculos">
                                    <div className="etiquetaCabecalhoVeiculo">
                                        <div className="nomeCabecalhoEtiqueta">Placa</div>
                                    </div>
                                    <div className="etiquetaCabecalhoVeiculo">
                                        <p className="nomeCabecalhoEtiqueta">Marca</p>
                                    </div>
                                    <div className="etiquetaCabecalhoVeiculo">
                                        <div className="nomeCabecalhoEtiqueta">Data aquisição</div>
                                    </div>
                                    <div className="etiquetaCabecalhoVeiculo">
                                        <p className="nomeCabecalhoEtiqueta">Status</p>
                                    </div>
                                </div>
                                <div className="iconesEtiquetaVeiculos" />
                            </div>
                        </div>
                    </div>
                    {
                        ListaVeiculos.map((veiculo) => {
                            return (
                                <div id={veiculo.placa}>
                                    <div className="cardVeiculo">
                                        <div className="conteudoVeiculo">
                                            <div className="alinharEtiquetas">
                                                {
                                                    veiculo.imagemVeiculo != null ?
                                                        < img alt='Imagem do Veiculo' src={"http://backend-saf-api.azurewebsites.net/Img/" + veiculo.imagemVeiculo} className="imgVeiculo" /> :
                                                        < img alt='Imagem do Veiculo' src={"http://backend-saf-api.azurewebsites.net/Img/Veiculopadrao.png"} className="imgVeiculo" />
                                                }
                                                <div className="etiquetasVeiculos">
                                                    <div className="etiquetaVeiculo">
                                                        <div className="nomeEtiqueta">{veiculo.placa}</div>
                                                    </div>
                                                    <div className="etiquetaVeiculo">
                                                        <p className="nomeEtiqueta">{veiculo.idMarcaNavigation.nomeMarca}</p>
                                                    </div>
                                                    <div className="etiquetaVeiculo">
                                                        <div className="nomeEtiqueta">{Intl.DateTimeFormat("pt-BR", {
                                                            year: 'numeric', month: 'numeric', day: 'numeric'
                                                        }).format(new Date(veiculo.dataAquisicao))}</div>
                                                    </div>
                                                    <div className="etiquetaVeiculo">
                                                        <p className="nomeEtiqueta">{veiculo.idStatusNavigation.nomeStatus}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="iconesEtiquetaVeiculos">
                                                <div>
                                                    <FontAwesomeIcon id={veiculo.idVeiculo} className="iconPenToSquare" icon={faPenToSquare} style={{ cursor: 'pointer' }} size="2x" onClick={AlterarLocal} />{isModalEditVeiculoVisible ? (<ModalEditVeiculo onClose={() => setIsModalEditVeiculoVisible(false)}></ModalEditVeiculo>) : null}
                                                </div>
                                                <FontAwesomeIcon className="iconTrashCan" icon={faTrashCan} style={{ cursor: 'pointer' }} size="2x"
                                                    onClick={() => DeletarVeiculo(veiculo.idVeiculo)} />
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
        </div >
    )
}
