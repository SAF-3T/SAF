import React from "react";

import { useState, useEffect } from 'react';

import axios from "axios";

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import '../../assets/css/App.css';

export default function Header() {

    const [NomeUsuario, setNomeUsuario] = useState([]);
    const [CargoUsuario, setCargoUsuario] = useState([]);
    const [ImagemUsuario, setImagemUsuario] = useState('');

    function Logout() {
        localStorage.removeItem('usuario-login')
    }

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
                    // console.log(formatoEmJSON)

                    let tamanhoArray = formatoEmJSON.split(',').length

                    //Caso não tenha foto
                    if (tamanhoArray === 13) {
                        // Identificar cargo do usuário 
                        const nomeUsuario = formatoEmJSON.split(',')[2].split(':')[1].replace('"', "").split('"')[0]
                        setNomeUsuario(nomeUsuario)

                        //ImagemUsuario
                        setImagemUsuario('Perfilpadrao.jpg')

                        //Buscar nome do Usuário
                        const cargo = formatoEmJSON.split(',')[9].split(':')[1].replace('"', "").split('"')[0]
                        setCargoUsuario(cargo);
                    }
                    //Caso tenha foto
                    else {
                        //Buscar nome do Usuário
                        const nomeUsuario = formatoEmJSON.split(',')[3].split(':')[1].replace('"', "").split('"')[0]
                        console.log(nomeUsuario)
                        setNomeUsuario(nomeUsuario)

                        //Identificar Imagem usuario
                        const imagemUsuario = formatoEmJSON.split(',')[2].split(':')[1].replace('"', "").split('"')[0]
                        console.log(imagemUsuario);
                        setImagemUsuario(imagemUsuario);

                        //Identificar cargo do usuario
                        const cargoUsuario = formatoEmJSON.split(',')[10].split(':')[1].replace('"', "").split('"')[0]
                        console.log(cargoUsuario)
                        setCargoUsuario(cargoUsuario);
                    }
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
                <img src={"http://backend-saf-api.azurewebsites.net/Img/" + ImagemUsuario} className="linkImagemUsuario" />
                <div className="linksUsuario">
                    <div className="linkUsuarioNomeCargo">
                        <p className="pNomeUsuario">{NomeUsuario}</p>
                        <p className="pCargoUsuario">{CargoUsuario}</p>
                    </div>

                    <Link className="removerLink" onClick={() => Logout()} to='/'>
                        <FontAwesomeIcon className="iconRightFromBracket" icon={faRightFromBracket} size="lg" />
                    </Link>
                </div>
            </div>
        </div >

    );

}