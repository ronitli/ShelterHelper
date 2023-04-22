

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
import Dogs from './Dogs';

const AddDog= ({ navigation }) => {// func declaration argugemnt navigation  function adddogs (navigation) {}
  const [name, setName] = React.useState('');//properties of the component a change in here will run the return section again
  const [breed, setBreed] = React.useState('');// return array with 2 att 
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [colors, setColors] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [age, setAge] = React.useState('');
  const [enterdate, setEnterdate] = React.useState(new Date());
  const [status, setStatus] = React.useState('');
  const [info, setInfo] = React.useState('');
  const [showPicker, setShowPicker] = React.useState(false);//defalt val is flase

  const onChange = (event, selectedDate) => { // prperty 
    const currentDate = selectedDate || enterdate;
    setShowPicker(false);
    setEnterdate(currentDate);
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };
  
  const handleCreateProfile = async () => {
    //backend validation 
    if (name === '' && !profilePicture) {
        alert('You have at least to enter a name OR upload an image for the dog.');
        return;
      }
      
    //save to database & validate

    alert('Successfully added a new dog!');
    // Clear the form fields after data is saved
    setName('');
    setBreed('');
    setProfilePicture(null);
    setColors('');
    setGender('');
    setAge('');
    setStatus('');
    setInfo('');
  }

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePicture(result.uri);
    }
  };
  const genders = [// array with two argu
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];
  return (
    
    <View style={styles.container}>
      <Button title="Pick Image" onPress={handlePickImage} />
      {profilePicture && (
        <Image
          source={{ uri: profilePicture }}
          style={styles.profilePicture}
        />
      )}
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder='Name:' />
      <TextInput style={styles.input} value={breed} onChangeText={setBreed} placeholder='Bread:' />
      <TextInput style={styles.input} value={colors} onChangeText={setColors} placeholder='Colors:' />
      <Text>Choose dog gender:</Text>
       {genders.map((option) => (//function when finish create new array and return it
        <View key={option.value} style={styles.radioButtonContainer}>
          <RadioButton
            value={option.value}
            status={gender === option.value ? 'checked' : 'unchecked'}
            onPress={() => setGender(option.value)}
          />
          <Text>{option.label}</Text>
          </View>
      ))}
       <TextInput keyboardType="numeric" style={styles.input} value={age} onChangeText={setAge} 
       placeholder='Age (in years):' />
         <Text>Shelter Enter Date: {enterdate.toDateString()}</Text>
       <Button title="Show Date Picker" onPress={showDateTimePicker} />
      {showPicker && (
        <DateTimePicker
          value={enterdate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
         <TextInput style={styles.input} value={status} onChangeText={setStatus} placeholder='Status:' />
         <TextInput style={styles.input} value={info} onChangeText={setInfo} placeholder='Additional information:' />
      <Button title="Create Profile" onPress={handleCreateProfile} />
    </View>
  );
};

export default AddDog;