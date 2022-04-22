import Header from '../../components/headers/header';
import Sidebar5 from '../../components/sidebars/sidebar5';
import Footer from '../../components/footer';

// import { useState, useEffect } from 'react';

// import Modal from '../../components/modal';

import './checklist.css';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus } from '@fortawesome/free-solid-svg-icons'


export default function Checklists() {

    // const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <div>
            <Sidebar5 />
            <Header />

            <main>
                <div className="wrapperChecklist">
                    <p className="pChecklist">Checklists</p>

                    <div className="input-e-btn">
                        {/* <button className="addChecklist" type='submit' onClick={() => setIsModalVisible(true)}><FontAwesomeIcon className="iconPlus" icon={faPlus} color="#fff" size="lg" />Novo checklist</button>{isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}></Modal>) : null} */}
                        <div className="input-e-btn-2">
                            <input className='inputBusca' type="text" placeholder="Pesquisar" />
                            <button className='btnBuscar' type='submit'><p>Buscar</p></button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        
        </div >
    );
};