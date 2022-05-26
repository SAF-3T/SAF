import { Component } from "react";
import { useState, useEffect } from 'react';
import React from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/react-fontawesome";
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
    const [ dianteiraImg, setDianteiraImg ] = useState( null );

    
    const [ traseira, setTraseira ] = useState( false );
    const [ traseiraModal, setTraseiraModal ] = useState( false );
    const [ traseiraImg, setTraseiraImg ] = useState( null );

    
    const [ lateralEsquerda, setLateralEsquerda ] = useState( false );
    const [ lateralEsquerdaModal, setLateralEsquerdaModal ] = useState( false );
    const [ lateralEsquerdaImg, setLateralEsquerdaImg ] = useState( null );


    const [ lateralDireita, setLateralDireita ] = useState( false );
    const [ lateralDireitaModal, setLateralDireitaModal ] = useState( false );
    const [ lateralDireitaImg, setLateralDireitaImg ] = useState( null );


    const [ dataAtual, setDataAtual ] = useState( '' );

    var navigation = useNavigation()


  const pickImageDianteira = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
        setDianteiraImg(result.uri);
    }
  };
  const pickImageTraseira = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
        setTraseiraImg(result.uri);
    }
  };
  const pickImageLateralD = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
        setLateralDireitaImg(result.uri);
    }
  };
  const pickImageLateralE = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
        setLateralEsquerdaImg(result.uri);
    }
  };


    async function cadastrarCheckIn() {
        setDataAtual('2022-05-05')
        const dataCheckin = new FormData();
        const dataDianteira = new FormData();
        const dataTraseira = new FormData();
        const dataLateralE = new FormData();
        const dataLateralD = new FormData();    

        dataDianteira.append('arquivo', dianteiraImg)
        dataDianteira.append('idTipoErro', 9)
        dataDianteira.append('idCheckList', idCheckList)
        dataDianteira.append('descricaoErro', 'Erro na dianteira do veículo')

        dataTraseira.append('arquivo', traseiraImg)
        dataTraseira.append('idTipoErro', 10)
        dataTraseira.append('idCheckList', idCheckList)
        dataTraseira.append('descricaoErro', 'Erro na traseira do veículo')

        dataLateralD.append('arquivo', lateralDireitaImg)
        dataLateralD.append('idTipoErro', 11)
        dataLateralD.append('idCheckList', idCheckList)
        dataLateralD.append('descricaoErro', 'Erro na lateral direita do veículo')

        dataLateralE.append('arquivo', lateralEsquerdaImg)
        dataLateralE.append('idTipoErro', 12)
        dataLateralE.append('idCheckList', idCheckList)
        dataLateralE.append('descricaoErro', 'Erro na lateral esquerda do veículo')

        const header = {'Content-Type': 'multipart/form-data'}
        
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
        

        if (dianteira === false) {
            var respostaDianteira = await axios.post({url: 'https://backend-saf-api.azurewebsites.net/api/Erro',data: dataDianteira,
            headers: header})
            if (respostaDianteira.status === 201) {
                console.warn('Erro da dianteira cadastrado')
            }
            
        }
        if (traseira === false) {
            var respostaTraseira = await axios.post({url:'https://backend-saf-api.azurewebsites.net/api/Erro',data:dataTraseira,
            header:header
        })
            if (respostaTraseira.status === 201) {
                console.warn('Erro da traseira cadastrado')
            }
        }
        if (lateralDireita === false) {
            var respostaLateralDireita = await axios.post({url:'https://backend-saf-api.azurewebsites.net/api/Erro',data:dataLateralD,
            header:header})
            if (respostaLateralDireita.status === 201) {
                console.warn('Erro da lateral direita cadastrado')
            }
        }
        if (lateralEsquerda === false) {
            var respostaLateralEsquerda = await axios.post({url:'https://backend-saf-api.azurewebsites.net/api/Erro',data:dataLateralE,
            headers: header})
            if (respostaLateralEsquerda.status === 201) {
                console.warn('Erro da lateral esquerda cadastrado')
            }
        }
        setTipoAutorizacao(0)
        setIdUsuario(0)
        setIdVeiculo(0)
        setIdCheckList(0)
        setIdStatus(0)
        setNomeTipoVeiculo('')
        setNomeU('')
        setPlacaVeiculo('')
        setStatusVeiculo('')
        setDianteiraImg(null)
        setTraseiraImg(null)
        setLateralEsquerdaImg(null)
        setLateralDireitaImg(null)
        await navigation.navigate('TelaCadastradoCheckIn') 
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
                        style={styles.modalTela}
                        >
                            <View style={styles.modal}>
                                <View style={styles.modalContent}>
                                    <View style={styles.modalContainerTextImg}>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Imagem Padrão</Text>
                                            <Image style={styles.imgModal}  source={{ uri: 'https://backend-saf-api.azurewebsites.net/Img/cam1.jpg' }}/>
                                        </View>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Sua imagem</Text>
                                            {
                                                dianteiraImg === null?
                                                <TouchableOpacity onPress={pickImageDianteira}><View style={styles.imgModal} ><Image style={styles.imgCamera} source={require('../../assets/img/Group.png')} /></View></TouchableOpacity>:
                                                <View />
                                            }
                                            <TouchableOpacity onPress={pickImageDianteira}>{dianteiraImg && <Image source={{ uri: dianteiraImg }} style={styles.imgModal} />}</TouchableOpacity>
                                            
                                            
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
                        style={styles.modalTela}
                        >
                            <View style={styles.modal}>
                                <View style={styles.modalContent}>
                                    <View style={styles.modalContainerTextImg}>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Imagem Padrão</Text>
                                            <Image style={styles.imgModal}  source={{ uri: 'https://backend-saf-api.azurewebsites.net/Img/cam1.jpg' }}/>
                                        </View>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Sua imagem</Text>
                                            {
                                                traseiraImg === null?
                                                <TouchableOpacity onPress={pickImageTraseira}><View style={styles.imgModal} ><Image style={styles.imgCamera} source={require('../../assets/img/Group.png')} /></View></TouchableOpacity>:
                                                <View />
                                            }
                                            <TouchableOpacity onPress={pickImageTraseira}>{traseiraImg && <Image source={{ uri: traseiraImg }} style={styles.imgModal} />}</TouchableOpacity>
                                            
                                            
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
                        style={styles.modalTela}
                        >
                            <View style={styles.modal}>
                                <View style={styles.modalContent}>
                                    <View style={styles.modalContainerTextImg}>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Imagem Padrão</Text>
                                            <Image style={styles.imgModal}  source={{ uri: 'https://backend-saf-api.azurewebsites.net/Img/cam31.jpg' }}/>
                                        </View>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Sua imagem</Text>
                                            {
                                                lateralDireitaImg === null?
                                                <TouchableOpacity onPress={pickImageLateralD}><View style={styles.imgModal} ><Image style={styles.imgCamera} source={require('../../assets/img/Group.png')} /></View></TouchableOpacity>:
                                                <View />
                                            }
                                            <TouchableOpacity onPress={pickImageLateralD}>{lateralDireitaImg && <Image source={{ uri: lateralDireitaImg }} style={styles.imgModal} />}</TouchableOpacity>
                                            
                                            
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
                        style={styles.modalTela}
                        >
                            <View style={styles.modal}>
                                <View style={styles.modalContent}>
                                    <View style={styles.modalContainerTextImg}>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Imagem Padrão</Text>
                                            <Image style={styles.imgModal}  source={{ uri: 'https://backend-saf-api.azurewebsites.net/Img/cam21.jpg' }}/>
                                        </View>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Sua imagem</Text>
                                            {
                                                lateralEsquerdaImg === null?
                                                <TouchableOpacity onPress={pickImageLateralE}><View style={styles.imgModal} ><Image style={styles.imgCamera} source={require('../../assets/img/Group.png')} /></View></TouchableOpacity>:
                                                <View />
                                            }
                                            <TouchableOpacity onPress={pickImageLateralE}>{lateralEsquerdaImg && <Image source={{ uri: lateralEsquerdaImg }} style={styles.imgModal} />}</TouchableOpacity>
                                            
                                            
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
                                            <FontAwesomeIcon style={styles.icon} icon={faCheck} /> :
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
                            {
                                dianteiraImg === null || traseiraImg === null || lateralEsquerdaImg === null || lateralDireitaImg === null ?
                                <View style={styles.btnProsseguir}>
                                    <Text style={styles.btnText2}>Anexe imagens antes de prosseguir</Text>
                                </View> :
                                <TouchableOpacity onPress={() => cadastrarCheckIn()} style={styles.btnProsseguir}>
                                    <Text style={styles.btnText}>Prosseguir</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
            </View>
    )
}
 

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#0E758C',
    },
    header: {
        flex: 1,
    },
    background: {
        flex: 1,
        backgroundColor: '#0E758C',
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
    modalTela: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        width: 220,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btnProsseguir: {
        backgroundColor: '#0F282D',
        width: 220,
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
    btnText2: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        width: 200
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
        backgroundColor: '#C4C4C4',
        width: 120,
        height: 150,
        margin: 5,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
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