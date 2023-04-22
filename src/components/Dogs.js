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
//from home page
const dogs = [
  {
    name: 'shoko',
    color:'brown',
    race: 'pitball',
    age: 2,
    gender: 'male',
    shelter_entry_date :'13.1.2012',
    medical_info:'vaccinated',
    status:'waiting for adopation',
    additinal_info:'very friendly',
    picture: 'https://www.thesprucepets.com/thmb/VkoI1kidVIiQQnAezIYE_IPU-D8=/2781x0/filters:no_upscale():strip_icc()/pitbull-dog-breeds-4843994-hero-db6922b6c8294b45b19c07aff5865790.jpg'
  },
  {
    name: 'mocha',
    color:"brown",
    race: 'golden retreiver',
    age: 1,
    gender: 'female',
    race: 'golden retreiver',
    shelter_entry_date :'14.9.2023',
    medical_info:' not vaccinated',
    status:'waiting for adopation',
    additinal_info:'very friendly and caring',
    picture: 'https://images.unsplash.com/photo-1615233500064-caa995e2f9dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGdvbGRlbiUyMGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80'
  }
];
const Dogs = ({navigation}) => {
    return (
        <View style={styles.container}>
        {dogs.map(dog =>
        <View>
            <Image source={{ uri: dog.picture }} style={{ width: 200, height: 200 }} />
            <Text>Name: {dog.name}</Text>
            <Text>Color: {dog.color}</Text>
            <Text>Gender: {dog.gender}</Text>
            <Text>Race: {dog.race}</Text>
            <Text>Age: {dog.age}</Text>
            <Text>Shelter entry date: {dog.shelter_entry_date}</Text>
            <Text>Medical information: {dog.medical_info}</Text>
            <Text> Status: {dog.status}</Text>
            <Text> Additional information: {dog.additinal_info}</Text>
            
            <Text onPress={() => navigation.navigate('Update Dog Details')}>Update Dog Details</Text>
            <Text onPress={() => navigation.navigate('Update_trip')}>Update trip</Text>
            <Text onPress={() => navigation.navigate('Update_medical_data')}>Update medical data</Text>
        </View>
        )}
      </View>
    );
  };
  
  export default Dogs;