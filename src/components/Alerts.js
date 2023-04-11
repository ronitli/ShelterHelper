

import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const Alerts = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to the Alerts\Reminders screen!</Text>
    </View>
  );
};

export default Alerts;
