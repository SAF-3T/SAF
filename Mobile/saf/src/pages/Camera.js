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
                        visible={true} //modalResultado
                        style={styles.modalResultado}
                    >
                        <View>
                            <Text>Caminhão</Text>
                            <Text>Na garagem</Text>
                            <View />
                            <Text>Placa:</Text>
                            <Text>Carroceria:</Text>
                            <Text>Data de aquisição:</Text>
                            <Text>Marca:</Text>
                            <Text>Motorista:</Text>
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
            <TouchableOpacity onPress={TakePicture} style={styles.btnFoto}>
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

    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: '4%'
    },

    image: {
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 230
    },

    tituloModal: {
        fontSize: 20
    },

    nomeVeiculo: {
        fontSize: 30
    },

    txtModal: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 70
    },

    btnModal: {
        display: 'flex',
        width: '100%',
        height: 51,
        backgroundColor: '#060657',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2
    },

    txtBtnModal1: {
        fontSize: 16,
        color: '#FFF'
    },

    modalBtns: {
        width: '100%',
        marginTop: '20%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 90
    },

    txtBtnModal2: {
        color: '#060657',
        fontSize: 17
    }

});