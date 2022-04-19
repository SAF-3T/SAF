import { Component } from "react";
import React from 'react';
import jwtDecode from 'jwt-decode';
import {
    StyleSheet,
    FlatList,
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
            listaUsuario : [],

        };
    }

    buscarUsuario = async() => {
        const resposta =  await api.get('/Usuarios')
        this.setState({ listaUsuario: resposta.data })
        this.listaUsuario = resposta.data
        console.warn(this.listaUsuario)
    } 

    componentDidMount() { this.buscarUsuario() }

    render() {
        return(
            <View style={styles.main}>
                <View style={styles.header}>
                    <Image style={styles.setaVoltar} source={require('../../assets/img/setaVoltar.png')}/>
                    <Image style={styles.logo} source={require('../../assets/img/logoEscuro.png')}/>
                </View>
                <View style={styles.contend}> 

                    <Text style={styles.textTitulo}>Contatos</Text>
                    <FlatList
                    contentContainerStyle={styles.tabelaContatos}
                    data={this.state.listaUsuario}
                    keyExtractor={item => item.idUsuario}
                    renderItem={this.renderItem}                        />
                </View>
            </View>
        )
    }

    renderItem = ({ item }) => (
        <View>
            <View style={styles.conteinerList}>
                <View style={styles.imgList}/>
                <View style={styles.containerContendList}>
                    <View style={styles.containerNome}>
                        <Text style={styles.nome}>{item.nome}</Text>
                        <Text style={styles.sobrenome}>{item.sobrenome}</Text>
                    </View>
                    <View style={styles.containerTelefone}>
                        <Text style={styles.ddd}>{item.ddd}</Text>
                        <Text style={styles.telefone}>{item.telefone}</Text>
                    </View>
                    <View>
                        <Text>{item.idTipoUsuarioNavigation.nomeTipoUsuario}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
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
    contend: {
        flex: 1,
        backgroundColor: '#0F282D',
        display: 'flex',
        alignItems: 'center'
    },
    textTitulo: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 20
    },
    conteinerList: {
        backgroundColor: 'white',
        width: 350,
        margin: 10,
        borderRadius: 5,
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20
    },
    imgList: {
        backgroundColor: 'black',
        width: 60,
        height: 60,
        borderRadius: 100
    },
    containerNome: {
        display:'flex',
        flexDirection: 'row'
    },
    containerTelefone: {
        display:'flex',
        flexDirection: 'row'
    },
    containerContendList: {
        marginLeft: 25
    }
})