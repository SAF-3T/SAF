import React, { Component } from "react";

import { useState, useEffect } from 'react';

import axios from "axios";

import { Link } from 'react-router-dom';

import '../../pages/dashboard/App.css';

export default function Header() {

    const [ListaUsuario, setListaUsuario] = useState([]);
    const [NomeUsuario, setNomeUsuario] = useState([]);
    const [CargoUsuario, setCargoUsuario] = useState([]);

    function buscarUsuarios() {

        let token = localStorage.getItem('usuario-login').split('.')[1];
        // console.log(token)

        var token2 = window.atob(token);
        console.log(token2)

        var token3 = token2.split(',')[2];
        console.log(token3)

        var token4 = token3.split('"')[3];
        console.log(token4)

        axios('http://localhost:5000/api/Usuarios/BuscarPorId/' + token4)
            .then(response => {
                if (response.status === 200) {
                    setListaUsuario(response.data);
                    var lista = response.data;
                    console.log(lista)

                    var chave = JSON.stringify(lista)
                    console.log(chave);

                    var chave2 = chave.split(',')[2];
                    console.log(chave2)

                    var chave3 = chave2.split(':')[1]
                    console.log(chave3)

                    var chave5 = chave3.replace('"', "").split('"')[0]

                    setNomeUsuario(chave5)

                    console.log(chave5)
                }
                // console.log(ListaUsuario)
            })
            .catch(erro => console.log(erro));
    };

    useEffect(buscarUsuarios, []);

    return (

        <div className="wrapperDashboard">
            <Link to="/dashboard"><div className="imagemLogoHeaderDashboard"></div></Link>

            <p className="pBemVindo">Bem vindo, {NomeUsuario} !</p>
            <div className="usuarioHeaderDashboard">
                <a href="#"><div className="imagemUsuario"></div></a>
                <div className="linksUsuario">
                    <p className="pNomeUsuario">{NomeUsuario}</p>
                    <p className="pCargoUsuario">{CargoUsuario}</p>
                </div>
            </div>

        </div>

    );

}