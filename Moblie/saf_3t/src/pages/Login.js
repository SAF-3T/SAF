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
  } from 'react-native';
  import api from '../services/api';
  

  

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            cpf : "36671849213",
            senha : "123456789",
            isLoading: false,
            erroMensagem: ''
        };
    }

    realizarLogin = async () => {
        this.isLoading = true    
        //this.setState(erroMensagem = 'Email ou senha incorreto1')    
        const resposta = await api.post('/Login',
        {
            cpf: this.state.cpf,
            senha: this.state.senha
        })
        console.warn(resposta)
        if (resposta.status == 200) {
            const token = resposta.data.token;
            await AsyncStorage.setItem('userToken',token)
            //console.warn(token)
            this.props.navigation.navigate('Menu');
            this.isLoading = false
        }
        else {
           // Alert.alert('Email ou Senha incorretos!')
            this.isLoading = false
            return false

        }
    }

    render() {
        return(
            <View style={styles.main}>
                <View style={styles.containerImg}>
                    <View style={styles.imgFixa}>
                        <Image style={styles.imgCamera} source={require('../../assets/img/Group.png')}/>
                    </View>
                </View>
                <View style={styles.containerInputs}>
                    <TextInput 
                    placeholder="CPF"
                    placeholderTextColor="#0E758C"
                    style={styles.input}
                    keyboardType="default"
                    onChangeText={cpf => this.setState({cpf})}
                    />
                    <TextInput 
                    placeholder="Senha"
                    placeholderTextColor="#0E758C"
                    style={styles.input}
                    keyboardType="default"
                    onChangeText={senha => this.setState({senha})}
                    secureTextEntry={true}
                    />
                </View>
                <View style={styles.containerBotao}>
                    <TouchableOpacity onPress={this.realizarLogin} style={styles.corpoBotao} >
                        <Text style={styles.textoBotao}>ENTRAR</Text>
                    </TouchableOpacity>                 
                    {this.erroMensagem}
                </View>
            </View>

        )
    }
    
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        flex: 1,
        padding: 5,
        position: 'absolute',
        width: '100%',
        height: '100%'

    },
    containerImg: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerInputs: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerBotao: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        //backgroundColor: 'black',
        width: 250,
        height: 50,
        marginTop: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#0E758C',
        textAlign: 'center',
        fontSize: 20,
        
    },
    corpoBotao: {
        width: 190,
        height: 60,
        backgroundColor: '#0E758C',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    textoBotao: {
        fontWeight: '900',
        fontSize: 25,
        color: 'white',
        fontFamily: 'Montserrat'
    },
    imgFixa: {
        width: 150,
        height: 150,
        backgroundColor: '#C4C4C4',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },

})