import React, { Component } from "react";

import { Link } from 'react-router-dom';

import '../pages/dashboard/App.css';

class Sidebar extends Component {

    render() {
        return (
            <nav>
                <div className="links">
                    <Link className="removerLink" to="/veiculos"><div className="link1">Veículos</div></Link>
                    <Link className="removerLink" to="/motoristas"><div className="link2">Motoristas</div></Link>
                    <Link className="removerLink" to="/usuarios"><div className="link1">Usuários</div></Link>
                    <Link className="removerLink" to="/carroceria"><div className="link2">Carroceria</div></Link>
                    <Link className="removerLink" to="/check-ins"><div className="link1">Check-ins</div></Link>
                    <Link className="removerLink" to="/check-outs"><div className="link2">Check-outs</div></Link>
                    <Link className="removerLink" to="/preventivas"><div className="link1">Preventivas</div></Link>
                    <Link className="removerLink" to="/corretivas"><div className="link2">Corretivas</div></Link>
                </div>
            </nav>
        );
    };
}

export default Sidebar;