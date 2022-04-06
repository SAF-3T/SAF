import { useState, useEffect } from "react";

import axios from "axios";

import { Link } from 'react-router-dom';

import jwt_decode from 'jwt-decode'; 

import '../../pages/dashboard/App.css';

export default function Header() {

    // const [ListaUsuario, setListaUsuario] = useState([]);

    // function buscarUsuario() {

        // let idUsuario = localStorage.getItem('usuario-login');
        // console.log(idUsuario);

        // let token = 'eyJ0eXAiO.../// jwt token';

        // let decoded = jwt_decode(token);
        // console.log(decoded);

        // let idUsuarioDecodificado = JSON.parse(window.atob(token.split('.')[1]))
        // console.log(idUsuarioDecodificado);

    //     axios('http://localhost:5000/api/Usuarios/')
    //         .then(resposta => {
    //             if (resposta.status === 200) {
    //                 setListaUsuario(resposta.data)
    //             }
    //         })
    //         .catch(erro => console.log(erro));
    // };

    // useEffect(buscarUsuario, []);


    return (

        <div className="wrapperDashboard" >
            <Link to="/dashboard"><div className="imagemLogoHeaderDashboard"></div></Link>

            {
                // ListaUsuario.map((usuario) => {
                //     return ( key={usuario.idUsuario}
                        <p className="pBemVindo" >Bem vindo, [nome usuário]!</p>
                //     )
                // })
            }

            <div className="usuarioHeaderDashboard">
                <a href="#"><div className="imagemUsuario"></div></a>
                <div className="linksUsuario">
                    <p className="pNomeUsuario">[nome-usuario]</p>
                    <p className="pCargoUsuario">[cargo-usuario]</p>
                </div>
            </div>
        </div >
    )
};