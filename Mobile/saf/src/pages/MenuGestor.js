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

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomeU: "",
            funcaoU: "",
            tipoAutorizacao: 0,
            idUsuario: 0
        };
    }

    buscarInfosUsuario = async () => {
        const token = await AsyncStorage.getItem('userToken')
        //console.warn(token)
        this.tipoAutorizacao = await jwtDecode(token).role;
        this.idUsuario = await jwtDecode(token).jti
        const resposta = await api.get('/Usuarios/BuscarPorId/' + this.idUsuario)
        this.nomeU = resposta.data.nome
        this.funcaoU = resposta.data.idTipoUsuarioNavigation.nomeTipoUsuario
        //console.warn(resposta.data)
        this.setState({ imgU: resposta.data.imagemUsuario })
        this.setState({ nomeU: resposta.data.nome })
        this.setState({ funcaoU: resposta.data.idTipoUsuarioNavigation.nomeTipoUsuario })

        // console.warn(this.nomeU)
    }

    componentDidMount() { this.buscarInfosUsuario() }

    render() {
        return (
            <View style={styles.main}>
                <View style={styles.header}>
                    <Image source={{
                        uri: 'https://backend-saf-api.azurewebsites.net/Img/Perfilpadrao.jpg'
                    }} style={styles.img} />
                    <Text style={styles.textName}>Olá, {this.nomeU}!</Text>
                    <Text style={styles.textFunction}>{this.funcaoU}</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.container2buttons}>
                        <TouchableOpacity onPress={() => (this.props.navigation.navigate('BuscarVeiculos'))} style={styles.buttonMenu}>
                            <Text style={styles.buttonText}>Buscar veículo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => (this.props.navigation.navigate('Checkin'))} style={styles.buttonMenu}>
                            <Text style={styles.buttonText}>Check-in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => (this.props.navigation.navigate('Checkout'))} style={styles.buttonMenu}>
                            <Text style={styles.buttonText}>Check-out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#0E758C'
    },
    header: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    content: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#0E758C',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    img: {
        height: 220,
        width: 220,
        backgroundColor: 'white',
        borderRadius: 200
    },
    textName: {
        color: '#0F282D',
        fontSize: 25,
        marginTop: 20
    },
    textFunction: {
        color: '#0F282D',
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonMenu: {
        backgroundColor: 'white',
        width: 220,
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    buttonText: {
        color: '#0F282D',
        fontSize: 25,
        fontWeight: '300'
    },
    container2buttons: {
        display: 'flex',
        flexDirection: 'column'
    }
})