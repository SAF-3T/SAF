import { useState, useEffect } from 'react';
import React from 'react';
import jwtDecode from 'jwt-decode';
import Header from '../components/Header'
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
//import { Camera } from 'expo-camera'
import api from '../services/api';

export default function Contatos() {

    //const [startCamera, setStartCamera] = useState(false)

    //var camera = Camera();

    //const __startCamera = async () => {
        //const { status } = await Camera.requestPermissionsAsync()
        //if (status === 'granted') {
            // start the camera
          //  setStartCamera(true)
        //} else {
        //    Alert.alert('Access denied')
      //  }
    //}

    return (
        <View>
            <Header />
            <View style={styles.main}>
                <View style={styles.container1}>
                    <Text style={styles.titulo}>Buscar veículo</Text>
                </View>
                <View style={styles.container2}>
                    <TouchableOpacity style={styles.quadradoImg}>
                        <Image source={require('../../assets/img/cameraBranca.png')} />
                    </TouchableOpacity>
                    <Text style={styles.textPlaca}>Placa do veículo</Text>
                    <Text style={styles.textPlacaFuncional}>placa</Text>
                </View>
                <View style={styles.container3}>
                    <TouchableOpacity style={styles.btnBuscar}
                        onPress={__startCamera}
                    >
    
                        <Text style={styles.btnBuscarText}>BUSCAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#0E758C',
        height: '100%',
        display: 'flex',
        alignItems: 'center'

    },
    titulo: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    container1: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container2: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container3: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    quadradoImg: {
        height: 200,
        width: 200,
        borderColor: 'white',
        borderWidth: 4,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textPlaca: {
        color: 'white',
        fontWeight: '800',
        fontSize: 18,
        margin: 10
    },
    textPlacaFuncional: {
        color: 'white',
        fontWeight: '500',
        fontSize: 18
    },
    btnBuscar: {
        backgroundColor: '#0F282D',
        width: 170,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnBuscarText: {
        color: 'white',
        fontWeight: '900',
        fontSize: 18
    }
})
