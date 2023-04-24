import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles';
import { RadioButton } from 'react-native-paper';
//import { auth } from 'firebase/app';
import {auth,createUserWithEmailAndPassword, addDoc, collection, db } from '../../firebase';

const Register = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [fname, setFname]=React.useState('');
  const [lname, setLname]=React.useState('');
  const [checkpswd, setCheckPswd]=React.useState('');
  const [selectedOption, setSelectedOption] = React.useState('');

  const Stack = createStackNavigator();
  const handleRegister = () => {
    //backend validation
    if (username === '' || password === '' || email === '' || fname === ''
    || lname === '' || checkpswd === '' || selectedOption ==='')
    {
      alert('Please enter all the fields.');
    return;
    }
    else if(password!=checkpswd)
    {
      alert('Not the same password.');
      return;
    }
    
    try {
      const res =  createUserWithEmailAndPassword(auth, email, password);
      setProperty();
      navigation.navigate('Home');
      console.log("user register");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

  };

 const setProperty= () =>{
    setUsername('');
    setEmail('');
    setPassword('');
    setFname('');
    setLname('');
    setCheckPswd('');
    setSelectedOption('');
 };
  const options = [
    { label: 'Manager', value: 'Manager' },
    { label: 'Worker', value: 'Worker' },
    { label: 'Volunteer', value: 'Volunteer' },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={fname}
        onChangeText={setFname}
      />
       <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lname}
        onChangeText={setLname}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Retype Password"
        secureTextEntry={true}
        value={checkpswd}
        onChangeText={setCheckPswd}
      />
      <Text>Choose your role:</Text>
       {options.map((option) => (
        <View key={option.value} style={styles.radioButtonContainer}>
          <RadioButton
            value={option.value}
            status={selectedOption === option.value ? 'checked' : 'unchecked'}
            onPress={() => setSelectedOption(option.value)}
          />
          <Text>{option.label}</Text>
          </View>
      ))}
      <Button title="Register" onPress={handleRegister} />
    
    </View>
  );
};

export default Register;