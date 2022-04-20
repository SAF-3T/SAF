import { Component } from "react";
import React from 'react';
import jwtDecode from 'jwt-decode';
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

export default class Header extends Component {
    render() {
        return(
            <View style={styles.header}>
                <TouchableOpacity onPress={() => (this.props.navigation.navigate('Menu'))}>
                    <Image style={styles.setaVoltar} source={require('../../assets/img/setaVoltar.png')}/>
                </TouchableOpacity>
                <Image style={styles.logo} source={require('../../assets/img/logoEscuro.png')}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    setaVoltar: {
        marginLeft: 40
    },
    logo: {
        width: 30,
        marginLeft: 125
    },
})