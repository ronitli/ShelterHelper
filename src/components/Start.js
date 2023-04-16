import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { styles } from '../styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const Start = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    //backend validation

    console.log(`Email: ${email}, password: ${password}`);
    if (email === '' || password === '') {
    alert('Please enter both email and password.');
    return;
  }
  //database validation
  auth()
  .signInWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User signed in!');

    // Clear the form fields after data is saved
    setEmail('');
    setPassword('');
  
    navigation.navigate('Home');
  })
  .catch(error => {
    console.error(error);
    alert('Email or password is worng');
  });

     // Clear the form fields after data is saved

  /*if (email !== 'test' || password !== 'test') {
    alert('Invalid email or password.');
    return;
  }*/
    console.log(`Email: ${email}, Password: ${password}`);
    if (email === '' || password === '') {
    alert('Please enter both email and password.');
    return;
  }
  
  //database validation

  // Clear the form fields after data is saved
  setEmail('');
  setPassword('');

  navigation.navigate('Home');
  };
  
  const handleRegister= () => {
    console.log('Register button pressed');
     // Clear the form fields 
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
