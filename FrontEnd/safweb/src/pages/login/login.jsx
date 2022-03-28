import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MaskedInput from './MaskedInput';

import { parseJwt, usuarioAutenticado } from '../../services/auth';

import '../../assets/css/login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CPF: '',
            Senha: '',
            erroMensagem: '',
            isLoading: false,
        };
    }

    efetuaLogin = (event) => {
        event.preventDefault();
        this.setState({ erroMensagem: '', isLoading: true });
        axios
            .post('', {
                email: this.state.CPF,
                senha: this.state.Senha,
            })

            .then((resposta) => {
                if (resposta.status === 200) {
                    localStorage.setItem('usuario-login', resposta.data.token);
                    this.setState({ isLoading: false });

                    let base64 = localStorage.getItem('usuario-login').split('.')[1];
                    console.log(base64);
                    console.log(this.props);

                    if (parseJwt().role === '1') {
                        this.props.history.push('/');
                        console.log('estou logado: ' + usuarioAutenticado());
                    } else {
                        this.props.history.push('/');
                    }
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
                        <div className="div-form">
                            <h1>LOGIN</h1>
                            <form className="form" onSubmit={this.efetuaLogin}>
                                <label htmlFor="CPF"></label>
                                <MaskedInput name="CPF" mask="999.999.999-99" value={this.state.CPF} onChange={this.atualizaStateCampo} placeholder="CPF"/>

                                <label htmlFor="Senha"></label>
                                <input type="password" name="Senha" value={this.state.Senha} onChange={this.atualizaStateCampo} placeholder="SENHA" />

                                <button className="btn-login" type="submit">LOGIN</button>
                            </form>
                        </div>
                    </div>
                    <div className="div-dir">
                        <div className="img"></div>
                    </div>
                </div>
            </div>
        );
    }
};