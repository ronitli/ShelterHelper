// Home.js

import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Drawer from 'react-native-drawer';

const Home = ({ navigation }) => {
  return (
   
    <View>
    <Text onPress={() => navigation.navigate('Search')}>Search</Text>
    <Text onPress={() => navigation.navigate('AddDog')}>AddDog</Text>
    <Text onPress={() => navigation.navigate('Requests')}>Requests</Text>
    <Text onPress={() => navigation.navigate('Alerts')}>Alerts</Text>
    <Text onPress={() => navigation.navigate('UpdateMedicalData')}>UpdateMedicalData</Text>
    </View>
);
};

export default Home;
