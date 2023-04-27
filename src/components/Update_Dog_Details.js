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
        //save to database+alert acoordingly
       
    

    
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
        <View>
          <Text>Welcome to the update details for specific dog screen!</Text>
          <Text>Name:</Text>
      <TextInput value={name} onChangeText={setName} />
      <Text>Color:</Text>
      <TextInput value={colors} onChangeText={setColors} />
      <Text>Gender:</Text>
      <TextInput value={gender} onChangeText={setGender} />
      <Text>Breed:</Text>
      <TextInput value={breed} onChangeText={setBreed} />
      <Text>Age:</Text>
      <TextInput value={age} onChangeText={setAge} />
      <Text>Shelter Entry Date:</Text>
      <TextInput value={enterdate} onChangeText={setEnterdate} />
      <Text>Status:</Text>
      <TextInput value={status} onChangeText={setStatus} />
      <Text>Additional Information:</Text>
      <TextInput value={info} onChangeText={setInfo} />
      <Text>Picture:</Text>
      {profilePicture && (
        <Image
          source={{ uri:profilePicture }}
          style={styles.profilePicture}
        />
      )}
      <Button title="Pick Image" onPress={handlePickImage} />
      
      <Button title="Save" onPress={onSave} />
        </View>
      );

};

export default Update_Dog_Details;