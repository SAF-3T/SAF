import { Component } from "react";
import React from 'react';
import jwtDecode from 'jwt-decode';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    ImageBackground,
    AsyncStorage,
    Button,
  } from 'react-native';
  import api from '../services/api';
  import Header from '../components/Header'

  export default class Checkin extends Component {

    constructor(props){
        super(props);
        this.state = {
            tipoAutorizacao: 0,
            idUsuario: 0,
            idVeiculo: 0,
            nomeTipoVeiculo: '',
            placaVeiculo: '',
            statusVeiculo: '',
            estadoPneus: false,
            estadoFreio: false,
            estadoMotor: false,
            estadoTransmissao: false,
            estadoRodas: false,
            combustivel: false,
            estadoTransmissao: false

        };
    }
    cadastrarCheckIn = async() => {
        if (this.estadoFreio && this.estadoMotor && this.estadoPneus && this.estadoRodas && this.estadoTransmissao && this.combustivel)    
        {
            
        }

    }

    buscarInfosUsuario = async() => {
        const token = await AsyncStorage.getItem('userToken')
        //console.warn(token)
        this.tipoAutorizacao = await jwtDecode(token).role;
        this.idUsuario = await jwtDecode(token).jti
        const resposta = await api.get('/Usuarios/BuscarPorId/'+ this.idUsuario)
        this.nomeU = resposta.data.nome
        this.idVeiculo = resposta.data.idVeiculo
        //console.warn(resposta.data)
        this.setState({ nomeU: resposta.data.nome })
        this.setState({ idVeiculo: resposta.data.idVeiculo })
        this.setState({ funcaoU: resposta.data.idTipoUsuarioNavigation.nomeTipoUsuario })

        console.warn(this.nomeU)
        console.warn(this.idVeiculo)
    }

    buscarInfosVeiculos = async() => {
        const resposta = await api.get('/BuscarVeiculo/'+ this.idVeiculo)
        this.nomeTipoVeiculo = resposta.data.idTipoVeiculoNavigation.nomeTipoVeiculo
        this.placaVeiculo = resposta.data.placa
        this.statusVeiculo = resposta.data.idStatusNavigation.nomeStatus
        this.setState({ nomeTipoVeiculo : resposta.data.idTipoVeiculoNavigation.nomeTipoVeiculo })
        this.setState({ placaVeiculo : resposta.data.placa })
        this.setState({ statusVeiculo : resposta.data.idStatusNavigation.nomeStatus })
        console.warn(resposta.data)
        console.warn('Buscou veículos')
    }
    
    mudarTruePneus = async() => {
        this.setState({ })
    }

    componentDidMount() { this.buscarInfosUsuario(), this.buscarInfosVeiculos() }

    render() {
        return(
            <View style={styles.main}>
                <Header/>
                <View style={styles.background}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Text style={styles.placa}> SEX-6969{this.placaVeiculo}</Text>
                            <Text style={styles.tipoVeiculo}>Caminhão {this.nomeTipoVeiculo}</Text>
                            <Text style={styles.status}>Na garagem{this.statusVeiculo}</Text>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.containerItens}>
                                <View style={styles.containerDivisaoItens}>
                                    <Text style={styles.textItem}>Pneus</Text>
                                </View>
                                <View style={styles.containerDivisaoItens}>
                                    <TouchableOpacity onPress={() => this.setState({estadoPneus : true}),() => this.estadoPneus = true}>
                                        {this.estadoPneus?
                                            <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({estadoPneus : false}), () => this.estadoPneus = false}>
                                        {this.estadoPneus?
                                            <Image style={styles.icon} source={require('../../assets/img/xApagado.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/x.png')} />
                                        }    
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image style={styles.icon} source={require('../../assets/img/clip.png')} /> 
                                    </TouchableOpacity>                                  
                                </View>
                            </View>
                            <View style={styles.containerItens}>
                                <View style={styles.containerDivisaoItens}>
                                    <Text style={styles.textItem}>Pastilhas de freio</Text>
                                </View>
                                <View style={styles.containerDivisaoItens}>
                                    <TouchableOpacity onPress={() => this.setState({estadoFreio : true})}>
                                        {this.estadoFreio?
                                            <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({estadoFreio : false})}>
                                        {this.estadoFreio?
                                            <Image style={styles.icon} source={require('../../assets/img/xApagado.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/x.png')} />
                                        }    
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image style={styles.icon} source={require('../../assets/img/clip.png')} /> 
                                    </TouchableOpacity>                                  
                                </View>
                            </View>
                            <View style={styles.containerItens}>
                                <View style={styles.containerDivisaoItens}>
                                    <Text style={styles.textItem}>Motor</Text>
                                </View>
                                <View style={styles.containerDivisaoItens}>
                                    <TouchableOpacity onPress={() => this.setState({estadoMotor : true})}>
                                        {this.estadoMotor?
                                            <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({estadoMotor : false})}>
                                        {this.estadoMotor?
                                            <Image style={styles.icon} source={require('../../assets/img/xApagado.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/x.png')} />
                                        }   
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image style={styles.icon} source={require('../../assets/img/clip.png')} /> 
                                    </TouchableOpacity>                                  
                                </View>
                            </View>
                            <View style={styles.containerItens}>
                                <View style={styles.containerDivisaoItens}>
                                    <Text style={styles.textItem}>Trasmissão</Text>
                                </View>
                                <View style={styles.containerDivisaoItens}>
                                    <TouchableOpacity onPress={() => this.setState({estadoTransmissao : true})}>
                                        {this.estadoTransmissao?
                                            <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({estadoTransmissao : false})}>
                                        {this.estadoTransmissao?
                                            <Image style={styles.icon} source={require('../../assets/img/xApagado.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/x.png')} />
                                        }    
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image style={styles.icon} source={require('../../assets/img/clip.png')} /> 
                                    </TouchableOpacity>                                  
                                </View>
                            </View>
                            <View style={styles.containerItens}>
                                <View style={styles.containerDivisaoItens}>
                                    <Text style={styles.textItem}>Rodas</Text>
                                </View>
                                <View style={styles.containerDivisaoItens}>
                                    <TouchableOpacity onPress={() => this.setState({estadoRodas : true})}>
                                        {this.estadoRodas?
                                            <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                        }
                                    </TouchableOpacity >
                                    <TouchableOpacity onPress={() => this.setState({estadoRodas : false})}>
                                        {this.estadoRodas?
                                            <Image style={styles.icon} source={require('../../assets/img/xApagado.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/x.png')} />
                                        }    
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image style={styles.icon} source={require('../../assets/img/clip.png')} /> 
                                    </TouchableOpacity>                                  
                                </View>
                            </View>
                            <View style={styles.containerItens}>
                                <View style={styles.containerDivisaoItens}>
                                    <Text style={styles.textItem}>Tanques de combustível</Text>
                                </View>
                                <View style={styles.containerDivisaoItens}>
                                    <TouchableOpacity onPress={() => this.setState({combustivel : true})}>
                                        {this.combustivel?
                                            <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({combustivel : false})}>
                                        {this.combustivel?
                                            <Image style={styles.icon} source={require('../../assets/img/xApagado.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/x.png')} />
                                        }   
                                    </TouchableOpacity>
                                    <TouchableOpacity >
                                        <Image style={styles.icon} source={require('../../assets/img/clip.png')} /> 
                                    </TouchableOpacity>                                  
                                </View>
                            </View>
                        </View>
                        <View style={styles.containerBotao}>
                            <TouchableOpacity onPress={ () => this.cadastrarCheckIn()} style={styles.btnProsseguir}>
                                <Text style={styles.btnText}>Prosseguir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#0F282D',
    },
    header: {
        flex: 1,
    },
    background: {
        flex: 1,
        backgroundColor: '#0F282D',
        height: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        backgroundColor: 'white',
        width: 320,
        height: 500,
        borderRadius: 5
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 3
    },
    containerBotao: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    containerItens: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 6,
        marginBottom: 6,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    placa: {
        fontWeight: '700',
        fontSize: 15
    },
    tipoVeiculo: {
        fontSize: 20,
        fontWeight: '700'
    },
    status: {
        fontWeight: '700',
        fontSize: 15
    },
    btnProsseguir: {
        backgroundColor: '#0F282D',
        width: 200,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    textItem: {
        fontSize: 16,
        fontWeight: 'normal',
        
    },
    icon: {
        marginLeft: 15
    },
    containerDivisaoItens: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    }


})