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
            <div>
                <header>
                    <div className="wrapper">
                        <a href="#">
                        <div className="imagemLogo"></div></a>
                        {/* <img className="fotoUsuario"
                            src={`data:image;base64,${this.state.ImagemUsuario}`}
                            alt="Imagem de Perfil do Usuário" /> */}
                        <a href="#"><div className="imagemUsuario"></div></a>
                    </div>
                </header>
            </div>
        );
    }
}

export default Header;