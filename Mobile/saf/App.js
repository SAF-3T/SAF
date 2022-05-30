import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const AuthStack = createStackNavigator();

import PreLogin from './src/pages/PreLogin'
import Login from './src/pages/Login'
import MenuGestor from './src/pages/MenuGestor'
import MenuMotorista from './src/pages/MenuMotorista'
import MenuMecanico from './src/pages/MenuMecanico'
import Contatos from './src/pages/Contatos'
import BuscarVeiculos from './src/pages/BuscarVeiculo'
import Checkin from './src/pages/Checkin'
import Checkout from './src/pages/Checkout'
import Preventiva from './src/pages/Preventiva'
import Corretiva from './src/pages/Corretiva'
import TelaCadastradoCheckIn from './src/pages/TelaCadastradoCheckIn'
import CameraTela from './src/pages/Camera'



export default function App() {

    return (
      <NavigationContainer>
        <AuthStack.Navigator initialRouteName="PreLogin" screenOptions={{ headerShown: false,  }}>
          <AuthStack.Screen name="PreLogin" component={PreLogin} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="MenuGestor" component={MenuGestor} />
          <AuthStack.Screen name="MenuMotorista" component={MenuMotorista} />
          <AuthStack.Screen name="MenuMecanico" component={MenuMecanico} />
          <AuthStack.Screen name="Contatos" component={Contatos} />
          <AuthStack.Screen name="BuscarVeiculos" component={BuscarVeiculos} />
          <AuthStack.Screen name="Checkin" component={Checkin} />
          <AuthStack.Screen name="Checkout" component={Checkout} />
          <AuthStack.Screen name="Preventiva" component={Preventiva} />
          <AuthStack.Screen name="Corretiva" component={Corretiva} />
          <AuthStack.Screen name="TelaCadastradoCheckIn" component={TelaCadastradoCheckIn} />
          <AuthStack.Screen name="CameraTela" component={CameraTela} />
        </AuthStack.Navigator>
      </NavigationContainer>
    )
  }