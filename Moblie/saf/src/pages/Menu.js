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
    constructor(props){
        super(props);
        this.state = {
            nomeU : "",
            funcaoU : "",
            tipoAutorizacao: 0,
            idUsuario: 0
        };
    }

    buscarInfosUsuario = async() => {
        const token = await AsyncStorage.getItem('userToken')
        //console.warn(token)
        this.tipoAutorizacao = await jwtDecode(token).role;
        this.idUsuario = await jwtDecode(token).jti
        const resposta = await api.get('/Usuarios/BuscarPorId/'+ this.idUsuario)
        this.nomeU = resposta.data.nome
        this.funcaoU = resposta.data.idTipoUsuarioNavigation.nomeTipoUsuario
        //console.warn(resposta.data)
        this.setState({ nomeU: resposta.data.nome })
        this.setState({ funcaoU: resposta.data.idTipoUsuarioNavigation.nomeTipoUsuario })

        console.warn(this.nomeU)
    }

    componentDidMount() { this.buscarInfosUsuario() }

      render() {
          return(
            <View style={styles.main}>
                <View style={styles.header}>
                    <View style={styles.img}/>
                    <Text style={styles.textName}>Olá, {this.nomeU}!</Text>       
                    <Text style={styles.textFunction}>{this.funcaoU}</Text>         
                </View>
                <View style={styles.content}> 
                    <View>
                        <TouchableOpacity onPress={() =>(this.props.navigation.navigate('BuscarVeiculos'))} style={styles.buttonBackgroundBig}>
                            <Text style={styles.buttonText}>Buscar veículo</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container2buttons}>
                        <TouchableOpacity onPress={() =>(this.props.navigation.navigate('Checkin'))} style={styles.buttonBackground}>
                            <Text style={styles.buttonText}>Check-in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>(this.props.navigation.navigate('Contatos'))} style={styles.buttonBackground}>
                            <Text style={styles.buttonText}>Check-out</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() =>(this.props.navigation.navigate('Contatos'))} style={styles.buttonBackgroundBig}>
                            <Text style={styles.buttonText}>Chat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    header: {
        flex: 1,
        backgroundColor: "#0F282D",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        height: 220,
        width: 220,
        backgroundColor: 'white',
        borderRadius: 200
    },
    textName : {
        color: 'white',
        fontSize: 25,
        margin: 5
    },
    textFunction: {
        color: 'white',
        fontSize: 20,
        fontWeight: '300'
    },
    buttonBackground: {
        backgroundColor: '#0F282D',
        width: 160,
        height: 70,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 10
    },
    buttonBackgroundBig: {
        backgroundColor: '#0F282D',
        width: 340,
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
    ,
    buttonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    container2buttons: {
        display: 'flex',
        flexDirection: 'row'
    }
})