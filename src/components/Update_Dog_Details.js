import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet,SafeAreaView,ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import pickImage from './pickImage';
import { styles } from '../styles';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection, doc, getDoc, setDoc, addDoc,updateDoc } from "firebase/firestore";
import { db } from "../../firebase";



const Update_Dog_Details = ({ route, navigation }) => {
    const { dog } = route.params;
    const [name, setName] = useState(dog.name);
    const [breed, setBreed] = React.useState(dog.breed);// return array with 2 att 
  const [profilePicture, setProfilePicture] = React.useState(dog.profilePicture);
  const [colors, setColors] = React.useState(dog.colors);
  const [gender, setGender] = React.useState(dog.gender);
  const [age, setAge] = React.useState(dog.age);
  const [enterdate, setEnterdate] = React.useState(dog.enterdate);
  const [status, setStatus] = React.useState(dog.status);
  const [info, setInfo] = React.useState(dog.info);
    const onSave = () => {
        //save to database+alert acoordingly ---------------------------------->RAZ - update database
        const updateDetails = {
          name: name,
          breed: breed,
          profilePicture: profilePicture,
          colors: colors,
          gender: gender,
          age: age,
          enterdate: enterdate,
          status: status,
          info: info
        }
        const dogsRef = collection(db, 'Dogs');
        const docRef = doc(db, 'Dogs', dog.id);
        const docSnap = getDoc(docRef);
        updateDoc(docRef, updateDetails)
        // Navigate back to the profile screen with the updated information
        navigation.goBack();
      };
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
    
        if (!result.canceled) {
          setProfilePicture(result.assets[0].uri);
          
        }
      };
    return (
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Icon name="pencil" size={50} color='sienna' />
          <Text style={styles.title}>Update Dog Details</Text>

          <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} color='#8B5A33'/>
      <View style={{ height: 10 }} />

      <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Colors:</Text>
      <TextInput style={styles.input} color='#8B5A33' value={colors} onChangeText={setColors} />
      <View style={{ height: 10 }} />

      <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Gender:</Text>
      <TextInput style={styles.input} color='#8B5A33' value={gender} onChangeText={setGender} />
      <View style={{ height: 10 }} />

      <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Breed:</Text>
      <TextInput style={styles.input} color='#8B5A33' value={breed} onChangeText={setBreed} />
      <View style={{ height: 10 }} />

      <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Age:</Text>
      <TextInput style={styles.input} color='#8B5A33' value={age} onChangeText={setAge} />
      <View style={{ height: 10 }} />

      <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Shelter Entry Date:</Text>
      <TextInput style={styles.input} color='#8B5A33' value={enterdate} onChangeText={setEnterdate} />
      <View style={{ height: 10 }} />

      <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Status:</Text>
      <TextInput style={styles.input} color='#8B5A33' value={status} onChangeText={setStatus} />
      <View style={{ height: 10 }} />

      <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Additional Information:</Text>
      <TextInput style={styles.input} color='#8B5A33' value={info} onChangeText={setInfo} />
      <View style={{ height: 10 }} />

      <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Picture:</Text>
      {profilePicture && (
        <Image
          source={{ uri:profilePicture }}
          style={styles.profilePicture}
        />
      )}
      <TouchableOpacity style={styles.loginButton} onPress={handlePickImage}>
        <Text style={styles.buttonText}>Pick Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={onSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
        </View>
        </ScrollView>
    </SafeAreaView>
      );

};

export default Update_Dog_Details;