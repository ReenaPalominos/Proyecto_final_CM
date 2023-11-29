import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/views/loginView';
import Home from './src/views/homeView';


const Stack = createStackNavigator();

export default function App() {
  return (
    <Home />
  );
}

