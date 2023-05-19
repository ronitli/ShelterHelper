import React , { useState } from 'react';
//import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation,useRoute } from '@react-navigation/native';
import Drawer from 'react-native-drawer';
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../styles";
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert
} from "react-native";

const Add_Medical_Data = ({ route, navigation }) => {
    let alertShown = false;
    const [rabiesVaccineDate, setRabiesVaccineDate] = useState('');
    const [chipDate, setChipDate] = useState('');
    const [hexagonalVaccine, setHexagonalVaccine] = useState('');
    const [spirocercaLupiDate, setSpirocercaLupi] = useState('');
    const [castration, setcastration] = useState('');
    const [dewormingDate, setDeworming] = useState('');
    const [fleaTreatmentDate, setfleaTreatment] = useState('');
    const [alergies, setAlergies] = useState('');
    const [medications, setMedications] = useState('');
    const [medicalTreatment, setTreatment] =useState('');
   
  const handleButtonPress = () => {
   const dates=[rabiesVaccineDate,chipDate,hexagonalVaccine,spirocercaLupiDate,dewormingDate,fleaTreatmentDate,castration];
   dates.forEach((dateParam) => {
    if (dateParam !== '') {
        handleSave(dateParam);
        if (alertShown===true)
        {
            return;
        }
    }
  });
  if(alertShown===true)
  {
    return;
  }
    //If reached here, frontend validation is done and all is correct. 
    navigation.navigate('AddDog', {
        param1: rabiesVaccineDate,
        param2: chipDate,
        param3: hexagonalVaccine,
        param4:spirocercaLupiDate,
        param5:castration,
        param6: dewormingDate,
        param7:fleaTreatmentDate,
        param8:alergies,
        param9:medications,
        param10:medicalTreatment,
      });
    


    
  };

  const handleSave = async (date) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/; // Regular expression for DD/MM/YYYY format
    if (regex.test(date)) {
      const [day, month, year] = date.split('/');

      // Validate the day, month, and year
      if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999) {
        Alert.alert('Invalid Date','All entered dates must be valid');
        alertShown=true;
      } else {
        const date = new Date(year, month - 1, day);

        if (
          date.getDate() !== Number(day) ||
          date.getMonth() !== month - 1 ||
          date.getFullYear() !== Number(year)
        ) {
          Alert.alert('Invalid Date','All entered dates must be valid');
          alertShown=true;
        } else if (date > new Date()) {
          Alert.alert('Future Date','Entered dates can not be in the future.');
          alertShown=true;
        } else {
          //Alert.alert('Valid Date', 'The entered date is valid and not in the future.');
        }
      }
    } else {
      Alert.alert('Invalid Date Format','All entered dates must be in \nDD/MM/YYYY format.');
      alertShown=true;
    }
  };
  
    return (
        <SafeAreaView style={styles.tripContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
        <View style={{ height: 20 }} />
          <Icon name="user-md" size={50} color="sienna" />
          <Text style={styles.title}>Add Medical Data</Text>
          <View style={{ height: 20 }} />
          <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Rabies Vaccine Date:</Text>
      <TextInput style={styles.input} color='#8B5A33' value={rabiesVaccineDate} onChangeText={setRabiesVaccineDate} placeholder='Format: DD/MM/YYYY' placeholderTextColor="#8B5A33"/>
      <View style={{ height: 10 }} />
      <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Chip Date:</Text>
      <TextInput style={styles.input} color='#8B5A33' value={chipDate} onChangeText={setChipDate} placeholder='Format: DD/MM/YYYY' placeholderTextColor="#8B5A33"/>
      <View style={{ height: 10 }} />
      <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Hexagonal Vaccine Date:</Text>
      <TextInput style={styles.input} color='#8B5A33' value={hexagonalVaccine} onChangeText={setHexagonalVaccine} placeholder='Format: DD/MM/YYYY' placeholderTextColor="#8B5A33"/>
      <View style={{ height: 10 }} />
      <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Spirocerca Lupi Date:</Text>
      <TextInput style={styles.input} color='#8B5A33' value={spirocercaLupiDate} onChangeText={setSpirocercaLupi} placeholder='Format: DD/MM/YYYY' placeholderTextColor="#8B5A33"/>
      <View style={{ height: 10 }} />
      <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Deworming Date:</Text>
      <TextInput style={styles.input} color='#8B5A33' value={dewormingDate} onChangeText={setDeworming} placeholder='Format: DD/MM/YYYY' placeholderTextColor="#8B5A33"/>
      <View style={{ height: 10 }} />
      <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Fleas/Ticks Treatment Date:</Text>
      <TextInput style={styles.input} color='#8B5A33' value={fleaTreatmentDate} onChangeText={setfleaTreatment} placeholder='Format: DD/MM/YYYY' placeholderTextColor="#8B5A33"/>
      <View style={{ height: 10 }} />
      <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Spaying / Neutering Date:</Text>
      <TextInput style={styles.input} color='#8B5A33' value={castration} onChangeText={setcastration} placeholder='Format: DD/MM/YYYY' placeholderTextColor="#8B5A33"/>
      <View style={{ height: 10 }} />

      <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Alergies?</Text>
      <TextInput style={styles.input} color='#8B5A33' value={alergies} onChangeText={setAlergies}/>
      <View style={{ height: 10 }} />
      <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Medications?</Text>
      <TextInput style={styles.input} color='#8B5A33' value={medications} onChangeText={setMedications}/>
      <View style={{ height: 10 }} />
      <Text style={[styles.radioButtonText, {textDecorationLine: 'underline'}]}>Other Medical Information?</Text>
      <TextInput style={styles.input} color='#8B5A33' value={medicalTreatment} onChangeText={setTreatment}/>
      <View style={{ height: 10 }} />
      <TouchableOpacity style={styles.registerButton} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

        </View>
        </ScrollView>
    </SafeAreaView>
      );
  
};

export default Add_Medical_Data;