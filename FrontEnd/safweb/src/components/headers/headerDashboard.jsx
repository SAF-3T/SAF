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


    buscarImagem = () => {
        axios('http://localhost:5000/api/Login', {
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

    buscarUsuario = () => {

        let base64 = localStorage.getItem('usuario-login').split('.')[1];
        console.log(base64);      
        console.log(this.props);



        axios.get('https://localhost:5000/api/Usuarios/' + this.state.idUsuario)
            .then(resposta => {
                if (resposta.status === 200) {
                    this.setState({ nome: resposta.data.nome })
                    this.setState({ sobrenome: resposta.data.sobrenome })
                }
            })
    }

componentDidMount(){
    this.buscarUsuario();
}

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