import React, { Component } from "react";

import axios from "axios";

import '../pages/dashboard/App.css';

class Header extends Component {

    buscarImagem = () => {
        axios('http://localhost:5000/api/perfils/imagem/bd', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .catch((erro) => console.log(erro))
            .then((resposta) => {
                if (resposta.status === 200) {
                    console.log(resposta);
                    this.setState({ ImagemUsuario: resposta.data });
                }
            });
    };

    render() {
        return (
            <div className="wrapperDashboard">
                <a href="#"><div className="imagemLogo"></div></a>
                <p className="pBemVindo">Bem vindo, [nome-usuario] !</p>
                <div className="usuarioHeaderDashboard">
                    <a href="#"><div className="imagemUsuario"></div></a>
                    <div className="linksUsuario">
                        <p className="pNomeUsuario">[nome-usuario]</p>
                        <p className="pCargoUsuario">[cargo-usuario]</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default Header;

//     render() {
//         return (
//             <div className="wrapperDashboard">
//                 <p>Bem vindo, {this.nome}!</p>
//                 <div className="usuarioHeaderDashboard">
//                     <a href="#"><div className="imagemUsuario"></div></a>
//                     <p>{this.nome}</p>
//                     <p>{this.IdTipoUsuarioNavigation.TipoUsuario}</p>
//                 </div>
//             </div>
//         );
//     };
// }