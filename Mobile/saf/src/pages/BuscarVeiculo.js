import { Component } from "react";
import React from 'react';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Header from '../components/Header'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import LerConteudoDaImagem from '../services/ocr';
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
import { data } from "browserslist";


  export default function Contatos() {

    const [ img, setImg ] = useState( null );
    const [ descricao, setDescricao ] = useState( '' );
    var navigation = useNavigation()
 
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        var result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
            setImg(result.uri);
            const data = new FormData();
            data.append('imagem', img)
            let resultado_OCR = LerConteudoDaImagem(data)
            resultado_OCR.then(res => setDescricao(res))
            console.warn(descricao)
        }
      };

      const LerConteudoDaImagem = async (formData) => {

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


        await axios("https://ocr-loggex.cognitiveservices.azure.com/vision/v3.2/ocr?language=pt&detectOrientation=true&model-version=latest", img, options)
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

        return(
            <View style={styles.main}>
                <View style={styles.body}>
                    <View style={styles.container1}>
                        <Text style={styles.titulo}>Buscar veículo</Text>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.textPlaca}>Tirar foto</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('CameraTela')} style={styles.quadradoImg}>
                            <Image style={styles.img} source={require('../../assets/img/cameraBranca.png')}/>
                        </TouchableOpacity>
                        {
                            //<Text style={styles.textPlaca}>OU</Text>
                        //<Text style={styles.textPlaca}>Escolher imagem</Text>
                        //<TouchableOpacity onPress={pickImage} style={styles.inputImg}>
                            //<Text style={styles.textPlacaFuncional}>Adicionar</Text>
                        //</TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    main : {
        backgroundColor: '#0E758C',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    body:{
        display: 'flex',
        alignItems: 'center'
    }
    ,
    titulo : {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    container1 : {
        flex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    container2: {
        flex: 4,
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    container3: {
        flex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 50
    },
    quadradoImg: {
        height: 200,
        width: 200,
        borderColor: 'white',
        borderWidth: 8,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10%'
    },
    textPlaca: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        margin: '10%'
    },
    textPlacaFuncional: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        margin: '20%'
    },
    btnBuscar: {
        backgroundColor: 'white',
        width: 170,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    btnBuscarText: {
        color: '#0F282D',
        fontWeight: '900',
        fontSize: 20,
        fontWeight: 'bold'
    },
    inputImg: {
        borderBottomColor: 'white',
        borderBottomWidth: 20,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    img: {
        width: '50%',
        height: '40%'
    }
})