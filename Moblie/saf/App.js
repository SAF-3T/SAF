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
import Checkin from './src/pages/Checkin'
import Checkout from './src/pages/Checkout'
import Preventiva from './src/pages/Preventiva'
import Corretiva from './src/pages/Corretiva'
import TelaCadastrado from './src/pages/TelaCadastrado'


export default function App() {

    return (
      <NavigationContainer>
  
        <AuthStack.Navigator initialRouteName="PreLogin" screenOptions={{ headerShown: false, }}>
          <AuthStack.Screen name="PreLogin" component={PreLogin} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Menu" component={Menu} />
          <AuthStack.Screen name="Contatos" component={Contatos} />
          <AuthStack.Screen name="BuscarVeiculos" component={BuscarVeiculos} />
          <AuthStack.Screen name="Checkin" component={Checkin} />
          <AuthStack.Screen name="Checkout" component={Checkout} />
          <AuthStack.Screen name="Preventiva" component={Preventiva} />
          <AuthStack.Screen name="Corretiva" component={Corretiva} />
          <AuthStack.Screen name="TelaCadastrado" component={TelaCadastrado} />
        </AuthStack.Navigator>
      </NavigationContainer>
    )
  }