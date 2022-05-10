import { Component } from "react";
import { useState, useEffect } from 'react';
import React from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
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


export default function Preventiva() {
    const [ tipoAutorizacao, setTipoAutorizacao ] = useState( 0 );
    const [ idUsuario, setIdUsuario ] = useState( 0 );
    const [ idVeiculo, setIdVeiculo ] = useState( 0 );
    const [ idCheckList, setIdCheckList ] = useState( 0 );
    const [ idStatus, setIdStatus ] = useState( 0 );
    const [ nomeTipoVeiculo, setNomeTipoVeiculo ] = useState( '' );
    const [ nomeU, setNomeU ] = useState( '' );
    const [ placaVeiculo, setPlacaVeiculo ] = useState( '' );
    const [ statusVeiculo, setStatusVeiculo ] = useState( '' );
    const [ estadoPneus, setEstadoPneus ] = useState( false );
    const [ estadoFreio, setEstadoFreio ] = useState( false );
    const [ estadoMotor, setEstadoMotor ] = useState( false );
    const [ estadoTransmissao, setEstadoTransmissao ] = useState( false );
    const [ estadoRodas, setEstadoRodas ] = useState( false );
    const [ combustivel, setCombustivel ] = useState( false );
    const [ dataAtual, setDataAtual ] = useState( '' );


    async function cadastrarCheckIn() {
        setDataAtual(new Date().toString())
        let corpoChecklist = {
            idTipoCheckList: 3,
            idVeiculo: 2,
            idUsuario: idUsuario,
            dataCheckList: dataAtual
        }
        axios.post('https://backend-saf-api.azurewebsites.net/api/CheckList',corpoChecklist)
        .then(resposta => {
            if (resposta.status === 201) {
                console.warn('CheckList cadastrada!')
                console.warn(resposta)
                setIdCheckList(resposta.data.idCheckList)
            }
        })
        .catch(error => console.warn(error))
        

        if (estadoPneus === false) {
            var respostaPneu = await api.post('/Erro',
            {
                idTipoErro : 3,
                idCheckList : idCheckList,
                descricaoErro : 'Pneu furado!'
            })
            if (respostaPneu.status === 201) {
                console.warn('Erro de pneu cadastrado')
            }
            
        }
        if (estadoFreio === false) {
            var respostaFreio = await api.post('/Erro',
            {
                idTipoErro : 8,
                idCheckList : idCheckList,
                descricaoErro : 'Freio travado!'
            })
            if (respostaFreio.status === 201) {
                console.warn('Erro de pneu cadastrado')
            }
        }
        if (estadoMotor === false) {
            var respostaMotor = await api.post('/Erro',
            {
                idTipoErro : 5,
                idCheckList : idCheckList,
                descricaoErro : 'Motor sobreaquecido!'
            })
            if (respostaMotor.status === 201) {
                console.warn('Erro de motor cadastrado')
            }
        }
        if (estadoTransmissao === false) {
            var respostaTransmissao = await api.post('/Erro', 
            {
                idTipoErro : 7,
                idCheckList : idCheckList,
                descricaoErro : 'Transmissão com problemas!'
            })
            if (respostaTransmissao.status === 201) {
                console.warn('Erro de transmissao cadastrado')
            }
        }
        if (estadoRodas === false) {
            var respostaRodas = await api.post('/Erro',
            {
                idTipoErro : 4,
                idCheckList : idCheckList,
                descricaoErro : 'Rodas amassadas!'
            })
            if (respostaRodas.status === 201) {
                console.warn('Erro de rodas cadastrado')
            }
        }
        if (combustivel === false) {
            var respostaCombustivel = await api.post('/Erro', 
            {
                idTipoErro : 6,
                idCheckList : idCheckList,
                descricaoErro : 'Sem combustível!'
            })
            if (respostaCombustivel.status === 201) {
                console.warn('Erro de combustivel cadastrado')
            }
        }

        navigation.navigate('TelaCadastro')
    }

    async function buscaInfoVeiculo() {
        const token = await AsyncStorage.getItem('userToken')
        setIdUsuario(jwtDecode(token).jti)
        axios('https://backend-saf-api.azurewebsites.net/BuscarVeiculo/2')
        .then(response => {
            if(response.status === 200)
            {
                console.warn(response)
                setPlacaVeiculo(response.data.placa)
                setStatusVeiculo(response.data.idStatusNavigation.nomeStatus)
                setNomeTipoVeiculo(response.data.idTipoVeiculoNavigation.nomeTipoVeiculo)
            }
        })
    }

    useEffect(buscaInfoVeiculo, [])

    return(
        <View style={styles.main}>
                <Header/>
                <View style={styles.background}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Text style={styles.placa}>Preventiva</Text>
                            <Text style={styles.placa}>{placaVeiculo}</Text>
                            <Text style={styles.tipoVeiculo}>{nomeTipoVeiculo}</Text>
                            <Text style={styles.status}>{statusVeiculo}</Text>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.containerItens}>
                                <View style={styles.containerDivisaoItens}>
                                    <Text style={styles.textItem}>Pneus</Text>
                                </View>
                                <View style={styles.containerDivisaoItens}>
                                    <TouchableOpacity onPress={() => setEstadoPneus(true)}>
                                        {estadoPneus?
                                            <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>setEstadoPneus(false)}>
                                        {estadoPneus?
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
                                    <TouchableOpacity onPress={() => setEstadoFreio(true)}>
                                        {estadoFreio?
                                            <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setEstadoFreio(false)}>
                                        {estadoFreio?
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
                                    <TouchableOpacity onPress={() => setEstadoMotor(true)}>
                                        {estadoMotor?
                                            <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setEstadoMotor(false)}>
                                        {estadoMotor?
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
                                    <TouchableOpacity onPress={() => setEstadoTransmissao(true)}>
                                        {estadoTransmissao?
                                            <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setEstadoTransmissao(false)}>
                                        {estadoTransmissao?
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
                                    <TouchableOpacity onPress={() => setEstadoRodas(true)}>
                                        {estadoRodas?
                                            <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                        }
                                    </TouchableOpacity >
                                    <TouchableOpacity onPress={() => setEstadoRodas(false)}>
                                        {estadoRodas?
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
                                    <TouchableOpacity onPress={() => setCombustivel(true)}>
                                        {combustivel?
                                            <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setCombustivel(false)}>
                                        {combustivel?
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
                            <TouchableOpacity onPress={ () => cadastrarCheckIn()} style={styles.btnProsseguir}>
                                <Text style={styles.btnText}>Prosseguir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
            </View>
    )
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