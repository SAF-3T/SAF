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

    const initialValues = {
        cpf: '',
        tel: ''
    };

    const [values, setValues] = useState(initialValues)

    function handleChange(event) {
        setValues({
            ...values,
            [event.target.value]: event.target.value
        });
    }

    //Cadastrar
    const [IdTipoUsuario, setIdTipoUsuario] = useState('');
    const [Senha, setSenha] = useState('');
    const [CPF, setCPF] = useState('');
    const [DDD, setDDD] = useState('');
    const [Nome, setNome] = useState('');
    const [Sobrenome, setSobrenome] = useState('');
    const [Telefone, setTelefone] = useState('');
    const [Digitado, setDigitado] = useState('');

    //Listar
    const [TiposUsuarios, setTiposUsuarios] = useState([]);


    function BuscarForms() {
        axios.get('https://backend-saf-api.azurewebsites.net/api/TipoUsuarios')
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
        formData.append('CPF', CPF);
        formData.append('DDD', DDD);
        formData.append('nome', Nome);
        formData.append('sobrenome', Sobrenome);
        formData.append('telefone', Telefone);

        try {
            axios({
                method: "post",
                url: "https://backend-saf-api.azurewebsites.net/api/Usuarios",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((resposta) => {
                    if (resposta.status === 201) {
                        onClose()
                        notyf.success(
                            {
                                message: 'Usuario cadastrado com êxito.',
                                duration: 3000,
                                position: {
                                    x: 'right',
                                    y: 'top',
                                }
                            }
                        );
                    }
                    if (resposta.status === 204) {
                        notyf.error(
                            {
                                message: 'CPF ou telefone já cadastrado',
                                duration: 3000,
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

    function PegarDDD() {
        let PrimeiroNumero = Digitado.slice()[0];
        let SegundoNumero = Digitado.slice()[1];

        let Terceiro = Digitado.slice()[2];
        let Quarto = Digitado.slice()[3];
        let Quinto = Digitado.slice()[4];
        let Sexto = Digitado.slice()[5];
        let Setimo = Digitado.slice()[6];
        let Oitavo = Digitado.slice()[7];
        let Nono = Digitado.slice()[8];
        let Onze = Digitado.slice()[9];
        let Doze = Digitado.slice()[10];

        let telefone = Terceiro + Quarto + Quinto + Sexto + Setimo + Oitavo + Nono + Onze + Doze;

        setTelefone(telefone);

        setDDD(PrimeiroNumero + SegundoNumero)
    }

    useEffect(() => { BuscarForms() }, []);
    useEffect(PegarDDD, [Digitado])

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
                                <MaskedInput className='inputUsuario' placeholder='CPF' name='cpf' mask="999.999.999-99" value={CPF} required onChange={(e) => setCPF(e.target.value)} />
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
                                <MaskedInput className='inputUsuario' name="tel" placeholder='Telefone' mask="(99) 99999-9999" value={Digitado} onChange={(tel) => setDigitado(tel.target.value)} />
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