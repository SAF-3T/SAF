import React, { Component } from "react";

import '../pages/dashboard/App.css';

class Footer extends Component {

    render() {
        return (
            <div>
                <footer>
                    <div className="wrapperFooter">
                        <div className="imagemFooter"></div>
                        <p>Todos os direitos reservados a SAF.</p>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;