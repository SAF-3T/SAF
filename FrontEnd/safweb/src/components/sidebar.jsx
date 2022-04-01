import React, { Component } from "react";

import { Link } from 'react-router-dom';

import '../pages/dashboard/App.css';

import Footer from '../components/footer';

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
                        <div className="link1"><FontAwesomeIcon icon={faTruck} color="#0E758C" size="lg" /></div>
                        <div className="link2"><FontAwesomeIcon icon={faTruckRampBox} color="#0E758C" size="lg" /></div>
                        <div className="link1"><FontAwesomeIcon icon={faTruckArrowRight} color="#0E758C" size="lg" /></div>
                        <div className="link2"><FontAwesomeIcon icon={faUsers} color="#0E758C" size="lg" /></div>
                        <div className="link1"><FontAwesomeIcon icon={faListCheck} color="#0E758C" size="lg" /></div>
                    </div>
                </nav>

                <Footer />
            </div>
        );
    };
}

export default Sidebar;