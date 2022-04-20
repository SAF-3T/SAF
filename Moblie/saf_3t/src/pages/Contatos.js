import { Component } from "react";
import React from 'react';
import jwtDecode from 'jwt-decode';
import Header from '../components/Header'
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
        const resposta =  await api.get('/Usuarios/Cargo/1')
        this.setState({ listaUsuario: resposta.data })
        this.listaUsuario = resposta.data
        console.warn(this.listaUsuario)
    } 

    componentDidMount() { this.buscarUsuario() }

    render() {
        return(
            <View style={styles.main}>
                <Header />
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
                        <Text style={styles.nome}>{item.sobrenome}</Text>
                    </View>
                    <View style={styles.containerTelefone}>
                        <Text style={styles.telefone}>{item.ddd}</Text>
                        <Text style={styles.telefone}>{item.telefone}</Text>
                    </View>
                    <View>
                        <Text style={styles.funcaoU}>{item.idTipoUsuarioNavigation.nomeTipoUsuario}</Text>
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
    },
    nome: {
        fontSize: 17,
        fontWeight: '400',
        color: 'black',
        marginRight: 5
    },
    telefone: {
        fontSize: 17,
        fontWeight: '600',
        color: 'black',
        marginRight: 5
    },
    funcaoU: {
        fontSize: 17,
    }

})