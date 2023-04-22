
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import pickImage from './pickImage';
import { styles } from '../styles';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
//from start page

const Update_medical_data= ({ navigation }) => {// func declaration argugemnt navigation  function adddogs (navigation) {}
    const [name, setName] = React.useState('');
    const [vaccination, setvacccintaion] = React.useState('');
    const [fleaTreatment, setfleaTreatment] = React.useState('');
    const [antiwearn, setantiwearn] = React.useState('');
    const [castration, setcastration] = React.useState('');
    const fleas = [// array with two argu
    { label: 'fleaTreatment', value: 'fleaTreatment' },
    { label: 'not has fleaTreatment', value: 'not has fleaTreatment' },
    ]
    const castrations = [// array with two argu
    { label: 'castrationed', value: 'castrationed' },
    { label: ' not castrationed', value: 'not castrationed' },
    ]
    const antiwearns = [// array with two argu
    { label: 'antiwearn', value: 'antiwearn' },
    { label: ' not antiwearn', value: 'not antiwearn' },
    ]
    const vaccinations = [// array with two argu
    { label: 'vaccinated', value: 'vaccinated' },
    { label: ' not vaccinated', value: 'not vaccinated' },
    ]
    const handleUpdateMedicalData = async () => {
        //backend validation 
          }
    return (
        <View style={styles.container}>
         <TextInput style={styles.input} value={name} onChangeText={setName} placeholder='Name:' />
         <Text>Does the dog got a flea flea Treatment?</Text>
        {fleas.map((option) => (//function when finish create new array and return it
        <View key={option.value} style={styles.radioButtonContainer}>
          <RadioButton
            value={option.value}
            status={fleaTreatment === option.value ? 'checked' : 'unchecked'}
            onPress={() => setfleaTreatment(option.value)}
          />
          <Text>{option.label}</Text>
          </View>
      ))}
      <Text>Does the dog is castrated?</Text>
      {castrations.map((option) => (//function when finish create new array and return it
        <View key={option.value} style={styles.radioButtonContainer}>
          <RadioButton
            value={option.value}
            status={castration === option.value ? 'checked' : 'unchecked'}
            onPress={() => setcastration(option.value)}
          />
          <Text>{option.label}</Text>
          </View>
      ))}
      <Text>Does the dog is vaccinated?</Text>
       {vaccinations.map((option) => (//function when finish create new array and return it
        <View key={option.value} style={styles.radioButtonContainer}>
          <RadioButton
            value={option.value}
            status={vaccination === option.value ? 'checked' : 'unchecked'}
            onPress={() => setvacccintaion(option.value)}
          />
          <Text>{option.label}</Text>
          </View>
      ))}
      <Text>Does the dog got an antiwearns treatment ?</Text>
       {antiwearns.map((option) => (//function when finish create new array and return it
        <View key={option.value} style={styles.radioButtonContainer}>
          <RadioButton
            value={option.value}
            status={antiwearn === option.value ? 'checked' : 'unchecked'}
            onPress={() => setantiwearn(option.value)}
          />
          <Text>{option.label}</Text>
          </View>
      ))}
      <Button title="Update details" onPress={handleUpdateMedicalData} />
        </View>
    );

};
export default Update_medical_data;