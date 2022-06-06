import { Component } from "react";
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark, faCheck, faPaperclip } from '@fortawesome/free-solid-svg-icons'
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

import qs from 'qs'


export default function Checkin() {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [tipoAutorizacao, setTipoAutorizacao] = useState(0);
    const [idUsuario, setIdUsuario] = useState(0);
    const [idVeiculo, setIdVeiculo] = useState(0);
    const [idCheckList, setIdCheckList] = useState(0);
    const [idStatus, setIdStatus] = useState(0);
    const [nomeTipoVeiculo, setNomeTipoVeiculo] = useState('');
    const [nomeU, setNomeU] = useState('');
    const [placaVeiculo, setPlacaVeiculo] = useState('');
    const [statusVeiculo, setStatusVeiculo] = useState('');

    const [dianteira, setDianteira] = useState(false);
    const [dianteiraX, setDianteiraX] = useState(false);
    const [dianteiraModal, setDianteiraModal] = useState(false);
    const [dianteiraImg, setDianteiraImg] = useState(null);
    const [dianteiraImgPadrao, setDianteiraImgPadrao] = useState(null);
    const [dianteiraPorcentagem, setDianteiraPorcentagem] = useState(0);



    const [traseira, setTraseira] = useState(false);
    const [traseiraX, setTraseiraX] = useState(false);
    const [traseiraModal, setTraseiraModal] = useState(false);
    const [traseiraImg, setTraseiraImg] = useState(null);
    const [traseiraImgPadrao, setTraseiraImgPadrao] = useState(null);
    const [traseiraPorcentagem, setTraseiraPorcentagem] = useState(0);



    const [lateralEsquerda, setLateralEsquerda] = useState(false);
    const [lateralEsquerdaX, setLateralEsquerdaX] = useState(false);
    const [lateralEsquerdaModal, setLateralEsquerdaModal] = useState(false);
    const [lateralEsquerdaImg, setLateralEsquerdaImg] = useState(null);
    const [lateralEsquerdaImgPadrao, setLateralEsquerdaImgPadrao] = useState(null);
    const [lateralEsquerdaPorcentagem, setLateralEsquerdaPorcentagem] = useState(0);



    const [lateralDireita, setLateralDireita] = useState(false);
    const [lateralDireitaX, setLateralDireitaX] = useState(false);
    const [lateralDireitaModal, setLateralDireitaModal] = useState(false);
    const [lateralDireitaImg, setLateralDireitaImg] = useState(null);
    const [lateralDireitaImgPadrao, setLateralDireitaImgPadrao] = useState(null);
    const [lateralDireitaPorcentagem, setLateralDireitaPorcentagem] = useState(false);



    const [modalCameraDianteira, setModalCameraDianteira] = useState(false);
    const [modalCameraTraseira, setModalCameraTraseira] = useState(false);
    const [modalCameraLateralD, setModalCameraLateralD] = useState(false);
    const [modalCameraLateralE, setModalCameraLateralE] = useState(false);

    const ref = useRef(null)

    useEffect(buscaInfoVeiculo, [])


    const [dataAtual, setDataAtual] = useState('');

    var navigation = useNavigation()

    const [correspondencia, setCorrespondencia] = useState('');
    function PesquisarCorrespondenciaDianteira() {
        axios({
            method: 'post',
            url: 'http://18.232.43.149:8000/comparar/img1/img2',
            data: qs.stringify({
                nomeImg1: dianteiraImgPadrao,
                nomeImg2: dianteiraImg
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setDianteiraPorcentagem(response.data)
                    
                }
            })
    }
    function PesquisarCorrespondenciaTraseira() {
        axios({
            method: 'post',
            url: 'http://18.232.43.149:8000/comparar/img1/img2',
            data: qs.stringify({
                nomeImg1: traseiraImgPadrao,
                nomeImg2: traseiraImg
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setTraseiraPorcentagem(response.data)
                    
                }
            })
    }
    function PesquisarCorrespondenciaLD() {
        axios({
            method: 'post',
            url: 'http://18.232.43.149:8000/comparar/img1/img2',
            data: qs.stringify({
                nomeImg1: lateralDireitaImgPadrao,
                nomeImg2: lateralDireitaImg
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setLateralDireitaPorcentagem(response.data)
                    
                }
            })
    }
    function PesquisarCorrespondenciaLE() {
        console.warn('Entrou na porcentagem')
        axios({
            method: 'post',
            url: 'http://18.232.43.149:8000/Comparar/Files',
            data: qs.stringify({
                nomeImg1: lateralEsquerdaImgPadrao,
                nomeImg2: lateralEsquerdaImg
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setLateralEsquerdaPorcentagem(response.data)
                    
                }
            })
            .catch(error => console.warn(error))
    }

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

            //PesquisarCorrespondenciaDianteira()
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

            //PesquisarCorrespondenciaTraseira()
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

            //PesquisarCorrespondenciaLD()
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

            //PesquisarCorrespondenciaLE()
        }
    };


    async function cadastrarCheckIn() {
        setDataAtual('02-09-2005')
        const dataCheckin = new FormData();        

        dataCheckin.append('idTipoCheckList', 1)
        dataCheckin.append('idVeiculo', 4)
        dataCheckin.append('idUsuario', 33)
        dataCheckin.append('dataCheckList', '2005-07-26')
        dataCheckin.append('imagemFrontal', {uri:dianteiraImg.uri,type:dianteiraImg.type,name:dianteiraImg.fileName})
        dataCheckin.append('imagemTraseira', {uri:traseiraImg.uri,type:traseiraImg.type,name:traseiraImg.fileName})
        dataCheckin.append('imagemLateralDireita', {uri:lateralDireitaImg.uri,type:lateralDireitaImg.type,name:lateralDireitaImg.fileName})
        dataCheckin.append('imagemLateralEsquerda', {uri:lateralEsquerdaImg.uri,type:lateralEsquerdaImg.type,name:lateralEsquerdaImg.fileName})
        dataCheckin.append('porcentagemFrontal', 95)
        dataCheckin.append('porcentagemTraseira', 92)
        dataCheckin.append('porcentagemLateralDireita', 85)
        dataCheckin.append('porcentagemLateralEsquerda', 89)

        await axios(
            {
                method: 'post',
                url: 'https://backend-saf-api.azurewebsites.net/api/CheckList',
                body: dataCheckin,
                headers: {
                    'Content-Type': 'multipart/form-data; ',
                  },
            }    
        )
            .then(resposta => {
                if (resposta.status === 201) {
                    //console.warn('CheckList cadastrada!')
                    // console.warn(resposta)

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
                    setDianteiraPorcentagem(0)
                    setTraseiraPorcentagem(0)
                    setLateralDireitaPorcentagem(0)
                    setLateralEsquerdaPorcentagem(0)
                    
                }
            })
            .catch(error => console.warn(error))
            navigation.navigate('TelaCadastradoCheckIn')
    }

    async function buscaInfoVeiculo() {
        const token = await AsyncStorage.getItem('userToken')
        setIdUsuario(jwtDecode(token).jti)


        axios('https://backend-saf-api.azurewebsites.net/BuscarVeiculo/4')
            .then(response => {
                if (response.status === 200) {
                    setPlacaVeiculo(response.data.placa)
                    setStatusVeiculo(response.data.idStatusNavigation.nomeStatus)
                    setNomeTipoVeiculo(response.data.idTipoVeiculoNavigation.nomeTipoVeiculo)
                    setDianteiraImgPadrao(response.data.imagemFrontalPadrao)
                    setTraseiraImgPadrao(response.data.imagemTraseiraPadrao)
                    setLateralDireitaImgPadrao(response.data.imagemLateralEsquerdaPadrao)
                    setLateralEsquerdaImgPadrao(response.data.imagemLateralDireitaPadrao)
                }
            })
    }

    async function minimizarDianteiraSim() {
        setDianteiraModal(false)
        setCorrespondencia('')
        setDianteira(true)
        setDianteiraX(false)
    }
    async function minimizarDianteiraNao() {
        setDianteiraModal(false)
        setCorrespondencia('')
        setDianteira(false)
        setDianteiraX(true)
        setDianteiraImg(null)
    }

    async function minimizarTraseiraSim() {
        setTraseiraModal(false)
        setCorrespondencia('')
        setTraseira(true)
        setTraseiraX(false)
    }
    async function minimizarTraseiraNao() {
        setTraseiraModal(false)
        setCorrespondencia('')
        setTraseira(false)
        setTraseiraImg(null)
        setTraseiraX(true)
    }

    async function minimizarLateralEsquerdaSim() {
        setLateralEsquerdaModal(false)
        setCorrespondencia('')
        setLateralEsquerda(true)
        setLateralEsquerdaX(false)
    }
    async function minimizarLateralEsquerdaNao() {
        setLateralEsquerdaModal(false)
        setCorrespondencia('')
        setLateralEsquerdaImg(null)
        setLateralEsquerda(false)
        setLateralEsquerdaX(true)
    }

    async function minimizarLateralDireitaSim() {
        setLateralDireitaModal(false)
        setCorrespondencia('')
        setLateralDireita(true)
        setLateralDireitaX(false)
    }
    async function minimizarLateralDireitaNao() {
        setLateralDireitaModal(false)
        setCorrespondencia('')
        setLateralDireitaImg(null)
        setLateralDireita(false)
        setLateralDireitaX(true)
    }

    
    return (
        <View style={styles.main}>
            <Header />
            <View style={styles.background}>
                <View style={styles.content}>

                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={modalCameraDianteira}
                        style={styles.modalTela}
                    >

                        <View style={styles.containerModalCamera}>
                            <Image style={styles.imgDianteiraModal} source={require('../../assets/img/Traseira.png')} />
                            <Text style={styles.textModalCamera}>Tire foto da parte frontal do veículo</Text>
                            <Camera style={styles.cameraModal} />
                            <TouchableOpacity onPress={() => pickImageDianteira()} style={styles.btnModalCamera}>
                                <Text style={styles.textBtnModalCamera}>Tirar Foto</Text>
                            </TouchableOpacity>
                        </View>

                    </Modal>

                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={modalCameraTraseira}
                        style={styles.modalTela}
                    >
                        <View style={styles.containerModalCamera}>
                            <Image style={styles.imgDianteiraModal} source={require('../../assets/img/Dianteira.png')} />
                            <Text style={styles.textModalCamera}>Tire foto da parte Traseira do veículo</Text>
                            <Camera style={styles.cameraModal} />
                            <TouchableOpacity onPress={() => pickImageTraseira()} style={styles.btnModalCamera}>
                                <Text style={styles.textBtnModalCamera}>Tirar Foto</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={modalCameraLateralE}
                        style={styles.modalTela}
                    >
                        <View style={styles.containerModalCamera}>
                            <Image style={styles.imgDianteiraModal} source={require('../../assets/img/LateralE.png')} />
                            <Text style={styles.textModalCamera}>Tire foto da parte lateral esquerda do veículo</Text>
                            <Camera style={styles.cameraModal} />
                            <TouchableOpacity onPress={() => pickImageLateralE()} style={styles.btnModalCamera}>
                                <Text style={styles.textBtnModalCamera}>Tirar Foto</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={modalCameraLateralD}
                        style={styles.modalTela}
                    >
                        <View style={styles.containerModalCamera}>
                            <Image style={styles.imgDianteiraModal} source={require('../../assets/img/LateralE.png')} />
                            <Text style={styles.textModalCamera}>Tire foto da parte lateral direita do veículo</Text>
                            <Camera style={styles.cameraModal} />
                            <TouchableOpacity onPress={() => pickImageLateralD()} style={styles.btnModalCamera}>
                                <Text style={styles.textBtnModalCamera}>Tirar Foto</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>


                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={dianteiraModal}

                    >
                        <View style={styles.modalTela}>
                            <View style={styles.modal}>
                                <View style={styles.modalContent}>
                                    <View style={styles.modalContainerTextImg}>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Selecione uma imagem</Text>
                                            {
                                                dianteiraImg === null ?
                                                    <TouchableOpacity style={styles.imgModal} onPress={() => pickImageDianteira()}><View ><Image style={styles.imgCamera} source={require('../../assets/img/Group.png')} /></View></TouchableOpacity> :
                                                    <TouchableOpacity style={styles.imgModal} onPress={() => pickImageDianteira()}>{dianteiraImg && <Image source={{ uri: dianteiraImg }} style={styles.imgModalMolde} />}</TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                    {
                                        dianteiraImg === null ?
                                        <View /> :
                                        <Text style={styles.textItem}>Deseja selecionar essa imagem?</Text>
                                    }
                                    <View style={styles.modalContainerBotoes}>
                                        {
                                            dianteiraImg === null ?
                                            <View /> :
                                            <TouchableOpacity style={styles.modalBotaoSim} onPress={() => minimizarDianteiraSim()}><FontAwesomeIcon margin='2%' size={35} icon={faCheck} color='white'/></TouchableOpacity>
                                        }
                                        
                                        <TouchableOpacity style={styles.modalBotaoNao} onPress={() => minimizarDianteiraNao()}><FontAwesomeIcon margin='2%' size={40} icon={faXmark} color='white'/></TouchableOpacity>
                                    </View>
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
                        <View style={styles.modalTela}>
                            <View style={styles.modal}>
                                <View style={styles.modalContent}>
                                    <View style={styles.modalContainerTextImg}>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Selecione uma imagem</Text>
                                            {
                                                traseiraImg === null ?
                                                    <TouchableOpacity style={styles.imgModal} onPress={() => pickImageTraseira()}><View style={styles.imgModal} ><Image style={styles.imgCamera} source={require('../../assets/img/Group.png')} /></View></TouchableOpacity> :
                                                    <TouchableOpacity style={styles.imgModal} onPress={() => pickImageTraseira()}>{traseiraImg && <Image source={{ uri: traseiraImg }} style={styles.imgModalMolde} />}</TouchableOpacity>
                                            }
                                        </View>
                                    </View>


                                    {
                                        traseiraImg === null ?
                                        <View /> :
                                        <Text style={styles.textItem}>Deseja selecionar essa imagem?</Text>
                                    }
                                    <View style={styles.modalContainerBotoes}>
                                        {
                                            traseiraImg === null ?
                                            <View /> :
                                            <TouchableOpacity style={styles.modalBotaoSim} onPress={() => minimizarTraseiraSim()}><FontAwesomeIcon margin='2%' size={35} icon={faCheck} color='white'/></TouchableOpacity>
                                        }
                                        
                                        <TouchableOpacity style={styles.modalBotaoNao} onPress={() => minimizarTraseiraNao()}><FontAwesomeIcon margin='2%' size={40} icon={faXmark} color='white'/></TouchableOpacity>
                                    </View>
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
                        <View style={styles.modalTela} >
                            <View style={styles.modal}>
                                <View style={styles.modalContent}>
                                    <View style={styles.modalContainerTextImg}>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Selecione uma imagem</Text>
                                            {
                                                lateralDireitaImg === null ?
                                                    <TouchableOpacity style={styles.imgModal} onPress={() => pickImageLateralD()}><View style={styles.imgModal} ><Image style={styles.imgCamera} source={require('../../assets/img/Group.png')} /></View></TouchableOpacity> :
                                                    <TouchableOpacity style={styles.imgModal} onPress={() => pickImageLateralD()}>{lateralDireitaImg && <Image source={{ uri: lateralDireitaImg }} style={styles.imgModalMolde} />}</TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                    {
                                        lateralDireitaImg === null ?
                                        <View /> :
                                        <Text style={styles.textItem}>Deseja selecionar essa imagem?</Text>
                                    }
                                    <View style={styles.modalContainerBotoes}>
                                        {
                                            lateralDireitaImg === null ?
                                            <View /> :
                                            <TouchableOpacity style={styles.modalBotaoSim} onPress={() => minimizarLateralDireitaSim()}><FontAwesomeIcon margin='2%' size={35} icon={faCheck} color='white'/></TouchableOpacity>
                                        }
                                        
                                        <TouchableOpacity style={styles.modalBotaoNao} onPress={() => minimizarLateralDireitaNao()}><FontAwesomeIcon margin='2%' size={40} icon={faXmark} color='white'/></TouchableOpacity>
                                    </View>
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
                        <View style={styles.modalTela}>
                            <View style={styles.modal}>
                                <View style={styles.modalContent}>
                                    <View style={styles.modalContainerTextImg}>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Selecione uma imagem</Text>
                                            {
                                                lateralEsquerdaImg === null ?
                                                <TouchableOpacity style={styles.imgModal} onPress={() => pickImageLateralE()}><View style={styles.imgModal} ><Image style={styles.imgCamera} source={require('../../assets/img/Group.png')} /></View></TouchableOpacity> :
                                                <TouchableOpacity style={styles.imgModal} onPress={() => pickImageLateralE()}>{lateralEsquerdaImg && <Image source={{ uri: lateralEsquerdaImg }} style={styles.imgModalMolde} />}</TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                    {
                                        lateralEsquerdaImg === null ?
                                        <View /> :
                                        <Text style={styles.textItem}>Deseja selecionar essa imagem?</Text>
                                    }
                                    <View style={styles.modalContainerBotoes}>
                                        {
                                            lateralEsquerdaImg === null ?
                                            <View /> :
                                            <TouchableOpacity style={styles.modalBotaoSim} onPress={() => minimizarLateralEsquerdaSim()}><FontAwesomeIcon margin='2%' size={35} icon={faCheck} color='white'/></TouchableOpacity>
                                        }
                                        
                                        <TouchableOpacity style={styles.modalBotaoNao} onPress={() => minimizarLateralEsquerdaNao()}><FontAwesomeIcon margin='2%' size={40} icon={faXmark} color='white'/></TouchableOpacity>
                                    </View>
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
                                    {dianteira ?
                                        <FontAwesomeIcon margin='2%' size={35} icon={faCheck} color='green'/> :
                                        <FontAwesomeIcon margin='2%' size={35} icon={faCheck} color='gray'/>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setDianteiraModal(true)}>
                                    <FontAwesomeIcon size={30} icon={faPaperclip} color='black'/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.containerItens}>
                            <View style={styles.containerDivisaoItens}>
                                <Text style={styles.textItem}>Traseira</Text>
                            </View>
                            <View style={styles.containerDivisaoItens}>
                                <TouchableOpacity>
                                    {traseira ?
                                        <FontAwesomeIcon margin='2%' size={35} icon={faCheck} color='green'/> :
                                        <FontAwesomeIcon margin='2%' size={35} icon={faCheck} color='gray'/>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setTraseiraModal(true)}>
                                    <FontAwesomeIcon size={30} icon={faPaperclip} color='black'/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.containerItens}>
                            <View style={styles.containerDivisaoItens}>
                                <Text style={styles.textItem}>Lateral esquerda</Text>
                            </View>
                            <View style={styles.containerDivisaoItens}>
                                <TouchableOpacity>
                                    {lateralEsquerda ?
                                        <FontAwesomeIcon margin='2%' size={35} icon={faCheck} color='green'/> :
                                        <FontAwesomeIcon margin='2%' size={35} icon={faCheck} color='gray'/>
                                    }
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={() => setLateralEsquerdaModal(true)}>
                                    <FontAwesomeIcon size={30} icon={faPaperclip} color='black'/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.containerItens}>
                            <View style={styles.containerDivisaoItens}>
                                <Text style={styles.textItem}>Lateral direita</Text>
                            </View>
                            <View style={styles.containerDivisaoItens}>
                                <TouchableOpacity >
                                    {lateralDireita ?
                                        <FontAwesomeIcon margin='2%' size={35} icon={faCheck} color='green'/> :
                                        <FontAwesomeIcon margin='2%' size={35} icon={faCheck} color='gray'/>
                                    }
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={() => setLateralDireitaModal(true)}>
                                    <FontAwesomeIcon size={30} icon={faPaperclip} color='black'/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerBotao}>
                        {
                            dianteira === false || traseira === false || lateralEsquerda === false || lateralDireita === false ?
                                <View style={styles.btnProsseguir2}>
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
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        backgroundColor: 'white',
        width: '90%',
        height: '90%',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%'
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '19%',
        margin: '5%'
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
        width: '97%'
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
        flex: 1,
        width: '100%'
    },
    containerItens: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '5%',
        marginBottom: '5%',
        alignItems: 'center',
        paddingLeft: '5%',
        paddingRight: '5%',
        width: '100%',
        height: '10%'
    },
    placa: {
        fontWeight: 'bold',
        fontSize: 20,
        width: '80%',
        textAlign: 'center',
    },
    tipoVeiculo: {
        display: "flex",
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        width: '80%',
    },
    status: {
        width: '80%',
        fontSize: 20,
        textAlign: 'center'
    },
    btnProsseguir: {
        backgroundColor: '#0F282D',
        width: 400,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btnProsseguir: {
        backgroundColor: '#0F282D',
        width: '50%',
        height: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btnProsseguir2: {
        backgroundColor: '#0F282D',
        width: '60%',
        height: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24
    },
    btnText2: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        width: '95%'
    },
    textItem: {
        fontSize: 16,
        fontWeight: 'normal'
    },
    icon: {
        height: 50,
        marginLeft: '25%'
    },
    icon2: {
      
        height: '100%',
    },
    containerDivisaoItens: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    modal: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 40,
        paddingBottom: '7%'
    },
    modalContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    imgModal: {
        backgroundColor: '#C4C4C4',
        width: '80%',
        height: '60%',
        margin: 5,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
    },
    imgModalMolde: {
        width: '100%',
        height: '100%',
    },
    modalContainerImg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    modalContainerText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    modalBotaoSim: {
        width: '20%',
        height: '30%',
        backgroundColor: '#4CC341',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 10
    },
    modalBotaoNao: {
        width: '20%',
        height: '30%',
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
    modalText: {
        fontSize: 23,
        fontWeight: 'bold',
        margin: 10,
        width: '100%',
        textAlign: 'center'
    },
    modalContainerImgText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
    },
    modalContainerTextImg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    containerModalCamera: {
        height: '100%',
        width: '100%',
        backgroundColor: '#0E758C',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cameraModal: {
        height: '50%',
        width: '80%'
    },

    btnModalCamera: {
        height: '5%',
        width: '30%',
        backgroundColor: 'white',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%'
    },
    textBtnModalCamera: {
        color: '#0F282D',
        fontSize: 20,
        fontWeight: 'bold'
    },
    imgDianteiraModal: {
        width: '10%',
        height: '5%',

    },
    textModalCamera: {
        color: 'white',
        fontSize: 20,
        margin: '5%'
    }
})