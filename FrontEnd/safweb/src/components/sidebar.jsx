import React, { Component } from "react";

import { Link } from 'react-router-dom';

import '../pages/dashboard/App.css';

class Sidebar extends Component {

    render() {
        return (
            <nav>
                <div className="links">
                    <a href="#"><div className="imagemLogo"></div></a>
                    <div className="link1"></div>
                    <div className="link2"></div>
                    <div className="link1"></div>
                    <div className="link2"></div>
                    <div className="link1"></div>
                </div>
            </nav>
            
        );
    };
}

export default Sidebar;