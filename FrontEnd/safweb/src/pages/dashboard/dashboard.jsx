import React from 'react';
import { useState, useEffect } from 'react';

import '../../assets/css/App.css';

import axios from 'axios';

import HeaderDashboard from '../../components/headers/headerDashboard';
import Sidebar from '../../components/sidebars/sidebar';
import Footer from '../../components/footer'

import ModalVeiculoDashboard from '../veiculos/modalDashboard/modalVeiculoDashboard';
import ModalTipoVeiculoDashboard from '../tipoVeiculos/modalDashboard/modalTipoVeiculosDashboard';
import ModalCargaDashboard from '../cargas/modalDashboard/modalCargasDashboard';
import ModalCarroceriaDashboard from '../carrocerias/modalDashboard/modalCarroceriasDashboard';
import ModalUsuario from '../usuarios/modal/modalUsuario.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { faRoad } from '@fortawesome/free-solid-svg-icons'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function Dashboard() {

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

  const [isModalVeiculoVisible, setIsModalVeiculoVisible] = useState(false);
  const [isModalTipoVeiculoVisible, setIsModalTipoVeiculoVisible] = useState(false);
  const [isModalCargaVisible, setIsModalCargaVisible] = useState(false);
  const [isModalCarroceriaVisible, setIsModalCarroceriaVisible] = useState(false);
  const [isModalAddUsuarioVisible, setIsModalAddUsuarioVisible] = useState(false);

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
              <FontAwesomeIcon icon={faWarehouse} color="#0E758C" size='2x' />
              <p className="mensagem">Veículos na garagem: {QntGaragem}</p>
            </div>
            <div className='conteudoMensagem'>
              <FontAwesomeIcon icon={faWrench} color="#0E758C" size='2x' />
              <p className="mensagem">Veículos em manutenção: {QntManutencao}</p>
            </div>
          </div>
          <div className="imagemDrawkit" />
        </section>

        <div className="wrapperCards">
          <div className="cardsCima">
            <div className="card" onClick={() => setIsModalVeiculoVisible(true)}>
              <div className="adicionarCard">
                <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /> </div>
              <div className="textosCard">
                <p className="pCadastrarCard">Cadastrar</p>
                <p className="pCadastrarCard">Veículo</p>
              </div>
            </div>{isModalVeiculoVisible ? (<ModalVeiculoDashboard onClose={() => setIsModalVeiculoVisible(false)}></ModalVeiculoDashboard>) : null}

            <div className="card" onClick={() => setIsModalTipoVeiculoVisible(true)}>
              <div className="adicionarCard">
                <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /> </div>
              <div className="textosCard">
                <p className="pCadastrarCard">Cadastrar</p>
                <p className="pCadastrarCard">Tipo de veículo</p>
              </div>
            </div>{isModalTipoVeiculoVisible ? (<ModalTipoVeiculoDashboard onClose={() => setIsModalTipoVeiculoVisible(false)}></ModalTipoVeiculoDashboard>) : null}

            <div className="card" onClick={() => setIsModalCargaVisible(true)}>
              <div className="adicionarCard">
                <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /> </div>
              <div className="textosCard">
                <p className="pCadastrarCard">Cadastrar</p>
                <p className="pCadastrarCard">Carga</p>
              </div>
            </div>{isModalCargaVisible ? (<ModalCargaDashboard onClose={() => setIsModalCargaVisible(false)}></ModalCargaDashboard>) : null}
          </div>

          <div className="cardsBaixo">
            <div className="card" onClick={() => setIsModalCarroceriaVisible(true)}>
              <div className="adicionarCard">
                <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /></div>
              <div className="textosCard">
                <p className="pCadastrarCard">Cadastrar</p>
                <p className="pCadastrarCard">Carroceria</p>
              </div>
            </div>{isModalCarroceriaVisible ? (<ModalCarroceriaDashboard onClose={() => setIsModalCarroceriaVisible(false)}></ModalCarroceriaDashboard>) : null}

            <div className="card" onClick={() => setIsModalAddUsuarioVisible(true)}>
              <div className="adicionarCard">
                <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /> </div>
              <div className="textosCard">
                <p className="pCadastrarCard">Cadastrar</p>
                <p className="pCadastrarCard">Usuario</p>
              </div>
            </div>{isModalAddUsuarioVisible ? (<ModalUsuario onClose={() => setIsModalAddUsuarioVisible(false)}></ModalUsuario>) : null}
          </div>
        </div>
      </main >

      <Footer />
    </div>
  )
};

export default Dashboard;
