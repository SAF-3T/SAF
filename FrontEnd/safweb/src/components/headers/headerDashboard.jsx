import React, { Component } from "react";

import axios from "axios";

import { Link } from 'react-router-dom';

import '../../pages/dashboard/App.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUsuario: 0,
            nome: '',
            sobrenome: ''
        }
    };
    
    render() {
        return (
            <div className="wrapperDashboard">
                <Link to="/dashboard"><div className="imagemLogoHeaderDashboard"></div></Link>
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