import { useState, useEffect } from 'react';

import React from 'react';
import axios from 'axios';

import '../checklist.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { } }) => {

    const [TipoCheckList, setTipoCheckList] = useState([]); //Listar tipo do checklist para concatenar com o modal
    const [ListaChecklist, setListaChecklist] = useState([]);


    function buscarChecklistErroPorId() {
        axios('http://backend-saf-api.azurewebsites.net/api/Erro/Checklist/1')
            .then(response => {
                if (response.status === 200) {
                    setListaChecklist(response.data);
                }
            })
            .catch(erro => console.log(erro));
    };

    function buscarChecklistPorId() {
        axios('http://backend-saf-api.azurewebsites.net/api/Checklist/1')
            .then(response => {
                if (response.status === 200) {
                    setTipoCheckList(response.data);
                    console.log(response.data)
                }
            })
            .catch(erro => console.log(erro));
    }

    useEffect(buscarChecklistErroPorId, []);
    useEffect(buscarChecklistPorId, []);

    return (
        <div className="modalChecklist">
            <div className="wrapperModalChecklists">
                
                            <div className="headerModal">
                                <p className="pHeaderModal">CHECKLIST {}</p>
                                <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                            </div>

                        
                <table>
                    <tr>
                        <th>Tipo de erro</th>
                        <th>Descrição</th>
                    </tr>
                    {
                        ListaChecklist.map((checklist) => {
                            return (
                                <tr>
                                    <td>{checklist.idTipoErroNavigation.nomeTipoErro}</td>
                                    <td>{checklist.descricaoErro}</td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div >
    );
};

export default Modal;