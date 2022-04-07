// import '../../Assets/css/corretivas.css'

// import { Component } from "react";
// import axios from 'axios';

// export default class Corretivas extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             idUsuario: 1,
//             nome: '',
//             sobrenome: '',
//             email: '',
//             ddd: 0,
//             telefone: ''
//         }
//     };

//     buscarUsuario = () => {

//         axios.get('http://localhost:5000/api/Usuarios/', {
//             headers: {
//                 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
//             }
//         })
//         .then(response => {
//             if (response.status !== 200) {
//                 this.props.history.push('/Login');
//             }
//         })

//         axios.get('https://6224b3d36c0e3966204497ad.mockapi.io/Usuarios/' + this.state.idUsuario)
//             .then(resposta => {
//                 if (resposta.status === 200) {
//                     this.setState({ nome: resposta.data.nome })
//                     this.setState({ sobrenome: resposta.data.sobrenome })
//                     this.setState({ email: resposta.data.email })
//                     this.setState({ ddd: resposta.data.ddd })
//                     this.setState({ telefone: resposta.data.telefone })
//                 }
//             })
//     }

//     atualizaUsuario = () => {
//         axios.put(('https://6224b3d36c0e3966204497ad.mockapi.io/Usuarios/' + this.state.idUsuario),
//             {
//                 nome: this.state.nome,
//                 sobrenome: this.state.sobrenome,
//                 email: this.state.email,
//                 telefone: this.state.telefone,
//                 ddd: this.state.ddd,
//             })
//     }

//     componentDidMount() {
//         this.buscarUsuario()
//     };

//     atualizaStateCampo = (campo) => {
//         this.setState({ [campo.target.name]: campo.target.value })
//     };

//     render() {
//         return (
//             <main>
//                 <section className='section-perfil'>
//                     <h1>Perfil - Informações pessoais</h1>
//                     <div className='apoioPerfil'>
//                         <div className='apoioImagemPerfil'>
//                         </div>
//                         <div className='apoioForm'>
//                             <form>
//                                 <div className='linhasInputs'>
//                                     <input onChange={this.atualizaStateCampo} value={this.state.nome} name='nome' placeholder='Nome' type="text"></input>
//                                     <input onChange={this.atualizaStateCampo} value={this.state.sobrenome} name='sobrenome' placeholder='Sobrenome' type="text"></input>
//                                 </div>

//                                 <div className='linhasInputs'>
//                                     <input onChange={this.atualizaStateCampo} value={this.state.email} name='email' placeholder='Email' type='email' id='emailInput' ></input>
//                                 </div>

//                                 <div className='linhasInputs'>
//                                     <input onChange={this.atualizaStateCampo} value={this.state.ddd} name='ddd' placeholder='DDD' type="number"></input>
//                                     <input onChange={this.atualizaStateCampo} value={this.state.telefone} name='telefone' placeholder='Telefone' type="tel"></input>
//                                 </div>

//                                 <button className='buttom' type='button' onClick={this.atualizaUsuario}>Atualizar</button>
//                             </form>
//                         </div>
//                     </div>
//                 </section>

//             </main>

//         )
//     }
// }