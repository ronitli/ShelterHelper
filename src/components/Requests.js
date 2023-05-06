
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
import { useEffect } from 'react';
import { getFirestore, collection, setDoc, addDoc, getDocs } from "firebase/firestore";
import {auth,createUserWithEmailAndPassword, db } from '../../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const Requests = ({ navigation }) => {
  const [Name, setName] = React.useState('');//properties of the component a change in here will run the return section again
  const [Email, setEmail] = React.useState('');
  const [Title, setTitle] = React.useState('');
  const [Request, setRequest] = React.useState('');

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = collection(db, 'Users wait list');
      const querySnapshot = await getDocs(q);
      const requestsArray = querySnapshot.docs.map(doc => doc.data());
      setRequests(requestsArray);
    };
    fetchData();
  }, []);

  const handleApprovedRequest = async () =>
  {
    let email='razbc@mta.ac.il';// אני צריכה רק את המייל, וגם בפונקציה השניה :)

    //backend and data store 
    //search user in users request
    const user = requests.find(user => user.email === email);

    //insert to firebase auth
    try {
      const res =  createUserWithEmailAndPassword(auth, user.email, user.password);
      console.log("user add to firebase auth user list");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    //inseret to users table
    const dbRef = collection(db, 'Users');
    addDoc(dbRef, user).then(docRef => {
      console.log("new user add successfully to user list");
      alert('new user add to user list');
    })
.catch(error => {console.log(error);})

    //in here needs to delete from users waiting list the request
    console.log(user.email)
    console.log("hiiiiiiiiiiiiiiii")

    deleteUserFromWaitList(user.email);
    deleteUserFromFirebaseAuth(email);
    console.log(" AFTER DELETE FUNC")
    return;
  }

  const handleRejectRequest = async() => //גם כאן צריכה את המייל
  {
    let email;
    //in here needs to delete from the waiting list the request.
    deleteUserFromWaitList(email);
    return;
  }

  const deleteUserFromWaitList=(email)=>
  {
    console.log("in dlete function")
    const user = requests.find(user => user.email === email);
    console.log(user)
    const q = doc(collection(db, 'Users wait list'), user.email);
    deleteDoc(q)
  .then(() => {
    console.log('User successfully deleted from wait list!');
  })
  .catch((error) => {
    console.error('Error removing User from wait list: ', error);
  });

//update the requsts temp array
  const updatedRequests = requests.filter(user => user.id !== user.id);
  setRequests(updatedRequests);
  }

  const deleteUserFromFirebaseAuth=(email)=>
  {
    //todo
  }

  return (
  <SafeAreaView style={styles.container}>
  <ScrollView style={styles.scrollContainer}>
  <View style={styles.container}>
  <Text style={styles.title}>Upcomming Requests</Text>
  <View style={styles.reqContainer}>
  {requests.map(request =>
    <View style={styles.request}>
      <Text style={styles.reqText}>Request: {request.Request}</Text>
      <Text style={styles.reqText}>Name: {request.username}</Text>
      <Text style={styles.reqText}>Email: {request.email}</Text>
      <Text style={styles.reqText}>Title: {request.selectedOption}</Text>
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