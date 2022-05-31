import { useState, useEffect } from 'react';

import React from 'react';

import '../modalEdit/modalEditCarrocerias.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const Modal = ({ onClose = () => { } }) => {

    const [TiposCarrocerias, setTiposCarrocerias] = useState([])
    const [IdTipoCarga, setIdTipoCarga] = useState('')
    const [IdTipoCarroceria, setIdTipoCarroceria] = useState('')
    const [Cubagem, setCubagem] = useState('')
    const [Peso, setPeso] = useState('')

    function BuscarCarroceria() {
        axios.get('https://backend-saf-api.azurewebsites.net/BuscaId/1')
            .then(response => {
                console.log(response.data);
            })

        axios.get('https://backend-saf-api.azurewebsites.net/api/TipoCarroceria')
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                }
            })
    }

    function AtualizarCarroceria() {
        axios.put('https://backend-saf-api.azurewebsites.net/Alterar/4', {
            idTipoCarga: 6,
            idTipoCarroceria: 1,
            cubagem: Cubagem,
            peso: Peso
        })
        .then(response => {
            if(response.status === 200){
                console.log("Atualizado")
            }
        })
    }

    useEffect(BuscarCarroceria, [])


    return (
        <div className="modalCarroceria">
            <div className="wrapperModalCarrocerias1">
                <div className="headerModal">
                    <p className="pHeaderModal">ATUALIZAR CARROCERIA</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className="conteudosCarrocerias1">
                    <form className='conteudoCarroceriaModal' onSubmit={AtualizarCarroceria}>
                        <div className="inputsCarroceria" >
                            <select className='inputSelect' type='text' placeholder="Tipo de carroceria" name='carroceria' required onChange={(e) => setIdTipoCarroceria(e.target.value)}>
                                <option value='0' disabled selected >Tipo da carroceria</option>
                                {TiposCarrocerias.map((tipo) => {
                                    return (
                                        <option value={tipo.idTipoCarroceria}>
                                            {tipo.idTipoCarroceriaNavigation.nomeTipoCarroceria}
                                        </option>
                                    )
                                })}
                            </select>
                            <input className='inputCarroceria1' type='number' placeholder="Cubagem (m³)" name='carroceria' required onChange={(e) => setCubagem(e.target.value)} />
                            <input className='inputCarroceria1' type='number' placeholder="Peso (kg)" name='carroceria' required onChange={(e) => setPeso(e.target.value)} />
                        </div>
                        <button className='btn_cadastroCarroceria' type='submit'><p className='pBtnCadastroCarroceria'>Cadastrar</p></button>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default Modal;