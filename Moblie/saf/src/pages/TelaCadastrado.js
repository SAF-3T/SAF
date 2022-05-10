import { Component } from "react";
import { useState, useEffect } from 'react';
import React from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
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

export default class TelaCadastrado extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    render() {
        return(
            <View style={styles.main}>
                <View style={styles.body}> 
                    <Image style={styles.imgV} source={require('../../assets/img/certo.png')}/>
                    <Text style={styles.textSucess}>CheckList cadastrada com sucesso!</Text>  
                    <TouchableOpacity style={styles.btnProsseguir} onPress={() =>(this.props.navigation.navigate('Menu'))}>
                        <Text style={styles.btnText}>Prosseguir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main : {
        backgroundColor: '#0F282D',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        flex: 1,
        backgroundColor: 'white',
        height: 500,
        width: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgV: {
        width: 100,
        height: 100
    },
    btnProsseguir: {
        backgroundColor: '#0F282D',
        width: 200,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    textSucess: {
        fontSize: 20,
        margin: 30,
        textAlign: 'center'
    }
})