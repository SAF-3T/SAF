import React from "react";

import { useState, useEffect } from 'react';

import axios from "axios";

import { Link } from 'react-router-dom';

import '../../assets/css/App.css';

export default function Header() {

    const [ListaUsuario, setListaUsuario] = useState([]);
    const [NomeUsuario, setNomeUsuario] = useState([]);
    const [CargoUsuario, setCargoUsuario] = useState([]);

    function buscarUsuarios() {

        // Armazena token do usuário
        const armazenaToken = localStorage.getItem('usuario-login').split('.')[1];

        // Descriptografa token
        const tokenDescriptografado = window.atob(armazenaToken).split(',')[2].split('"')[3];


        axios('http://backend-saf-api.azurewebsites.net/api/Usuarios/BuscarPorId/' + tokenDescriptografado)
            .then(response => {
                if (response.status === 200) {
                    setListaUsuario(response.data);

                    // Busca o array de usuários
                    const listaDeUsuarios = response.data;

                    // Formata em JSON
                    const formatoEmJSON = JSON.stringify(listaDeUsuarios)
                    
                    // Identificar cargo do usuário 
                    const cargoUsuario = formatoEmJSON.split(',')[9].split(':')[1].replace('"', "").split('"')[0]
                    setCargoUsuario(cargoUsuario)

                    // Buscar nome do usuário 
                    var nomeUsuario = formatoEmJSON.split(',')[2].split(':')[1].replace('"', "").split('"')[0]
                    setNomeUsuario(nomeUsuario)
                }
            })
            .catch(erro => console.log(erro));
    };

    useEffect(buscarUsuarios, []);

    return (

        <div className="wrapperDashboard">
            <Link to="/dashboard"><div className="imagemLogoHeaderDashboard"></div></Link>

            <p className="pBemVindo">Bem vindo, {NomeUsuario}!</p>
            <div className="usuarioHeaderDashboard">
                <a href="#"><img src={"http://backend-saf-api.azurewebsites.net/api/StaticFiles/Images/PerfilSaf.jpg"} className="imagemUsuario"></img></a>
                <div className="linksUsuario">
                    <p className="pNomeUsuario">{NomeUsuario}</p>
                    <p className="pCargoUsuario">{CargoUsuario}</p>
                </div>
            </div>

        </div>

    );

}