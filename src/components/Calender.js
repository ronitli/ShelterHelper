import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Drawer from 'react-native-drawer';


const Calender = ({navigation}) => {
    return (
        <View>
          <Text>Welcome to my calender screen!</Text>
        </View>
      );
  
};
export default Calender;