import React from 'react';

import './App.css';

import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';
import HeaderDashBoard from '../../components/headerDashboard';

function dashboard() {
  return (
    <div>
      {/* <Header/> */}

      <HeaderDashBoard />

      <Sidebar />

      <Footer />
    </div>
  );
}

export default dashboard;
