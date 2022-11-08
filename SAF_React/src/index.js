import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';

import './index.css';

import Dashboard from './pages/dashboard/dashboard';
import preLogin from './pages/preLogin/preLogin';
import Login from './pages/login/login';
import Veiculos from './pages/veiculos/veiculos';
import Usuarios from './pages/usuarios/usuarios';
import Carrocerias from './pages/carrocerias/carroceria';
import ListarCarga from './pages/cargas/cargas';
import Checklists from './pages/checklists/checklist';
import NotFound from './pages/notFound/notFound';

import reportWebVitals from './reportWebVitals';

const routing = (

  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={preLogin} />
        <Route exact path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/veiculos" component={Veiculos} />
        <Route path="/carrocerias" component={Carrocerias} />
        <Route path="/cargas" component={ListarCarga} />
        <Route path="/usuarios" component={Usuarios} />
        <Route path="/checklists" component={Checklists} />
        <Route path="/notFound" component={NotFound} />
        <Redirect to="/notFound" />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
reportWebVitals();