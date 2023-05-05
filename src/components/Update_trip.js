import React, { useState } from 'react';
import { View,TimePickerAndroid,ScrollView,TouchableOpacity, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import pickImage from './pickImage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../styles';
import { SafeAreaView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
//from page of a dog 
// in here needs with cookies pass the dog details that we chose in order to update that he went on trip

const Update_trip = ({route,navigation}) => {
  const { dog } = route.params;
  const [tripdate, setTripdate] = React.useState(new Date());
  const [tripTime, setTripTime] = React.useState('');
  const [madeUrine, setUrine] = useState(false);
  const [madeFeces, setFeces] = useState(false);
  
  const [showPicker, setShowPicker] = React.useState(false);//defalt val is flase
  const showDateTimePicker = () => {
    setShowPicker(true);
  };
  const onChangeDate = (event, selectedDate) => { // prperty 
    const currentDate = selectedDate || tripdate;
    setTripdate(currentDate);
    setShowPicker(false);
  };
  const onChangeTime = (event, selectedTime) => { // prperty 
    const currentTime = selectedTime || tripTime;
    setTripTime(currentTime);
    setShowPicker(false);
  };
    return (
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
      <Icon name="paw" size={50} color='sienna' />
      <Text style={styles.title}>Update Trip</Text>
      <Text style={styles.radioButtonText}>Trip Date: {tripdate.toDateString()}</Text>
      <TouchableOpacity style={styles.loginButton} onPress={showDateTimePicker}>
        <Text style={styles.buttonText}>Choose date</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={tripdate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
      <Text style={styles.radioButtonText}>Choose at least one:</Text>
      </ScrollView>
      </SafeAreaView>
      );

};
export default Update_trip;