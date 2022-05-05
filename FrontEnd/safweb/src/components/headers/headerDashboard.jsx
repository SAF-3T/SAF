import React from "react";

import { useState, useEffect } from 'react';

import axios from "axios";

import { Link } from 'react-router-dom';

import '../../assets/css/App.css';

export default function Header() {

    const [NomeUsuario, setNomeUsuario] = useState([]);
    const [CargoUsuario, setCargoUsuario] = useState([]);
    const [ImagemUsuario, setImagemUsuario] = useState('');

    function buscarUsuarios() {

        // Armazena token do usuário
        const armazenaToken = localStorage.getItem('usuario-login').split('.')[1];

        // Descriptografa token
        const tokenDescriptografado = window.atob(armazenaToken).split(',')[2].split('"')[3];

        axios('http://backend-saf-api.azurewebsites.net/api/Usuarios/BuscarPorId/' + tokenDescriptografado)
            .then(response => {
                if (response.status === 200) {

                    // Busca o array de usuários
                    const listaDeUsuarios = response.data;

                    // Formata em JSON
                    const formatoEmJSON = JSON.stringify(listaDeUsuarios)

                    // Identificar cargo do usuário 
                    const cargoUsuario = formatoEmJSON.split(',')[10].split(':')[1].replace('"', "").split('"')[0]
                    setCargoUsuario(cargoUsuario)

                    //Identificar Imagem usuario
                    const imagemUsuario = formatoEmJSON.split(',')[2].split(':')[1].replace('"', "").split('"')[0]
                    setImagemUsuario(imagemUsuario);

                    //Buscar nome do Usuário
                    const nomeUsuario = formatoEmJSON.split(',')[3].split(':')[1].replace('"', "").split('"')[0]
                    setNomeUsuario(nomeUsuario);
                    // Buscar nome do usuário 
                    //var nomeUsuario = formatoEmJSON.split(',')[2].split(':')[1].replace('"', "").split('"')[0]
                    //setNomeUsuario(nomeUsuario)
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
                <a className="linkImagemUsuario" href="#"><img src={"http://backend-saf-api.azurewebsites.net/Img/" + ImagemUsuario} className="imagemUsuario" /></a>
                <div className="linksUsuario">
                    <p className="pNomeUsuario">{NomeUsuario}</p>
                    <p className="pCargoUsuario">{CargoUsuario}</p>
                </div>
            </div>

        </div>

    );

}