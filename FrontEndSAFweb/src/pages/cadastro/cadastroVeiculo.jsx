import HeaderDashBoard from '../../components/headerDashboard';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';

export default class CadastroVeiculo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idVeiculo: 0,
            TipoVeiculo: '',
            Placa: '',
            Marca: '',
            Status: '',
            idCarroceria: 0,
            Cubagem: '',
            Peso: '',
            TipoCarroceria: '',
            Carga: ''
        }
    };

    buscaVeiculo = () => {
        axios.get('http://localhost:5000/api/' + this.state.idVeiculo)
    .then(response => {
        
    })
    }

}