
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

const Requests = ({ navigation }) => {
  const [Name, setName] = React.useState('');//properties of the component a change in here will run the return section again
  const [Email, setEmail] = React.useState('');
  const [Title, setTitle] = React.useState('');
  const [Request, setRequest] = React.useState('');
  const handleApprovedRequest = async () =>
  {
    //backend and data store 
    //in here needs to delete from data base the request
        alert('Request apporved successfully.');
        return;
  }
  const handleRejectRequest = async() =>
  {
    //in here needs to delete from the database the request.
    alert('Request denied successfully.');
        return;
  }
  const requests = [
    {
      Request: '1',
      Name: 'Israel israeli',
      Email:'israel@gmail.com',
      Title: 'worker'
    },
    {
      Request: '5',
      Name: 'Israel Cohen',
      Email:'israel@gmail.com',
      Title: 'worker'
    },
    {
      Request: '2',
      Name: 'Mona liza',
      Email:'mona@gmail.com',
      Title: 'volunteer'
    }
  ]
  return (
  <SafeAreaView style={styles.container}>
  <ScrollView style={styles.scrollContainer}>
  <View style={styles.container}>
  <Text style={styles.title}>Upcomming Requests</Text>
  <View style={styles.reqContainer}>
  {requests.map(request =>
    <View style={styles.request}>
      <Text style={styles.reqText}>Request: {request.Request}</Text>
      <Text style={styles.reqText}>Name: {request.Name}</Text>
      <Text style={styles.reqText}>Email: {request.Email}</Text>
      <Text style={styles.reqText}>Title: {request.Title}</Text>
    {/* <TouchableOpacity style={styles.registerButton} onPress={handleApprovedRequest}>
      <Text style={styles.buttonText}>Approve</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.registerButton} onPress={handleRejectRequest}>
      <Text style={styles.buttonText}>Reject</Text>
    </TouchableOpacity> */}
  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
  <TouchableOpacity style={[styles.acceptButton,{marginRight: 10}]} onPress={handleApprovedRequest}>
    <Text style={styles.buttonText}>Approve</Text>
  </TouchableOpacity>
  <TouchableOpacity style={[styles.denyButton, { marginLeft: 10 }]}onPress={handleRejectRequest}>
    <Text style={styles.buttonText}>Reject</Text>
  </TouchableOpacity>
</View>
<View style={styles.underline}/>
    </View>
)}
    </View>
  </View>
  </ScrollView> 
  </SafeAreaView>
);
};

export default Requests;