import React, { Component } from "react";

import axios from "axios";

import { Link } from 'react-router-dom';

import '../../pages/dashboard/App.css';

class Header extends Component {

    // buscarImagem = () => {
    //     axios('http://localhost:5000/api/Veiculos', {
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
    //         },
    //     })
    //         .catch((erro) => console.log(erro))
    //         .then((resposta) => {
    //             if (resposta.status === 200) {
    //                 console.log(resposta);
    //                 this.setState({ ImagemUsuario: resposta.data });
    //             }
    //         });
    // };

    render() {
        return (
            <div>
                <header>
                    <div className="wrapper">
                        <Link to="/dashboard"><div className="imagemLogo"></div></Link>
                        <a href="#"><div className="imagemUsuario"></div></a>
                    </div>
                </header>
            </div>
        );
    }
}

export default Header;