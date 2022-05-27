import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { Modalize } from 'react-native-modalize';

export default function CameraTela() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [placa, setPlaca] = useState('')
    const [teste, setTeste] = useState({})

    const [modalResultado, setModalResultado] = useState(false)

    const ref = useRef(null)
    const modalizeRef = useRef(null)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>Sem acesso à camera</Text>;
    }

    function onOpen() {
        modalizeRef.current?.open();
    }

    const TakePicture = async () => {
        const foto = await ref.current.takePictureAsync()

        onOpen()

        let resultado;

        const options = {
            httpMethod: 'POST',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'file',
            headers: {
                "Content-Type": "multipart/form-data",
                "Ocp-Apim-Subscription-Key": "65679d72ba0245bbacadf9420515503d"
            }
        }


        await FileSystem.uploadAsync("https://ocr-loggex.cognitiveservices.azure.com/vision/v3.2/ocr?language=pt&detectOrientation=true&model-version=latest", foto.uri, options)
            .then(response => {
                resultado = FiltrarOCR(response.body);
            })
            .catch(erro => console.debug(erro))

        console.debug(resultado)
    }

    const FiltrarOCR = (obj) => {
        let resultado;
        let teste = JSON.parse(obj)
        // console.debug("foi aqui")
        // console.debug(teste.language)

        teste.regions.forEach(region => {
            region.lines.forEach(line => {
                line.words.forEach(word => {
                    if (word.text.length >= 7 && isNaN(Number(word.text.slice(-2))) !== true) {
                        resultado = word.text.slice(-7);
                    }
                });
            });
        });

        return resultado;
    }

    return (
        <View style={styles.container}>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalResultado} //modalResultado
                        style={styles.modalResultado}
                    >
                        <View style={styles.modal}>
                            <View style={styles.containerModal}>
                                <Text style={styles.atributosCaminhao}>Caminhão</Text>
                                <Text style={styles.atributosCaminhao}>Na garagem</Text>
                                <Image style={styles.imgModal} source={require('../../assets/img/caminhao.png')} />
                                <Text style={styles.atributosCaminhao}>Placa: DHD-8391</Text>
                                <Text style={styles.atributosCaminhao}>Carroceria: Caçamba</Text>
                                <Text style={styles.atributosCaminhao}>Data de aquisição: 16-06-2021</Text>
                                <Text style={styles.atributosCaminhao}>Marca: Volkswagen</Text>
                                <Text style={styles.atributosCaminhao}>Motorista: Marcos Paulo</Text>
                                <TouchableOpacity onPress={() => setModalResultado(false)} style={styles.btnModal}>
                                    <Text style={styles.textBtnModal}>Voltar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

            <View style={styles.txtOcr}>
                <Text style={styles.desc}>Tire uma foto da placa</Text>
            </View>
            <Camera
                style={styles.camera}
                type={type}
                ref={ref}
            >
            </Camera>
            <TouchableOpacity onPress={() => setModalResultado(true)} style={styles.btnFoto}>
                <Text style={styles.btnTxt}>Tirar Foto</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '4%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#FFF'
    },
    camera: {
        flex: 0.9,
        width: '100%',
        borderRadius: 5,
        margin: 0

    },

    text: {
        fontSize: 18,
        color: 'white',
    },

    titulo: {
        fontSize: 20,
        textAlign: 'center',
    },

    desc: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888888',
    },

    txtOcr: {
        marginTop: 40,
        flexDirection: 'column',
        height: 90,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',

    },

    btnFoto: {
        backgroundColor: '#0E758C',
        width: 220,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5

    },

    btnTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },

    image: {
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 200
    },

    tituloModal: {
        fontSize: 20
    },

    nomeVeiculo: {
        fontSize: 30
    },


    txtBtnModal2: {
        color: '#060657',
        fontSize: 17
    },
    modal: {
        flex: 1,
        padding: 30,
        backgroundColor: '#0E758C',
        
    },
    containerModal: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#0E758C',
        backgroundColor: 'white',
        borderRadius: 5
    },
    btnModal: {
        backgroundColor: '#0E758C',
        width: 300,
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 25
    },
    textBtnModal: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold'
    },
    imgModal: {
        width: 300,
        height: 330
    },
    atributosCaminhao: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        margin: 25
    }

});