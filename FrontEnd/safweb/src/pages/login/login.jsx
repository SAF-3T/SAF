import React from 'react';
import axios from 'axios';
import MaskedInput from './MaskedInput';

import { usuarioAutenticado } from '../../services/auth';

import './login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cpf: '', //248.174.823-84 - Marcio
            senha: '', //123456789
            erroMensagem: '',
            isLoading: false,
        };
    }

    efetuaLogin = (event) => {
        event.preventDefault();
        this.setState({ erroMensagem: '', isLoading: true });
        axios
            .post('http://backend-saf-api.azurewebsites.net/api/Login', {
                cpf: this.state.cpf,
                senha: this.state.senha,
            })

            .then((resposta) => {
                if (resposta.status === 200) {
                    localStorage.setItem('usuario-login', resposta.data.token);
                    this.setState({ isLoading: false });

                    console.log('estou logado: ' + usuarioAutenticado());

                    let base64 = localStorage.getItem('usuario-login').split('.')[1];
                    console.log(base64);
                    console.log(this.props);

                    this.props.history.push('/dashboard');
                }
            })
            .catch(() => {
                this.setState({
                    erroMensagem: 'E-mail e/ou senha inválidos!',
                    isLoading: false,
                });
            });
    };

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value });
    };

    render() {
        return (
            <div>
                <div className="full-page">
                    <div className="div-esq">
                        <div className="div-form esq-dir">
                            <h1>LOGIN</h1>
                            <form className="form" onSubmit={this.efetuaLogin}>
                                <label htmlFor="cpf"></label>
                                <MaskedInput className="inputLogin" name="cpf" mask="999.999.999-99" value={this.state.cpf} onChange={this.atualizaStateCampo} placeholder="CPF" />

                                <label htmlFor="senha"></label>
                                <input className='inputLogin' type="password" name="senha" value={this.state.senha} onChange={this.atualizaStateCampo} placeholder="SENHA" />
                                    <div className="item">
                                        <p>{this.state.erroMensagem}</p>
                                    </div>
                                <button type="submit" className="btn_login">LOGIN</button>

                            </form>

                        </div>

                    </div>

                    <div className="div-dir esq-dir">
                        <div className="img"></div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Login;