import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { styles } from '../styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const Start = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    //backend validation
    console.log(`Username: ${username}, password: ${password}`);
    if (username === '' || password === '') {
    alert('Please enter both username and password.');
    return;
  }
  //database validation
  auth()
  .signInWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User signed in!');

    // Clear the form fields after data is saved
    setUsername('');
    setPassword('');
  
    navigation.navigate('Home');
  })
  .catch(error => {
    console.error(error);
    alert('Email or password is worng');
  });

     // Clear the form fields after data is saved

  /*if (username !== 'test' || password !== 'test') {
    alert('Invalid username or password.');
    return;
  }*/

  };
  
  const handleRegister= () => {
    console.log('Register button pressed');
     // Clear the form fields 
  setUsername('');
  setPassword('');

    navigation.navigate('Register');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username:"
        value={username}
        onChangeText={setUsername}
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
