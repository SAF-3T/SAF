import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const AuthStack = createStackNavigator();

import PreLogin from './src/pages/PreLogin'

export default function Stack() {

    return (
      <NavigationContainer>
  
        <AuthStack.Navigator initialRouteName="PreLogin" screenOptions={{ headerShown: false, }}>
          <AuthStack.Screen name="PreLogin" component={PreLogin} />
        </AuthStack.Navigator>
      </NavigationContainer>
    )
  }