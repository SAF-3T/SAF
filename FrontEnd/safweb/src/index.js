import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from './services/auth';

import './index.css';

import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login/login';
import Veiculos from './pages/veiculos/veiculos';
import Usuarios from './pages/usuarios/usuarios';
import Carrocerias from './pages/carrocerias/carroceria';
import Cargas from './pages/cargas/cargas';
import Checklists from './pages/checklists/checklist';
import Erros from './pages/erros/Erro.jsx';

import reportWebVitals from './reportWebVitals';

// const PermissaoGestor = ({ component: Component }) => (
//   <Route
//     render={(props) =>
//       usuarioAutenticado() && parseJwt().role === '1' ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/dashboard" />
//       )
//     }
//   />
// );

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/veiculos" component={Veiculos} />
        <Route path="/carrocerias" component={Carrocerias} />
        <Route path="/cargas" component={Cargas} />
        <Route path="/usuarios" component={Usuarios} />
        <Route path="/erros" component={Erros} />
        {/* <Route path="/checklists" component={Checklists} /> */}
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
reportWebVitals();