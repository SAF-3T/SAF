import React from 'react';
import { useState, useEffect } from 'react';

import '../../assets/css/App.css';

import axios from 'axios';

import HeaderDashboard from '../../components/headers/headerDashboard';
import Sidebar from '../../components/sidebars/sidebar';

import Modal from '../veiculos/modal/modalVeiculo';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { faRoad } from '@fortawesome/free-solid-svg-icons'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function Dashboard() {

  const [StatusVeiculos, setStatusVeiculos] = useState([]);
  const [QntTrajeto, setQntTrajeto] = useState(0);
  const [QntGaragem, setQntGaragem] = useState(0);
  const [QntManutencao, setQntManutencao] = useState(0);


  function listarStatusVeiculo() {
    axios('https://backend-saf-api.azurewebsites.net/api/Veiculos/BuscaStatus/1')
      .then(response => {
        if (response.status === 201) {
          setQntTrajeto(response.data);
        }
      })
      .catch(erro => console.log(erro));

      axios('https://backend-saf-api.azurewebsites.net/api/Veiculos/BuscaStatus/2')
      .then(response => {
        if (response.status === 201) {
          setQntGaragem(response.data);
        }
      })
      .catch(erro => console.log(erro));

      axios('https://backend-saf-api.azurewebsites.net/api/Veiculos/BuscaStatus/3')
      .then(response => {
        if (response.status === 201) {
          setQntManutencao(response.data);
        }
      })
      .catch(erro => console.log(erro));
  };
  
  useEffect(listarStatusVeiculo, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div>

      <Sidebar />
      <HeaderDashboard />

      <main>
        <section className="conteudoCima">
          <div className="mensagemBoard">
            <p className="mensagemTitulo">Dados da frota</p>
            <div className='conteudoMensagem'>
              <FontAwesomeIcon icon={faRoad} color="#0E758C" size='2x' />
              <p className="mensagem">Veículos em trajeto: {QntTrajeto} </p>
            </div>
            <div className='conteudoMensagem'>
              <FontAwesomeIcon icon={faWarehouse} color="#0E758C" size='2x'/>
              <p className="mensagem">Veículos na garagem: {QntGaragem}</p>
            </div>
            <div className='conteudoMensagem'>
              <FontAwesomeIcon icon={faWrench} color="#0E758C"size='2x'/>
              <p className="mensagem">Veículos em manutenção: {QntManutencao}</p>
            </div>
          </div>

          <div className="imagemDrawkit" />
        </section>

        <div className="wrapperCards">
          <div className="card" onClick={() => setIsModalVisible(true)}>
            <div className="adicionarCard">
              <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /> </div>
            <div className="textosCard">
              <p className="pCadastrarCard">Cadastrar</p>
              <p className="pCadastrarCard">Veículo</p>
            </div>
          </div>{isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}></Modal>) : null}
          <Link className="componentLink" to="/">
            <div className="card">
              <Link className="removerLink" to="/veiculos/cadastrar/tipo-veiculo">
                <div className="adicionarCard">
                  <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /> </div>
                <div className="textosCard">
                  <p className="pCadastrarCard">Cadastrar</p>
                  <p className="pCadastrarCard">Tipo de veículo</p>
                </div>
              </Link>
            </div>
          </Link>
          <Link className="componentLink" to="/">
            <div className="card">
              <Link className="removerLink" to="/veiculos/cadastrar/carga">
                <div className="adicionarCard">
                  <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /> </div>
                <div className="textosCard">
                  <p className="pCadastrarCard">Cadastrar</p>
                  <p className="pCadastrarCard">Carga</p>
                </div>
              </Link>
            </div>
          </Link>
          <Link className="componentLink" to="/">
            <div className="card">
              <Link className="removerLink" to="/veiculos/cadastrar/carroceria">
                <div className="adicionarCard">
                  <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /></div>
                <div className="textosCard">
                  <p className="pCadastrarCard">Cadastrar</p>
                  <p className="pCadastrarCard">Carroceria</p>
                </div>
              </Link>
            </div>
          </Link>
          <Link className="componentLink" to="/">
            <div className="card">
              <Link className="removerLink" to="/veiculos/cadastrar/usuario">
                <div className="adicionarCard">
                  <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /> </div>
                <div className="textosCard">
                  <p className="pCadastrarCard">Cadastrar</p>
                  <p className="pCadastrarCard">Usuario</p>
                </div>
              </Link>
            </div>
          </Link>
          <Link className="componentLink" to="/">
            <div className="card">
              <Link className="removerLink" to="/veiculos/cadastrar/checklist">
                <div className="adicionarCard">
                  <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /> </div>
                <div className="textosCard">
                  <p className="pCadastrarCard">Cadastrar</p>
                  <p className="pCadastrarCard">Checklist</p>
                </div>
              </Link>
            </div>
          </Link>
        </div>
      </main >
    </div>
  )
};

export default Dashboard;
