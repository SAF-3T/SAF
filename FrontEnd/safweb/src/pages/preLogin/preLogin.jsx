import React from "react";

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import './preLogin.css'

export default function PreLogin() {


    return (
        <div className="backgroundPreLogin">
            <div className='linksPreLogin'>
                <div className='divEsqPreLogin' />
                <div className="LogoPreLogin" />
                <div className='divDirPreLogin'>
                <Link style={{textDecoration: 'none', color: 'inherit'}} to="/login"><button className='btnPreLogin'>Entrar</button></Link>
                </div>
            </div>

            <h1 className="h1PreLogin">Com a temática de gestão e administração de frotas, a SAF pode ofercer à você:</h1>

            <main>
                <div className="cardsPreLogin">
                    <div className="cardPreLogin">
                        <div className="imgCard img1" />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo sapiente excepturi iste corporis quos libero voluptate aut consequatur, facere eveniet fugit accusamus ab blanditiis ad quaerat numquam, quam quo dignissimos?</p>
                    </div>
                    <div className="cardPreLogin">
                        <div className="imgCard img2"/>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo sapiente excepturi iste corporis quos libero voluptate aut consequatur, facere eveniet fugit accusamus ab blanditiis ad quaerat numquam, quam quo dignissimos?</p>
                    </div>
                    <div className="cardPreLogin">
                        <div className="imgCard img3" />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo sapiente excepturi iste corporis quos libero voluptate aut consequatur, facere eveniet fugit accusamus ab blanditiis ad quaerat numquam, quam quo dignissimos?</p>
                    </div>
                </div>
            </main>

            <footer className="footerPreLogin">
                <FontAwesomeIcon icon={faGithub} color="#FFFFFF" size='2x' />
                <span style={{ color: '#FFF' }}>|</span>
                <a href="https://github.com/SAF-SENAI-3T/SAF-3T" target="blank" className="pLinkEsquerdoFooter"><strong>Acesse nosso portifólio no GitHub</strong></a>
            </footer>
        </div>
    )
}