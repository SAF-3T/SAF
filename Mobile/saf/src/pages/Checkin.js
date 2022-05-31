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
    const [dianteiraModal, setDianteiraModal] = useState(false);
    const [dianteiraImg, setDianteiraImg] = useState('https://backend-saf-api.azurewebsites.net/Img/cam1.jpg');


    const [traseira, setTraseira] = useState(false);
    const [traseiraModal, setTraseiraModal] = useState(false);
    const [traseiraImg, setTraseiraImg] = useState('https://backend-saf-api.azurewebsites.net/Img/cam2.jpg');


    const [lateralEsquerda, setLateralEsquerda] = useState(false);
    const [lateralEsquerdaModal, setLateralEsquerdaModal] = useState(false);
    const [lateralEsquerdaImg, setLateralEsquerdaImg] = useState('https://backend-saf-api.azurewebsites.net/Img/cam22.jpg');


    const [lateralDireita, setLateralDireita] = useState(false);
    const [lateralDireitaModal, setLateralDireitaModal] = useState(false);
    const [lateralDireitaImg, setLateralDireitaImg] = useState('https://backend-saf-api.azurewebsites.net/Img/cam32.jpg');

    const [modalCameraDianteira, setModalCameraDianteira] = useState(false);
    const [modalCameraTraseira, setModalCameraTraseira] = useState(false);
    const [modalCameraLateralD, setModalCameraLateralD] = useState(false);
    const [modalCameraLateralE, setModalCameraLateralE] = useState(false);

    const ref = useRef(null)

    const [dataAtual, setDataAtual] = useState('');

    var navigation = useNavigation()

    const [correspondencia, setCorrespondencia] = useState('');
    function PesquisarCorrespondencia(img1, img2) {
        axios({
            method: 'post',
            url: 'http://18.232.43.149:8000/comparar/img1/img2',
            data: qs.stringify({
                nomeImg1: img1,
                nomeImg2: img2
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setCorrespondencia(response.data)
                    console.warn(response.data)
                }
            })
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

            PesquisarCorrespondencia('cam1.jpg', 'cam2.jpg')
        }
    };

    const TakePictureDianteira = async () => {
        const fotoDianteira = await ref.current.takePictureAsync()

        setDianteiraImg(fotoDianteira.uri)
        setModalCameraDianteira(false)
    }

    const TakePictureTraseira = async () => {
        const fotoTraseira = await ref.current.takePictureAsync()

        setTraseiraImg(fotoTraseira.uri)
        setModalCameraTraseira(false)
    }

    const TakePictureLateralD = async () => {
        const fotoLateralD = await ref.current.takePictureAsync()

        setLateralDireitaImg(fotoLateralD.uri)
        setModalCameraLateralD(false)
    }

    const TakePictureLateralE = async () => {
        const fotoLateralE = await ref.current.takePictureAsync()

        setLateralEsquerdaImg(fotoLateralE.uri)
        setModalCameraLateralE(false)
    }

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

            PesquisarCorrespondencia('cam1.jpg', 'cam2.jpg')
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

            PesquisarCorrespondencia('cam1.jpg', 'cam2.jpg')
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

            PesquisarCorrespondencia('cam1.jpg', 'cam2.jpg')
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

        const header = { 'Content-Type': 'multipart/form-data' }

        // console.warn(dataAtual)
        let corpoChecklist = {
            idTipoCheckList: 1,
            idVeiculo: 2,
            idUsuario: idUsuario,
            dataCheckList: dataAtual
        }
        await axios.post('https://backend-saf-api.azurewebsites.net/api/CheckList', corpoChecklist)
            .then(resposta => {
                if (resposta.status === 201) {
                    console.warn('CheckList cadastrada!')
                    // console.warn(resposta)
                    setIdCheckList(resposta.data.idCheckList)
                }
            })
            .catch(error => console.warn(error))


        if (dianteira === false) {
            var respostaDianteira = await axios.post({
                url: 'https://backend-saf-api.azurewebsites.net/api/Erro', data: dataDianteira,
                headers: header
            })
            if (respostaDianteira.status === 201) {
                console.warn('Erro da dianteira cadastrado')
            }

        }
        if (traseira === false) {
            var respostaTraseira = await axios.post({
                url: 'https://backend-saf-api.azurewebsites.net/api/Erro', data: dataTraseira,
                header: header
            })
            if (respostaTraseira.status === 201) {
                console.warn('Erro da traseira cadastrado')
            }
        }
        if (lateralDireita === false) {
            var respostaLateralDireita = await axios.post({
                url: 'https://backend-saf-api.azurewebsites.net/api/Erro', data: dataLateralD,
                header: header
            })
            if (respostaLateralDireita.status === 201) {
                console.warn('Erro da lateral direita cadastrado')
            }
        }
        if (lateralEsquerda === false) {
            var respostaLateralEsquerda = await axios.post({
                url: 'https://backend-saf-api.azurewebsites.net/api/Erro', data: dataLateralE,
                headers: header
            })
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
                if (response.status === 200) {
                    // console.warn(response)
                    setPlacaVeiculo(response.data.placa)
                    setStatusVeiculo(response.data.idStatusNavigation.nomeStatus)
                    setNomeTipoVeiculo(response.data.idTipoVeiculoNavigation.nomeTipoVeiculo)
                }
            })
    }

    async function minimizarDianteiraSim() {
        setDianteiraModal(false)
        setCorrespondencia('')
        setDianteira(true)
    }
    async function minimizarDianteiraNao() {
        setDianteiraModal(false)
        setCorrespondencia('')
        setDianteira(false)
    }

    async function minimizarTraseiraSim() {
        setTraseiraModal(false)
        setCorrespondencia('')
        setTraseira(true)
    }
    async function minimizarTraseiraNao() {
        setTraseiraModal(false)
        setCorrespondencia('')
        setTraseira(false)
    }

    async function minimizarLateralEsquerdaSim() {
        setLateralEsquerdaModal(false)
        setCorrespondencia('')
        setLateralEsquerda(true)
    }
    async function minimizarLateralEsquerdaNao() {
        setLateralEsquerdaModal(false)
        setCorrespondencia('')
        setLateralEsquerda(false)
    }

    async function minimizarLateralDireitaSim() {
        setLateralDireitaModal(false)
        setCorrespondencia('')
        setLateralDireita(true)
    }
    async function minimizarLateralDireitaNao() {
        setLateralDireitaModal(false)
        setCorrespondencia('')
        setLateralDireita(false)
    }

    useEffect(buscaInfoVeiculo, [])

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
                                            <Text style={styles.modalText}>Imagem Padrão</Text>
                                            <Image style={styles.imgModal} source={{ uri: 'https://backend-saf-api.azurewebsites.net/Img/cam1.jpg' }} />
                                        </View>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Sua imagem</Text>
                                            {
                                                dianteiraImg === null ?
                                                    <TouchableOpacity style={styles.imgModal} onPress={() => pickImageDianteira()}><View style={styles.imgModal} ><Image style={styles.imgCamera} source={require('../../assets/img/Group.png')} /></View></TouchableOpacity> :
                                                    <View />
                                            }
                                            <TouchableOpacity style={styles.imgModal} onPress={() => pickImageDianteira()}>{dianteiraImg && <Image source={{ uri: dianteiraImg }} style={styles.imgModalMolde} />}</TouchableOpacity>


                                        </View>
                                    </View>
                                    <Text style={styles.modalText}>Taxa de correspondência: {correspondencia}</Text>
                                    <Text style={styles.modalText}>Correspondente?</Text>
                                    <View style={styles.modalContainerBotoes}>
                                        <TouchableOpacity style={styles.modalBotaoSim} onPress={() => minimizarDianteiraSim()}><Text style={styles.modalBotaoText}>Sim</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.modalBotaoNao} onPress={() => minimizarDianteiraNao()}><Text style={styles.modalBotaoText}>Não</Text></TouchableOpacity>
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
                                            <Text style={styles.modalText}>Imagem Padrão</Text>
                                            <Image style={styles.imgModal} source={{ uri: 'https://backend-saf-api.azurewebsites.net/Img/cam1.jpg' }} />
                                        </View>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Sua imagem</Text>
                                            {
                                                traseiraImg === null ?
                                                    <TouchableOpacity style={styles.imgModal} onPress={() => pickImageTraseira()}><View style={styles.imgModal} ><Image style={styles.imgCamera} source={require('../../assets/img/Group.png')} /></View></TouchableOpacity> :
                                                    <View />
                                            }
                                            <TouchableOpacity style={styles.imgModal} onPress={() => pickImageTraseira()}>{traseiraImg && <Image source={{ uri: traseiraImg }} style={styles.imgModalMolde} />}</TouchableOpacity>



                                        </View>
                                    </View>


                                    <Text style={styles.modalText}>Taxa de correspondência: {correspondencia}</Text>
                                    <Text style={styles.modalText}>Correspondente?</Text>
                                    <View style={styles.modalContainerBotoes}>
                                        <TouchableOpacity style={styles.modalBotaoSim} onPress={() => minimizarTraseiraSim()}><Text style={styles.modalBotaoText}>Sim</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.modalBotaoNao} onPress={() => minimizarTraseiraNao()}><Text style={styles.modalBotaoText}>Não</Text></TouchableOpacity>
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
                                            <Text style={styles.modalText}>Imagem Padrão</Text>
                                            <Image style={styles.imgModal} source={{ uri: 'https://backend-saf-api.azurewebsites.net/Img/cam31.jpg' }} />
                                        </View>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Sua imagem</Text>
                                            {
                                                lateralDireitaImg === null ?
                                                    <TouchableOpacity style={styles.imgModal} onPress={() => pickImageLateralD()}><View style={styles.imgModal} ><Image style={styles.imgCamera} source={require('../../assets/img/Group.png')} /></View></TouchableOpacity> :
                                                    <View />
                                            }
                                            <TouchableOpacity style={styles.imgModal} onPress={() => pickImageLateralD()}>{lateralDireitaImg && <Image source={{ uri: lateralDireitaImg }} style={styles.imgModalMolde} />}</TouchableOpacity>


                                        </View>
                                    </View>


                                    <Text style={styles.modalText}>Taxa de correspondência: {correspondencia}</Text>
                                    <Text style={styles.modalText}>Correspondente?</Text>
                                    <View style={styles.modalContainerBotoes}>
                                        <TouchableOpacity style={styles.modalBotaoSim} onPress={() => minimizarLateralDireitaSim()}><Text style={styles.modalBotaoText}>Sim</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.modalBotaoNao} onPress={() => minimizarLateralDireitaNao()}><Text style={styles.modalBotaoText}>Não</Text></TouchableOpacity>
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
                                            <Text style={styles.modalText}>Imagem Padrão</Text>
                                            <Image style={styles.imgModal} source={{ uri: 'https://backend-saf-api.azurewebsites.net/Img/cam21.jpg' }} />
                                        </View>
                                        <View style={styles.modalContainerImgText}>
                                            <Text style={styles.modalText}>Sua imagem</Text>
                                            {
                                                lateralEsquerdaImg === null ?
                                                    <TouchableOpacity style={styles.imgModal} onPress={() => pickImageLateralE()}><View style={styles.imgModal} ><Image style={styles.imgCamera} source={require('../../assets/img/Group.png')} /></View></TouchableOpacity> :
                                                    <View />
                                            }
                                            <TouchableOpacity style={styles.imgModal} onPress={() => pickImageLateralE()}>{lateralDireitaImg && <Image source={{ uri: lateralDireitaImg }} style={styles.imgModalMolde} />}</TouchableOpacity>

                                        </View>
                                    </View>


                                    <Text style={styles.modalText}>Taxa de correspondência: {correspondencia}</Text>
                                    <Text style={styles.modalText}>Correspondente?</Text>
                                    <View style={styles.modalContainerBotoes}>
                                        <TouchableOpacity style={styles.modalBotaoSim} onPress={() => minimizarLateralEsquerdaSim()}><Text style={styles.modalBotaoText}>Sim</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.modalBotaoNao} onPress={() => minimizarLateralEsquerdaNao()}><Text style={styles.modalBotaoText}>Não</Text></TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>


                    </Modal>

                    {//Inicio do codigo
                        console.warn("")}
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
                                        <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                        <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    {dianteira ?
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
                                    {traseira ?
                                        <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                        <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    {traseira ?
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
                                    {lateralEsquerda ?
                                        <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                        <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    {lateralEsquerda ?
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
                                    {lateralDireita ?
                                        <Image style={styles.icon} source={require('../../assets/img/certo.png')} /> :
                                        <Image style={styles.icon} source={require('../../assets/img/certoApagado.png')} />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    {lateralDireita ?
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
        justifyContent: 'center'
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '19%'
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
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center',
        paddingLeft: 70,
        paddingRight: 20,

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
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24
    },
    btnText2: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 35,
        textAlign: 'center',
        width: '95%'
    },
    textItem: {
        fontSize: 30,
        fontWeight: 'normal',
    },
    icon: {
        marginLeft: 30,
        width: 40,
        height: 40
    },
    icon2: {
        marginLeft: 30,
        width: 40,
        height: 47

    },
    containerDivisaoItens: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
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
    },
    modalContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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