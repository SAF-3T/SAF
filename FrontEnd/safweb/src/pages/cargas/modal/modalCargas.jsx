import { useState } from 'react';

import axios from 'axios';

import './modalCargas.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { } }) => {

    const [Carga, setCarga] = useState([]);

    function CadastrarCarga(event) {

        event.preventDefault();

        axios.post('http://localhost:5000/api/TipoCargas', {
            nomeTipoCarga : Carga
        }
            .then(resposta => {
                if (resposta.status === 201) {
                    console.log('Carga cadastrada')
                    setCarga('');
                }
            })
            .catch(erro => console.log(erro))
        );
    };


    return (
        <div className="modal">
            <div className="wrapperModalCargas">
                <div className="headerModal">
                    <p className="pHeaderModal">CADASTRO DE CARGA</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudosCargas">
                    <form className='conteudoCarga' onSubmit={CadastrarCarga}>
                        <input required type='text' className='inputCarga' placeholder='Tipo de carga' value={Carga} onChange={event => setCarga(event.target.value)}  />
                        <button className='btn_cadastroCarga' type='submit' onClick={onClose}><p className='pBtnCadastroCarga' >Cadastrar</p></button>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default Modal;