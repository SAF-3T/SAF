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
    constructor(props) {
        super(props);
        this.state = {
            cpf: "45999057809",
            senha: "123",
            isLoading: false,
        };
    }

    displayNone() {
        styles.img.height = 0
    }

    realizarLogin = async () => {
        this.isLoading = true
        const resposta = await api.post('/Login',
            {
                cpf: this.state.cpf,
                senha: this.state.senha
            })

        if (resposta.status == 200) {
            const token = resposta.data.token;
            await AsyncStorage.setItem('userToken', token)
            const pegarIdUsuario = jwtDecode(token).role
            if (pegarIdUsuario === '1') {
                this.props.navigation.navigate('MenuGestor');
            }
            if (pegarIdUsuario === '2') {
                this.props.navigation.navigate('MenuMotorista');
            }
            if (pegarIdUsuario === '3') {
                this.props.navigation.navigate('MenuMecanico');
            }
        }
        else {
            this.isLoading = false
            return false
        }
    }

    render() {
        return (
            <View style={styles.main}>
                <View style={styles.containerImg}>
                    <Image style={styles.img} source={{
                        uri:
                            'https://backend-saf-api.azurewebsites.net/Img/logoSAFmedio.jpg'
                    }} />

                </View>
                <View style={styles.containerInputs}>
                    <TextInput
                        onPressIn={this.displayNone}
                        placeholder="CPF"
                        placeholderTextColor="#0E758C"
                        style={styles.input}
                        keyboardType="default"
                        onChangeText={cpf => this.setState({ cpf })}
                    />
                    <TextInput
                        placeholder="Senha"
                        placeholderTextColor="#0E758C"
                        style={styles.input}
                        keyboardType="default"
                        onChangeText={senha => this.setState({ senha })}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.containerBotao}>
                    <TouchableOpacity onPress={this.realizarLogin} style={styles.corpoBotao} >
                        <Text style={styles.textoBotao}>ENTRAR</Text>
                    </TouchableOpacity>
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
        width: '70%',
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
        // fontFamily: 'Montserrat'
    },
    img: {
        height: 162,
        width: 155,
        marginTop: 90
    },
    textErroMensagem: {
        color: 'red'
    }
})