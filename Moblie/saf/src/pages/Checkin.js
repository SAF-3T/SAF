import { Component } from "react";
import { useState, useEffect } from 'react';
import React from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
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
    Modal
  } from 'react-native';
  import api from '../services/api';
  import Header from '../components/Header'


export default function Checkin() {
    const [ tipoAutorizacao, setTipoAutorizacao ] = useState( 0 );
    const [ idUsuario, setIdUsuario ] = useState( 0 );
    const [ idVeiculo, setIdVeiculo ] = useState( 0 );
    const [ idCheckList, setIdCheckList ] = useState( 0 );
    const [ idStatus, setIdStatus ] = useState( 0 );
    const [ nomeTipoVeiculo, setNomeTipoVeiculo ] = useState( '' );
    const [ nomeU, setNomeU ] = useState( '' );
    const [ placaVeiculo, setPlacaVeiculo ] = useState( '' );
    const [ statusVeiculo, setStatusVeiculo ] = useState( '' );
    
    const [ dianteira, setDianteira ] = useState( false );
    const [ dianteiraModal, setDianteiraModal ] = useState( false );
    const [ dianteiraImg, setDianteiraImg ] = useState( '' );

    
    const [ traseira, setTraseira ] = useState( false );
    const [ traseiraModal, setTraseiraModal ] = useState( false );
    const [ traseiraImg, setTraseiraImg ] = useState( '' );

    
    const [ lateralEsquerda, setLateralEsquerda ] = useState( false );
    const [ lateralEsquerdaModal, setLateralEsquerdaModal ] = useState( false );
    const [ lateralEsquerdaImg, setLateralEsquerdaImg ] = useState( '' );


    const [ lateralDireita, setLateralDireita ] = useState( false );
    const [ lateralDireitaModal, setLateralDireitaModal ] = useState( false );
    const [ lateralDireitaImg, setLateralDireitaImg ] = useState( '' );


    const [ dataAtual, setDataAtual ] = useState( '' );
    var navigation = useNavigation()

    const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


    async function cadastrarCheckIn() {
        setDataAtual('2022-05-05')
        // console.warn(dataAtual)
        let corpoChecklist = {
            idTipoCheckList: 1,
            idVeiculo: 2,
            idUsuario: idUsuario,
            dataCheckList: dataAtual
        }
        axios.post('https://backend-saf-api.azurewebsites.net/api/CheckList',corpoChecklist)
        .then(resposta => {
            if (resposta.status === 201) {
                console.warn('CheckList cadastrada!')
                // console.warn(resposta)
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
        await navigation.goBack() 
    }

    async function buscaInfoVeiculo() {
        const token = await AsyncStorage.getItem('userToken')
        setIdUsuario(jwtDecode(token).jti)
        axios('https://backend-saf-api.azurewebsites.net/BuscarVeiculo/2')
        .then(response => {
            if(response.status === 200)
            {
                // console.warn(response)
                setPlacaVeiculo(response.data.placa)
                setStatusVeiculo(response.data.idStatusNavigation.nomeStatus)
                setNomeTipoVeiculo(response.data.idTipoVeiculoNavigation.nomeTipoVeiculo)
            }
        })
    }

    async function minimizarDianteiraSim() {
        setDianteiraModal(false)
        setDianteira(true)
    }
    async function minimizarDianteiraNao() {
        setDianteiraModal(false)
        setDianteira(false)
    }

    async function minimizarTraseiraSim() {
        setTraseiraModal(false)
        setTraseira(true)
    }
    async function minimizarTraseiraNao() {
        setTraseiraModal(false)
        setTraseira(false)
    }

    async function minimizarLateralEsquerdaSim() {
        setLateralEsquerdaModal(false)
        setLateralEsquerda(true)
    }
    async function minimizarLateralEsquerdaNao() {
        setLateralEsquerdaModal(false)
        setLateralEsquerda(false)
    }

    async function minimizarLateralDireitaSim() {
        setLateralDireitaModal(false)
        setLateralDireita(true)
    }
    async function minimizarLateralDireitaNao() {
        setLateralDireitaModal(false)
        setLateralDireita(false)
    }

    useEffect(buscaInfoVeiculo, [])

    return(
        <View style={styles.main}>
                <Header/>
                <View style={styles.background}>
                    <View style={styles.content}>

                        <Modal
                        animationType="slide"
                        transparent={true}
                        visible={dianteiraModal}
                        >
                            <View style={styles.modal}>
                                <View style={styles.modalContent}>
                                    <View style={styles.modalContainerTextImg}>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Imagem Padrão</Text>
                                            <View style={styles.imgModal}></View>
                                        </View>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Sua imagem</Text>
                                            <View style={styles.imgModal}></View>
                                        </View>
                                    </View>
                                    
                                    
                                    <Text style={styles.modalText}>Taxa de correspondência: XX%</Text>
                                    <Text style={styles.modalText}>Correspondente?</Text>
                                    <View style={styles.modalContainerBotoes}>
                                        <TouchableOpacity style={styles.modalBotaoSim} onPress={() => minimizarDianteiraSim()}><Text style={styles.modalBotaoText}>Sim</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.modalBotaoNao} onPress={() => minimizarDianteiraNao()}><Text style={styles.modalBotaoText}>Não</Text></TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            
                        </Modal>

                        <Modal
                        animationType="slide"
                        transparent={true}
                        visible={traseiraModal}
                        >
                            <View style={styles.modal}>
                                <View style={styles.modalContent}>
                                    <View style={styles.modalContainerTextImg}>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Imagem Padrão</Text>
                                            <View style={styles.imgModal}></View>
                                        </View>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Sua imagem</Text>
                                            <View style={styles.imgModal}></View>
                                        </View>
                                    </View>
                                    
                                    
                                    <Text style={styles.modalText}>Taxa de correspondência: XX%</Text>
                                    <Text style={styles.modalText}>Correspondente?</Text>
                                    <View style={styles.modalContainerBotoes}>
                                        <TouchableOpacity style={styles.modalBotaoSim} onPress={() => minimizarTraseiraSim()}><Text style={styles.modalBotaoText}>Sim</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.modalBotaoNao} onPress={() => minimizarTraseiraNao()}><Text style={styles.modalBotaoText}>Não</Text></TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            
                        </Modal>

                        <Modal
                        animationType="slide"
                        transparent={true}
                        visible={lateralDireitaModal}
                        >
                            <View style={styles.modal}>
                                <View style={styles.modalContent}>
                                    <View style={styles.modalContainerTextImg}>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Imagem Padrão</Text>
                                            <View style={styles.imgModal}></View>
                                        </View>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Sua imagem</Text>
                                            <View style={styles.imgModal}></View>
                                        </View>
                                    </View>
                                    
                                    
                                    <Text style={styles.modalText}>Taxa de correspondência: XX%</Text>
                                    <Text style={styles.modalText}>Correspondente?</Text>
                                    <View style={styles.modalContainerBotoes}>
                                        <TouchableOpacity style={styles.modalBotaoSim} onPress={() => minimizarLateralDireitaSim()}><Text style={styles.modalBotaoText}>Sim</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.modalBotaoNao} onPress={() => minimizarLateralDireitaNao()}><Text style={styles.modalBotaoText}>Não</Text></TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            
                        </Modal>

                        <Modal
                        animationType="slide"
                        transparent={true}
                        visible={lateralEsquerdaModal}
                        >
                            <View style={styles.modal}>
                                <View style={styles.modalContent}>
                                    <View style={styles.modalContainerTextImg}>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Imagem Padrão</Text>
                                            <View style={styles.imgModal}></View>
                                        </View>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Sua imagem</Text>
                                            <View style={styles.imgModal}></View>
                                        </View>
                                    </View>
                                    
                                    
                                    <Text style={styles.modalText}>Taxa de correspondência: XX%</Text>
                                    <Text style={styles.modalText}>Correspondente?</Text>
                                    <View style={styles.modalContainerBotoes}>
                                        <TouchableOpacity style={styles.modalBotaoSim} onPress={() => minimizarLateralEsquerdaSim()}><Text style={styles.modalBotaoText}>Sim</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.modalBotaoNao} onPress={() => minimizarLateralEsquerdaNao()}><Text style={styles.modalBotaoText}>Não</Text></TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            
                        </Modal>


                        <View style={styles.header}>
                            <Text style={styles.placa}>Check-in</Text>
                            <Text style={styles.placa}>{placaVeiculo}</Text>
                            <Text style={styles.tipoVeiculo}>{nomeTipoVeiculo}</Text>
                            <Text style={styles.status}>{statusVeiculo}</Text>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.containerItens}>
                                <View style={styles.containerDivisaoItens}>
                                    <Text style={styles.textItem}>Dianteira</Text>
                                </View>
                                <View style={styles.containerDivisaoItens}>
                                    <TouchableOpacity>
                                        {dianteira?
                                            <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        {dianteira?
                                            <Image style={styles.icon} source={require('../../assets/img/xApagado.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/x.png')} />
                                        }    
                                    </TouchableOpacity>   
                                    <TouchableOpacity onPress={() => setDianteiraModal(true)}>
                                        <Image style={styles.icon2} source={require('../../assets/img/clip.png')} /> 
                                    </TouchableOpacity>                                         
                                </View>
                            </View>
                            <View style={styles.containerItens}>
                                <View style={styles.containerDivisaoItens}>
                                    <Text style={styles.textItem}>Traseira</Text>
                                </View>
                                <View style={styles.containerDivisaoItens}>
                                    <TouchableOpacity>
                                        {traseira?
                                            <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        {traseira?
                                            <Image style={styles.icon} source={require('../../assets/img/xApagado.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/x.png')} />
                                        }    
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setTraseiraModal(true)}>
                                        <Image style={styles.icon2} source={require('../../assets/img/clip.png')} /> 
                                    </TouchableOpacity>                            
                                </View>
                            </View>
                            <View style={styles.containerItens}>
                                <View style={styles.containerDivisaoItens}>
                                    <Text style={styles.textItem}>Lateral esquerda</Text>
                                </View>
                                <View style={styles.containerDivisaoItens}>
                                    <TouchableOpacity>
                                        {lateralEsquerda?
                                            <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        {lateralEsquerda?
                                            <Image style={styles.icon} source={require('../../assets/img/xApagado.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/x.png')} />
                                        }   
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setLateralEsquerdaModal(true)}>
                                        <Image style={styles.icon2} source={require('../../assets/img/clip.png')} /> 
                                    </TouchableOpacity>                          
                                </View>
                            </View>
                            <View style={styles.containerItens}>
                                <View style={styles.containerDivisaoItens}>
                                    <Text style={styles.textItem}>Lateral direita</Text>
                                </View>
                                <View style={styles.containerDivisaoItens}>
                                    <TouchableOpacity >
                                        {lateralDireita?
                                            <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        {lateralDireita?
                                            <Image style={styles.icon} source={require('../../assets/img/xApagado.png')} /> :
                                            <Image style={styles.icon} source={require('../../assets/img/x.png')} />
                                        }    
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setLateralDireitaModal(true)}>
                                        <Image style={styles.icon2} source={require('../../assets/img/clip.png')} /> 
                                    </TouchableOpacity>                               
                                </View>
                            </View>
                        </View>
                        <View style={styles.containerBotao}>
                            <TouchableOpacity onPress={() => cadastrarCheckIn()} style={styles.btnProsseguir}>
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
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        marginLeft: 15,
        width: 28,
        height: 28
    },
    icon2: {
        marginLeft: 15,
        width: 28,
        
    },
    containerDivisaoItens: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    modal:{
        backgroundColor: 'white',
        width: 320,
        height: 500,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        marginTop: 50
    },
    modalContent:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgModal: {
        backgroundColor: 'black',
        width: 120,
        height: 150,
        margin: 5
    },
    modalContainerImg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    modalContainerText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    modalBotaoSim: {
        width: 100,
        height: 60,
        backgroundColor: '#4CC341',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 10
    },
    modalBotaoNao: {
        width: 100,
        height: 60,
        backgroundColor: '#EC3C3C',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 10
    },
    modalBotaoText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    modalContainerBotoes: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    modalText:{
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
        
    },
    modalContainerImgText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainerTextImg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }

})