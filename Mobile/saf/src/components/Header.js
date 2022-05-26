import { Component } from "react";
import React from 'react';
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
        return (
            <View style={styles.header}>
                <View style={styles.headerSeperator}>
                <TouchableOpacity onPress={() => (this.props.navigation.navigate('MenuGestor'))}>
                    <Image style={styles.setaVoltar} source={require('../../assets/img/setaVoltar.png')} />
                </TouchableOpacity>
                </View>
                <View style={styles.headerSeperator}>
                <Image style={styles.logo} source={require('../../assets/img/logoEscuro.png')} />
                </View>
                <View style={styles.headerSeperator}>
                    <View style={styles.quadradoFds}/>
                </View>
                
                
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
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    setaVoltar: {
      
    },
    logo: {
        width: 30,
    },
    headerSeperator: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quadradoFds: {
        backgroundColor: 'white',
        width: 30,
        height: 30
    }
})