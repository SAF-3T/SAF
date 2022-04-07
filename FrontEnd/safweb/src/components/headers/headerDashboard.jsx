import { useState, useEffect } from "react";

import axios from "axios";

import { Link } from 'react-router-dom';

import jwt_decode from 'jwt-decode'; 

import '../../pages/dashboard/App.css';

<<<<<<< HEAD
class Header extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         idUsuario: 0,
    //         nome: '',
    //         sobrenome: ''
    //     }
    // };


    // buscarImagem = () => {
    //     axios('http://localhost:5000/api/Login', {
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

    // buscarUsuario = () => {

    //     let base64 = localStorage.getItem('usuario-login').split('.')[1];
    //     console.log(base64);      
    //     console.log(this.props);



    //     axios.get('https://localhost:5000/api/Usuarios/' + this.state.idUsuario)
    //         .then(resposta => {
    //             if (resposta.status === 200) {
    //                 this.setState({ nome: resposta.data.nome })
    //                 this.setState({ sobrenome: resposta.data.sobrenome })
    //             }
    //         })
    // }

// componentDidMount(){
//     this.buscarUsuario();
// }

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
=======
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
>>>>>>> b7481f4eeb07bc857261d64e2a86a559ab4f9071
                </div>
            </div>
        </div >
    )
};