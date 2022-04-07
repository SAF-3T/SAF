import React from 'react';
<<<<<<< HEAD
import { useState } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> b7481f4eeb07bc857261d64e2a86a559ab4f9071

import './App.css';

import HeaderDashboard from '../../components/headers/headerDashboard';
import Sidebar from '../../components/sidebars/sidebar';
import Modal from '../../components/modal';

import axios from 'axios';

import { Link, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function Dashboard() {

<<<<<<< HEAD
  const [isModalVisible, setIsModalVisible] = useState(false);
=======
>>>>>>> b7481f4eeb07bc857261d64e2a86a559ab4f9071

  return (
    <div>

      <HeaderDashboard />

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
          <Link className="componentLink" to="/">
            <div className="card">
              <Link className="removerLink" to="/veiculos/cadastrar/veiculo">
                <div className="adicionarCard">
                  <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /> </div>
                <div className="textosCard">
                  <p className="pCadastrarCard">Cadastrar</p>
                  <p className="pCadastrarCard">Veículo</p>
                </div>
              </Link>
            </div>
          </Link>
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
                  <FontAwesomeIcon icon={faPlus} color="#fff" size="4x" /> </div>
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

      <Sidebar />

    </div>
  )
};

export default Dashboard;
