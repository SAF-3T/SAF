import { Component } from "react";
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
  import api from '../services/api';

export default class Contatos extends Component {
    constructor(props){
        super(props);
        this.state = {
            placa: '',

        };
    }

    render() {
        return(
            <View>
                <Header />
                <View style={styles.main}>
                    <View style={styles.container1}>
                        <Text style={styles.titulo}>Buscar veículo</Text>
                    </View>
                    <View style={styles.container2}>
                        <TouchableOpacity style={styles.quadradoImg}>
                            <Image source={require('../../assets/img/cameraBranca.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.textPlaca}>Placa do veículo</Text>
                        <Text style={styles.textPlacaFuncional}>placa</Text>
                    </View>
                    <View style={styles.container3}>
                        <TouchableOpacity style={styles.btnBuscar}>
                            <Text style={styles.btnBuscarText}>BUSCAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main : {
        backgroundColor: '#0E758C',
        height: 610,
        display: 'flex',
        alignItems: 'center'
        
    },
    titulo : {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    container1 : {
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