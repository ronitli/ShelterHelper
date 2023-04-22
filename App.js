import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Text } from 'react-native';
import Start from './src/components/Start';
import { styles } from './src/styles';
import Home from './src/components/Home'; 
import Register from './src/components/Register';
import AddDog from './src/components/AddDog';
import Alerts from './src/components/Alerts';
import Requests from './src/components/Requests';
import Search from './src/components/Search';
import Update_medical_data from './src/components/Update_medical_data';
import Dogs from './src/components/Dogs';
import Update_trip from './src/components/Update_trip';
import Calender from './src/components/Calender';
const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Start">
       <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Home" component={Home} />   
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="AddDog" component={AddDog} />
        <Stack.Screen name="Alerts" component={Alerts} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Requests" component={Requests} />
        <Stack.Screen name="Update_medical_data" component={Update_medical_data} />
        <Stack.Screen name="Dogs" component={Dogs} />
        <Stack.Screen name="Calender" component={Calender} />
        <Stack.Screen name="Update_trip" component={Update_trip} />
       </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
