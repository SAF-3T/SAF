import { useState, useEffect } from 'react';

import React from 'react';

import '../modal/modalChecklist.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { } }) => {

    const [ TipoCheckList, setTipoCheckList ] = useState([]); //Listar tipo do checklist para concatenar com o modal

    return (
        <div className="modalChecklist">
            <div className="wrapperModalChecklists">
                <div className="headerModal">
                    <p className="pHeaderModal">CHECKLIST</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>

                <table>
                    <tr>
                        <th>Tipo de erro</th>
                        <th>Descrição</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </table>

            </div>
        </div >
    );
};

export default Modal;