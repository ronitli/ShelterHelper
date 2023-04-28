import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';


export const loadFonts = async () => {
  await Font.loadAsync({
    'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
    'Mukta-Bold':require('../assets/fonts/Mukta-Bold.ttf'),
  });
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCEFEF',
  },
  title: {
    fontFamily: 'LilitaOne-Regular',
    fontSize: 43,
     color: '#A0522D',
    marginBottom: 50,
  },
  input: {
    width: '80%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: 'sienna',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    width: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
   // justifyContent: 'space-between',
    width: '80%',
    marginBottom: 16,
  },
  profilePicture: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#6F4E37',
    fontFamily: 'Mukta-Bold',
  },
  loginButton: {
    backgroundColor: '#E59C8A',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#B08975',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
