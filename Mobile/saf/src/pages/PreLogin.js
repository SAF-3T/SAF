import { Component } from "react";
import React from 'react';
import jwtDecode from 'jwt-decode';
import {vw} from "react-native";


// import FontRegular from '../../assets/fonts/Montserrat-Regular.ttf'

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    ImageBackground,
  } from 'react-native';

export default class PreLogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <View style={styles.main}>
                <View style={styles.fundo}>
                    <View style={styles.containerEspacamentoLogo}>
                        <Image style={styles.logo} source={require('../../assets/img/Vector.png')}/>
                    </View>

                    <View style={styles.containerEspacamentoTextos}>
                        <Text style={styles.texto}>Bem vindo ao Sistema de Administração de Frotas</Text>
                    </View>
                    
                    <View style={styles.containerEspacamentoSAF}>
                        <Text style={styles.textoGrifado}>SAF</Text>
                    </View>
                    
                    <View style={styles.containerEspacamentoTextos}>
                        <Text style={styles.texto}>Clique no botão abaixo para entrar</Text>
                    </View>
                                       
                    <View style={styles.containerEspacamento}>
                        <TouchableOpacity onPress={ () => (this.props.navigation.navigate('Login'))} style={styles.corpoBotao}>
                            <Text style={styles.textoBotao}>COMEÇAR</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center'
    },
    fundo: {
        backgroundColor: '#0E758C',
        height: "100%",
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom: 50
    },
    logo: {
        width: 200,
        height: 194
    },
    texto: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        width: 450,
        height: 100

    },
    textoGrifado: {
        fontSize: 50,
        color: 'white',
        fontWeight: 'bold',
        height: 70
    },
    textoBotao: {
        fontWeight: 'bold',
        fontSize: 40,
        color: 'white',
    },
    corpoBotao: {
        width: 350,
        height: 100,
        backgroundColor: '#0F282D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 60,
    },
    containerEspacamentoLogo: {
        //backgroundColor: 'pink',
        //flex: 1,
        height: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerEspacamentoSAF: {
        //backgroundColor: 'pink',
        //flex: 1,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerEspacamentoTextos: {
        //backgroundColor: 'pink',
        //flex: 1,
        height: 50,
        width: 250,
        marginTop: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

})