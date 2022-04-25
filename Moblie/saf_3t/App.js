import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const AuthStack = createStackNavigator();

import PreLogin from './src/pages/PreLogin'
import Login from './src/pages/Login'
import Menu from './src/pages/Menu'
import Contatos from './src/pages/Contatos'
import BuscarVeiculos from './src/pages/BuscarVeiculo'

export default function Stack() {

    return (
      <NavigationContainer>
  
        <AuthStack.Navigator initialRouteName="PreLogin" screenOptions={{ headerShown: false, }}>
          <AuthStack.Screen name="PreLogin" component={PreLogin} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Menu" component={Menu} />
          <AuthStack.Screen name="Contatos" component={Contatos} />
          <AuthStack.Screen name="BuscarVeiculos" component={BuscarVeiculos} />
        </AuthStack.Navigator>
      </NavigationContainer>
    )
  }