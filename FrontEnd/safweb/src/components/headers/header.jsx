import React, { useState, useEffect } from "react";

import axios from "axios";

import { Link } from 'react-router-dom';

import '../../assets/css/App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function Header() {

    function buscarUsuarios() {

        // Armazena token do usuário
        const armazenaToken = localStorage.getItem('usuario-login').split('.')[1];

        // Descriptografa token
        const tokenDescriptografado = window.atob(armazenaToken).split(',')[2].split('"')[3];

        axios('https://backend-saf-api.azurewebsites.net/api/Usuarios/BuscarPorId/' + tokenDescriptografado)
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

                        //ImagemUsuario
                        setImagemUsuario('Perfilpadrao.jpg')
                    }
                    //Caso tenha foto
                    else {
                        //Identificar Imagem usuario
                        const imagemUsuario = formatoEmJSON.split(',')[2].split(':')[1].replace('"', "").split('"')[0]
                        // console.log(imagemUsuario);
                        setImagemUsuario(imagemUsuario);
                    }
                }
            })
            .catch(erro => console.log(erro));
    };

    function Logout() {
        localStorage.removeItem('usuario-login')
    }

    useEffect(buscarUsuarios, []);

    const [ImagemUsuario, setImagemUsuario] = useState('');

    return (
        <div>
            <header>
                <div className="wrapper">
                    <Link to="/dashboard"><div className="imagemLogo"></div></Link>
                    <div className="linksHeader">
                        <img src={"http://backend-saf-api.azurewebsites.net/Img/" + ImagemUsuario} className="imagemUsuario" />
                        <Link className="removerLink" onClick={() => Logout()} to='/'>
                            <FontAwesomeIcon color="#FFF" icon={faRightFromBracket} size="2x"/>
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    );
}