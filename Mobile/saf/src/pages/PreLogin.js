import { Component } from "react";
import React from 'react';
import jwtDecode from 'jwt-decode';
import {vw} from "react-native";
import { StatusBar } from 'react-native';


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
                <StatusBar
                        hidden={true}
                    />
                <View style={styles.fundo}>
                    <View style={styles.containerEspacamentoLogo}>
                        <Image style={styles.logo} source={require('../../assets/img/Vector.png')}/>
                    </View>

                    <View style={styles.containerEspacamentoTextos}>
                        <Text style={styles.texto}>Bem vindo ao Sistema de Administração de Frotas.</Text>
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
        alignItems: 'center',
    },
    fundo: {
        backgroundColor: '#0E758C',
        height: "100%",
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom: 10,
        paddingTop: 10
    },
    logo: {
        resizeMode: "contain",
        height: '75%'
    },
    texto: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        width: '100%',
        height: '100%'

    },
    textoGrifado: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold',
        height: 70
    },
    textoBotao: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
    },
    corpoBotao: {
        width: '100%',
        height: '80%',
        backgroundColor: '#0F282D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    containerEspacamentoLogo: {
        //backgroundColor: 'pink',
        //flex: 1,
        width: '60%',
        height: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerEspacamentoSAF: {
        //backgroundColor: 'pink',
        //flex: 1,
        height: '10%',
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerEspacamentoTextos: {
        //backgroundColor: 'pink',
        //flex: 1,
        height: '10%',
        width: '90%',
        marginTop: 10,
        display: 'flex'
    },
    containerEspacamento:{
        width: '60%',
        height: '10%',
        display: 'flex',
        justifyContent: "center"
    }

})