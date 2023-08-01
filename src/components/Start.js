import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity  } from 'react-native';
import { styles } from '../styles';
import { useNavigation } from '@react-navigation/native';
import { auth, signInWithEmailAndPassword } from '../../firebase';
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import Icon from 'react-native-vector-icons/FontAwesome';


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
  
  const handleHome=()=>{
    navigation.navigate('Home');
  }

  
  return (
    <View style={styles.container}>
       <Icon name="paw" size={60} color="#A0522D" />

        <Text style={styles.title}>ShelterHelper</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styles.label, { marginLeft: 10 }]}>Email:</Text>
       
       </View>
      
      <TextInput
      
        style={styles.input}
        placeholder="Enter your email:"
        placeholderTextColor="#e8c7bf"
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
        placeholderTextColor="#e8c7bf"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
      />
      
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={handleHome}>
      <Text style={styles.buttonText}>Home</Text>
     </TouchableOpacity>
    </View>
  );
};

export default Start;
