import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native';
import { styles } from '../styles';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { auth, signInWithEmailAndPassword } from '../../firebase';
// import { getAuth, onAuthStateChanged } from "firebase/auth";



const Start = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();
  // const navigation = useNavigation();

  const handleLogin = () => {

    console.log(`Email: ${email}, password: ${password}`);
    if (email === '' || password === '') {
    alert('Please enter both email and password.');
    }
    
      signInWithEmailAndPassword(auth,email,password).then(() =>{
        console.log("loged in")

        setEmail('');
        setPassword('');
        navigation.navigate('Home');

      }).catch(err => {
        console.error(err);
        alert(err.message)
      })

    return;

  };
  
  const handleRegister= () => {
    console.log('Register button pressed');
    setEmail('');
    setPassword('');

    navigation.navigate('Register');

  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email:"
        value={email}
        onChangeText={setEmail}
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password:"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} />
        <View style={styles.separator} />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

export default Start;
