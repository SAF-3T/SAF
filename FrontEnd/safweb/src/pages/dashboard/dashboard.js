import React from 'react';

import './App.css';

import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';

function dashboard() {
  return (
    <div>

    {/* Agrupar: 
        veiculos com carrocerias
        Motoristas com usuarios
        check-ins, check-outs, preventivas e corretivas em checklists */}

      <Header />
      <Sidebar />
      <Footer />
    </div>
  );
}

export default dashboard;
