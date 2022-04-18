import React, { Component } from "react";

import axios from "axios";

import { Link } from 'react-router-dom';

import '../../pages/dashboard/App.css';

class Header extends Component {

    render() {
        return (
            <div>
                <header>
                    <div className="wrapper">
                        <Link to="/dashboard"><div className="imagemLogo"></div></Link>
                        <a href="#"><div className="imagemUsuario"></div></a>
                    </div>
                </header>
            </div>
        );
    }
}

export default Header;