import React, { useEffect, useState } from 'react';

import './modalUsuario.css';

import axios from 'axios';

import MaskedInput from '../../login/MaskedInput';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { }, children }) => {

    const notyf = new Notyf();

    //Cadastrar
    const [IdTipoUsuario, setIdTipoUsuario] = useState('');
    const [Senha, setSenha] = useState('');
    const [CPF, setCPF] = useState('');
    const [DDD, setDDD] = useState('');
    const [Nome, setNome] = useState('');
    const [Sobrenome, setSobrenome] = useState('');
    const [Telefone, setTelefone] = useState('');

    //Listar
    const [TiposUsuarios, setTiposUsuarios] = useState([]);


    function BuscarForms() {
        axios.get('http://backend-saf-api.azurewebsites.net/api/TipoUsuarios')
            .then(response => {
                if (response.status === 200)
                    setTiposUsuarios(response.data)
            })
    }

    const CadastrarUsuario = (event) => {

        event.preventDefault();

        var formData = new FormData();
        const element = document.getElementById('ImagemUsuario')
        const file = element.files[0]
        formData.append('arquivo', file, file.name);
        formData.append('idTipoUsuario', IdTipoUsuario);
        formData.append('senha', Senha);
        formData.append('CPF', 11169111117);
        formData.append('DDD', 11);
        formData.append('nome', Nome);
        formData.append('sobrenome', Sobrenome);
        formData.append('telefone', 981911331);

        try {
            axios({
                method: "post",
                url: "http://backend-saf-api.azurewebsites.net/api/Usuarios",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((resposta) => {
                    if (resposta.status === 201) {
                        onClose()
                        notyf.success(
                            {
                                message: 'Usuario cadastrado com êxito.',
                                duration: 1000,
                                position: {
                                    x: 'right',
                                    y: 'top',
                                }
                            }
                        );
                    }
                });
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { BuscarForms() }, []);

    return (
        <div className="modalUsuario">
            <div className="wrapperModalUsuario">
                <div className="headerModal">
                    <p className="pHeaderModal">CADASTRO DE USUÁRIO</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <form form encType="multipart/form-data" className="conteudoUsuario">
                    <input type="file" id="ImagemUsuario" accept="image/png; image/jpeg" className='imgCadastrar' style={{ cursor: 'pointer' }}>
                        {/* <FontAwesomeIcon icon={faImage} color="white" size="5x" /> */}
                    </input>
                    <div className='formularioCadastro'>
                        <div className='juntaInputsUsuario'>
                            <div className='inputs-esq'>
                                <input className='inputUsuario' type='text' name='nome' placeholder='Nome' required onChange={(e) => setNome(e.target.value)} />
                                <MaskedInput className='inputUsuario' type='number' mask="999.999.999-99" placeholder='CPF' name='cpf' required onChange={(e) => setCPF(e.target.value)} />
                                <input className='inputUsuario' type='password' placeholder='Senha' name='senha' required onChange={(e) => setSenha(e.target.value)} />
                            </div>
                            <div className='inputs-dir'>
                                <input className='inputUsuario' type='text' name='sobrenome' placeholder='Sobrenome' required onChange={(e) => setSobrenome(e.target.value)} />
                                <select className='inputUsuario selectUsuario' type='text' name='Tipo de Usuário' onChange={(e) => setIdTipoUsuario(e.target.value)}>
                                    <option value='0' disabled selected >Tipo de usuário</option>
                                    {TiposUsuarios.map((tipoUsuario) => {
                                        return (
                                            <option key={tipoUsuario.idTipoUsuario} value={tipoUsuario.idTipoUsuario}>
                                                {tipoUsuario.nomeTipoUsuario}
                                            </option>
                                        )
                                    })}
                                </select>
                                <MaskedInput className='inputUsuario' type='phone' name='tel' placeholder='Telefone' mask="(99) 99999-9999" required onChange={(e) => setTelefone(e.target.value)} />
                            </div>
                        </div>
                        <button onClick={(e) => CadastrarUsuario(e)} className='btn_cadastroUsuario' type='submit'>
                            <p className='pCadastro'>Cadastrar</p>
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default Modal;