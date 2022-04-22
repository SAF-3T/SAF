import React, { Component } from "react";

import { Link } from 'react-router-dom';

import '../../assets/css/App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { faTruckRampBox } from '@fortawesome/free-solid-svg-icons'
import { faTruckArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faListCheck } from '@fortawesome/free-solid-svg-icons'

class Sidebar extends Component {

    render() {
        return (
            <div>
                <nav>
                    <div className="links">
                        <div className="link1"><Link to="/veiculos"><FontAwesomeIcon icon={faTruck} color="#0E758C" size="lg" /></Link></div>
                        <div className="link2"><Link to="/carrocerias"><FontAwesomeIcon icon={faTruckRampBox} color="#0E758C" size="lg" /></Link></div>
                        <div className="link1"><Link to="/cargas"><FontAwesomeIcon icon={faTruckArrowRight} color="#0E758C" size="lg" /></Link></div>
                        <div className="link2"><Link to="/usuarios"><FontAwesomeIcon icon={faUsers} color="#0E758C" size="lg" /></Link></div>
                        <div className="link1 linkUltimo iconChecklist"><Link to="/checklists"><FontAwesomeIcon icon={faListCheck} color="#0E758C" size="lg" /></Link></div>
                    </div>
                </nav>
            </div>
        );
    };
}

export default Sidebar;