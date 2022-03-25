import { Component } from 'react';
import axios from 'axios';

import { parseJwt, usuarioAutenticado } from '../../services/auth';

import '../../assets/css/login.css';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cpf: '',
            senha: '',
            erroMensagem: '',
            isLoading: false,
        };
    }

    efetuaLogin = (event) => {
        event.preventDefault();

        this.setState({ erroMensagem: '', isLoading: true });

        axios
            .post('', {
                email: this.state.cpf,
                senha: this.state.senha,
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
        // quando estiver digitando no campo username
        //                     email        :       adm@adm.com

        // quando estiver digitando no campo password
        //                     senha        :        senha123
        this.setState({ [campo.target.name]: campo.target.value });
    };

    render() {
        return (
            <div>
                <div className="full-page">
                    <div className="div-esq">
                        <div className="div-form">
                            <h1>LOGIN</h1>
                            <form  className="form" onSubmit={this.efetuaLogin}>
                                <label htmlFor="cpf"></label>
                                <input type="number" value={this.state.cpf} onChange={this.atualizaStateCampo} id="cpf" placeholder="CPF" />

                                <label htmlFor="password"></label>
                                <input type="text" id="senha"  value={this.state.senha} onChange={this.atualizaStateCampo} placeholder="SENHA" />
                                

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