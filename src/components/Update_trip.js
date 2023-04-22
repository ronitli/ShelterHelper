import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import pickImage from './pickImage';
import { styles } from '../styles';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
//from page of a dog 
// in here needs with cookies pass the dog details that we chose in order to update that he went on trip

const Update_trip = ({navigation}) => {
    return (
        <View>
          <Text>Welcome to the update trip for specific dog screen!</Text>
        </View>
      );

};

export default Update_trip;