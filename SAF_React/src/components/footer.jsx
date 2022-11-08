import React, { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'


import '../assets/css/App.css';

class Footer extends Component {

    render() {
        return (
            <div>
                <footer>
                    <div className="wrapperFooter">
                        <div className="conteudoFooter">
                            <div className="linkDireitoFooter">
                                <div className="imagemFooter"></div>
                                <p>Todos os direitos reservados a SAF.</p>
                            </div>
                            <div className="linkEsquerdoFooter">
                                <FontAwesomeIcon icon={faGithub} color="#FFFFFF" size='2x' />
                                <span style={{ color: '#FFF' }}>|</span>
                                <a href="https://github.com/SAF-SENAI-3T/SAF-3T" target="_blank" className="pLinkEsquerdoFooter">Acesse nosso portifólio no GitHub</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;