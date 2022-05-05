import React, { useState } from "react";

// import axios from "axios";

import { Link } from 'react-router-dom';

import '../../assets/css/App.css';

export default function Header() {

    const [ImagemUsuario, setImagemUsuario] = useState('');

    return (
        <div>
            <header>
                <div className="wrapper">
                    <Link to="/dashboard"><div className="imagemLogo"></div></Link>
                    <img src={"http://backend-saf-api.azurewebsites.net/Img/" + ImagemUsuario} className="imagemUsuario" />
                </div>
            </header>
        </div>
    );
}