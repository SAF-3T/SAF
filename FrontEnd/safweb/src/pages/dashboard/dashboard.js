import React from 'react';

import './App.css';

import HeaderDashBoard from '../../components/headerDashboard';
import Sidebar from '../../components/sidebar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function dashboard() {
  return (
    <div>
      {/* <Header/> */}

      <HeaderDashBoard />

      <main>
        <section className="conteudoCima">
          <div className="mensagemBoard">
            <p className="mensagemTitulo">Hoje é dia de ...</p>
            <p className="mensagem"><FontAwesomeIcon icon={faCheck} color="#0E758C" /> Cadastrar</p>
            <p className="mensagem"><FontAwesomeIcon icon={faCheck} color="#0E758C" /> Buscar</p>
            <p className="mensagem"><FontAwesomeIcon icon={faCheck} color="#0E758C" /> Planejar</p>
          </div>

          <div className="imagemDrawkit" />
        </section>

        <div className="wrapperCards">
          <div className="card">
            <div className="adicionarCard">
              <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /> </div>
            <div className="textosCard">
              <p className="pCadastrarCard">Cadastrar</p>
              <p className="pCadastrarCard">Veículo</p>
            </div>
          </div>
          <div className="card">
            <div className="adicionarCard">
              <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /> </div>
            <div className="textosCard">
              <p className="pCadastrarCard">Cadastrar</p>
              <p className="pCadastrarCard">Tipo de veículo</p>
            </div>
          </div>
          <div className="card">
            <div className="adicionarCard">
              <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /> </div>
            <div className="textosCard">
              <p className="pCadastrarCard">Cadastrar</p>
              <p className="pCadastrarCard">Carga</p>
            </div>
          </div>
          <div className="card">
            <div className="adicionarCard">
              <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /> </div>
            <div className="textosCard">
              <p className="pCadastrarCard">Cadastrar</p>
              <p className="pCadastrarCard">Carroceria</p>
            </div>
          </div>
          <div className="card">
            <div className="adicionarCard">
              <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /> </div>
            <div className="textosCard">
              <p className="pCadastrarCard">Cadastrar</p>
              <p className="pCadastrarCard">Usuario</p>
            </div>
          </div>
          <div className="card">
            <div className="adicionarCard">
              <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /> </div>
            <div className="textosCard">
              <p className="pCadastrarCard">Cadastrar</p>
              <p className="pCadastrarCard">Checklist</p>
            </div>
          </div>

        </div>
      </main>

      <Sidebar />

      {/* <Footer /> */}
    </div>
  );
}

export default dashboard;
